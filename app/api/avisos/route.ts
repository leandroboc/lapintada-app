import { NextRequest, NextResponse } from 'next/server'
import { getConnection } from '../../../lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const adminFlag = searchParams.get('admin') === '1'
    const usuarioId = Number(searchParams.get('usuarioId') || searchParams.get('usuario_id'))
    const connection = await getConnection()
    let rows: unknown[] = []
    if (adminFlag) {
      const [allRows] = await connection.execute(
        `SELECT a.id, a.titulo, a.mensaje, a.created_at, a.audiencia, a.usuario_id, a.activo, a.expires_at,
                u.nombre AS destinatario_nombre, u.apellido AS destinatario_apellido,
                CASE WHEN a.audiencia = 'usuario' AND al.usuario_id IS NOT NULL THEN 1 ELSE 0 END AS leido
           FROM avisos a
           LEFT JOIN usuarios u ON a.usuario_id = u.id
           LEFT JOIN avisos_leidos al ON al.aviso_id = a.id AND al.usuario_id = a.usuario_id
          ORDER BY a.created_at DESC
          LIMIT 200`
      )
      rows = allRows
    } else {
      if (!usuarioId) {
        await connection.end()
        return NextResponse.json({ error: 'usuarioId requerido' }, { status: 400 })
      }
      const [userRows] = await connection.execute(
        `SELECT a.id, a.titulo, a.mensaje, a.created_at, a.audiencia, a.usuario_id,
                CASE WHEN al.usuario_id IS NULL THEN 0 ELSE 1 END AS leido
           FROM avisos a
           LEFT JOIN avisos_leidos al ON al.aviso_id = a.id AND al.usuario_id = $1
          WHERE a.activo = TRUE
            AND (a.expires_at IS NULL OR a.expires_at > CURRENT_TIMESTAMP)
            AND (a.audiencia = 'todos' OR (a.audiencia = 'usuario' AND a.usuario_id = $1))
          ORDER BY a.created_at DESC
          LIMIT 100`,
        [usuarioId]
      )
      rows = userRows
    }
    await connection.end()
    return NextResponse.json({ avisos: rows })
  } catch (error) {
    console.error('Error obteniendo avisos:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const titulo: string = (body.titulo || '').trim()
    const mensaje: string = (body.mensaje || '').trim()
    const audiencia: 'todos' | 'usuario' = body.audiencia === 'usuario' ? 'usuario' : 'todos'
    const usuario_id: number | null = audiencia === 'usuario' ? Number(body.usuario_id) || null : null
    const creado_por: number | null = Number(body.creado_por) || null
    const rawExpires: string | null = body.expires_at || null
    let expires_at: string | null = null
    if (rawExpires && typeof rawExpires === 'string' && rawExpires.trim() !== '') {
      const d = new Date(rawExpires)
      if (!isNaN(d.getTime())) {
        const pad = (n: number) => String(n).padStart(2, '0')
        const y = d.getFullYear()
        const m = pad(d.getMonth() + 1)
        const day = pad(d.getDate())
        const hh = pad(d.getHours())
        const mm = pad(d.getMinutes())
        const ss = pad(d.getSeconds())
        expires_at = `${y}-${m}-${day} ${hh}:${mm}:${ss}`
      }
    }

    if (!titulo || !mensaje) {
      return NextResponse.json({ error: 'titulo y mensaje requeridos' }, { status: 400 })
    }
    if (titulo.length > 120) {
      return NextResponse.json({ error: 'titulo demasiado largo' }, { status: 400 })
    }
    if (audiencia === 'usuario' && !usuario_id) {
      return NextResponse.json({ error: 'usuario_id requerido para audiencia usuario' }, { status: 400 })
    }

    const connection = await getConnection()
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS avisos (
        id SERIAL PRIMARY KEY,
        titulo VARCHAR(120) NOT NULL,
        mensaje TEXT NOT NULL,
        audiencia TEXT NOT NULL CHECK (audiencia IN ('todos','usuario')),
        usuario_id INT NULL,
        creado_por INT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        activo BOOLEAN NOT NULL DEFAULT TRUE,
        expires_at TIMESTAMP NULL DEFAULT NULL
      )
    `)
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS avisos_leidos (
        aviso_id INT NOT NULL,
        usuario_id INT NOT NULL,
        read_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (aviso_id, usuario_id)
      )
    `)
    const [result] = await connection.execute(
      'INSERT INTO avisos (titulo, mensaje, audiencia, usuario_id, creado_por, expires_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [titulo, mensaje, audiencia, usuario_id, creado_por, expires_at]
    )
    await connection.end()
    return NextResponse.json({ message: 'Aviso creado', id: (result[0] as { id: number })?.id })
  } catch (error) {
    console.error('Error creando aviso:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

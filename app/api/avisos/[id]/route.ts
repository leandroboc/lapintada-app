import { NextResponse } from 'next/server'
import { getConnection } from '../../../../lib/db'

export async function PATCH(request: Request) {
  try {
    const url = new URL(request.url as string)
    const parts = url.pathname.split('/')
    const idStr = parts[parts.length - 1]
    const id = Number(idStr)
    if (!id) {
      return NextResponse.json({ error: 'id inválido' }, { status: 400 })
    }
    const body = await request.json()
    const fields: string[] = []
    const values: (string | number | null)[] = []
    if (typeof body.titulo === 'string') { fields.push('titulo = ?'); values.push(body.titulo.trim()) }
    if (typeof body.mensaje === 'string') { fields.push('mensaje = ?'); values.push(body.mensaje.trim()) }
    if (typeof body.activo !== 'undefined') { fields.push('activo = ?'); values.push(Number(body.activo) ? 1 : 0) }
    if (typeof body.expires_at !== 'undefined') { fields.push('expires_at = ?'); values.push(body.expires_at || null) }
    if (fields.length === 0) {
      return NextResponse.json({ error: 'Sin cambios' }, { status: 400 })
    }
    const sql = `UPDATE avisos SET ${fields.join(', ')} WHERE id = $${values.length + 1} RETURNING id`
    values.push(id)
    const connection = await getConnection()
    const [res] = await connection.execute(sql, values)
    await connection.end()
    if (!Array.isArray(res) || res.length === 0) {
      return NextResponse.json({ error: 'Aviso no encontrado' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Aviso actualizado' })
  } catch (error) {
    console.error('Error actualizando aviso:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

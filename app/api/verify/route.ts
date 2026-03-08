import { NextRequest, NextResponse } from 'next/server'
import { getConnection } from '../../../lib/db'
import crypto from 'crypto'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const rid = searchParams.get('rid')
    const sig = searchParams.get('sig')
    if (!rid || !sig) {
      return NextResponse.json({ valido: false, error: 'Parámetros requeridos' }, { status: 400 })
    }

    const secret = process.env.QR_SECRET || 'libertador_qr_secret_development_only'
    const expected = crypto.createHmac('sha256', secret).update(String(rid)).digest('hex')
    if (sig !== expected) {
      return NextResponse.json({ valido: false, error: 'Firma inválida' }, { status: 400 })
    }

    const connection = await getConnection()
    const [rows] = await connection.execute(
      'SELECT r.id, r.usuario_id, r.nombre_archivo, r.fecha_subida, r.acknowledged, r.acknowledged_at, u.nombre, u.apellido, u.dni_admin FROM recibos r LEFT JOIN usuarios u ON r.usuario_id = u.id WHERE r.id = $1 LIMIT 1',
      [rid]
    )
    await connection.end()
    const row = Array.isArray(rows) && rows.length > 0 ? (rows[0] as unknown as { id: number; usuario_id: number; nombre_archivo: string; fecha_subida: string; acknowledged?: boolean; acknowledged_at?: string; nombre?: string; apellido?: string; dni_admin?: string }) : null
    if (!row) {
      return NextResponse.json({ valido: false, error: 'Recibo no encontrado' }, { status: 404 })
    }

    const estado = row.acknowledged ? 'confirmado' : 'pendiente'
    const empleado = `${row.nombre || ''} ${row.apellido || ''}`.trim()

    return NextResponse.json({
      valido: true,
      rid: Number(row.id),
      dni: row.dni_admin || null,
      empleado,
      nombre_archivo: row.nombre_archivo,
      fecha_emision: row.fecha_subida,
      estado
    })
  } catch (error) {
    console.error('Error en verificación QR:', error)
    return NextResponse.json({ valido: false, error: 'Error interno del servidor' }, { status: 500 })
  }
}

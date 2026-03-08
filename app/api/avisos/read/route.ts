import { NextRequest, NextResponse } from 'next/server'
import { getConnection } from '../../../../lib/db'

export async function POST(request: NextRequest) {
  try {
    const { aviso_id, usuario_id } = await request.json()
    const aid = Number(aviso_id)
    const uid = Number(usuario_id)
    if (!aid || !uid) {
      return NextResponse.json({ error: 'aviso_id y usuario_id requeridos' }, { status: 400 })
    }

    const connection = await getConnection()
    await connection.execute(
      'INSERT INTO avisos_leidos (aviso_id, usuario_id, read_at) VALUES ($1, $2, CURRENT_TIMESTAMP) ON CONFLICT (aviso_id, usuario_id) DO UPDATE SET read_at = EXCLUDED.read_at',
      [aid, uid]
    )
    await connection.end()
    return NextResponse.json({ message: 'Marcado como leído' })
  } catch (error) {
    console.error('Error marcando aviso leído:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

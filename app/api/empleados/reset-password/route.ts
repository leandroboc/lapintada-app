import { NextResponse } from 'next/server'
import { getConnection } from '../../../../lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const dni = String(body.dni || '').trim()
    const newPassword = String(body.password || '123456')

    if (!dni) {
      return NextResponse.json({ error: 'DNI requerido' }, { status: 400 })
    }

    const connection = await getConnection()
    const [rows] = await connection.execute(
      "UPDATE usuarios SET password = $1 WHERE dni_admin = $2 AND rol IN ('empleado', 'chofer') RETURNING id, nombre, dni_admin",
      [newPassword, dni]
    )
    await connection.end()

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ error: 'Empleado no encontrado' }, { status: 404 })
    }

    return NextResponse.json({
      message: 'Contraseña reseteada exitosamente',
      defaultPassword: newPassword,
    })
  } catch {
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

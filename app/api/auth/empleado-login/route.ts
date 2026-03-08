import { NextRequest, NextResponse } from 'next/server'
import { getConnection } from '../../../../lib/db'


type UserRow = { id: number; nombre: string; apellido: string; email: string; dni_admin: string; password: string; rol: string }

export async function POST(request: NextRequest) {
  try {
    const { dni, password } = await request.json()

    if (!dni || !password) {
      return NextResponse.json({ error: 'DNI y contraseña requeridos' }, { status: 400 })
    }

    const connection = await getConnection()

    const [rows] = await connection.execute(
      "SELECT id, nombre, apellido, email, dni_admin, password, rol FROM usuarios WHERE dni_admin = $1 AND rol IN ('empleado', 'chofer')",
      [dni]
    )

    await connection.end()

    const users = rows as UserRow[]
    if (users.length === 0) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    const user = users[0]

    if (password !== user.password) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 })
    }

    const userWithoutPassword = { id: user.id, nombre: user.nombre, apellido: user.apellido, email: user.email, dni_admin: user.dni_admin, rol: user.rol }

    const token = Buffer.from(`${user.id}-${Date.now()}`).toString('base64')

    return NextResponse.json({ message: 'Login exitoso', user: userWithoutPassword, token })

  } catch {
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

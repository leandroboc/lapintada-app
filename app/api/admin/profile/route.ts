import { NextRequest, NextResponse } from 'next/server'
import { getConnection } from '../../../../lib/db'

type AdminRow = {
  id: number
  nombre: string
  apellido: string
  email: string
  dni_admin: string
  password: string
  rol: string
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const id = Number(body.id)
    const nombre = String(body.nombre || '').trim()
    const apellido = String(body.apellido || '').trim()
    const email = String(body.email || '').trim()
    const dniAdmin = String(body.dni_admin || '').trim()
    const currentPassword = String(body.currentPassword || '')
    const newPassword = String(body.newPassword || '')

    if (!id || !nombre || !apellido || !email || !dniAdmin) {
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 })
    }

    if (!/^\d{8}$/.test(dniAdmin)) {
      return NextResponse.json({ error: 'El DNI debe tener 8 dígitos' }, { status: 400 })
    }

    const connection = await getConnection()
    const [rows] = await connection.execute(
      "SELECT id, nombre, apellido, email, dni_admin, password, rol FROM usuarios WHERE id = $1 AND rol = 'admin' LIMIT 1",
      [id]
    )

    const users = rows as AdminRow[]
    if (users.length === 0) {
      await connection.end()
      return NextResponse.json({ error: 'Administrador no encontrado' }, { status: 404 })
    }

    const admin = users[0]

    const [dupRows] = await connection.execute(
      'SELECT id FROM usuarios WHERE (email = $1 OR dni_admin = $2) AND id <> $3 LIMIT 1',
      [email, dniAdmin, id]
    )
    const duplicates = dupRows as { id: number }[]
    if (duplicates.length > 0) {
      await connection.end()
      return NextResponse.json({ error: 'Email o DNI ya registrado' }, { status: 409 })
    }

    if (newPassword) {
      if (!currentPassword) {
        await connection.end()
        return NextResponse.json({ error: 'Debes ingresar la contraseña actual' }, { status: 400 })
      }
      if (currentPassword !== admin.password) {
        await connection.end()
        return NextResponse.json({ error: 'La contraseña actual es incorrecta' }, { status: 401 })
      }
      await connection.execute(
        'UPDATE usuarios SET nombre = $1, apellido = $2, email = $3, dni_admin = $4, password = $5 WHERE id = $6',
        [nombre, apellido, email, dniAdmin, newPassword, id]
      )
    } else {
      await connection.execute(
        'UPDATE usuarios SET nombre = $1, apellido = $2, email = $3, dni_admin = $4 WHERE id = $5',
        [nombre, apellido, email, dniAdmin, id]
      )
    }

    const [updatedRows] = await connection.execute(
      "SELECT id, nombre, apellido, email, dni_admin, rol FROM usuarios WHERE id = $1 AND rol = 'admin' LIMIT 1",
      [id]
    )
    await connection.end()

    const updated = (updatedRows as Omit<AdminRow, 'password'>[])[0]
    return NextResponse.json({
      message: 'Configuración guardada correctamente',
      user: updated,
    })
  } catch {
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

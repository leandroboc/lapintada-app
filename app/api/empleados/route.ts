import { NextResponse } from 'next/server';
import { getConnection } from '../../../lib/db';


export async function GET() {
  try {
    const connection = await getConnection();
    const queries = [
      "SELECT id, nombre, dni_admin AS dni, fecha_creacion, fecha_modificacion FROM usuarios WHERE rol IN ('empleado','chofer') ORDER BY fecha_creacion DESC",
      "SELECT id, nombre, dni_admin AS dni, fecha_creacion FROM usuarios WHERE rol IN ('empleado','chofer') ORDER BY fecha_creacion DESC",
      "SELECT id, nombre, dni_admin AS dni FROM usuarios WHERE rol IN ('empleado','chofer') ORDER BY id DESC",
    ]
    let rows: unknown[] = []
    for (const q of queries) {
      try {
        const [res] = await connection.execute(q)
        rows = res
        break
      } catch {}
    }
    await connection.end();
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error obteniendo empleados:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const nombre: string = body.nombre;
    const dni: string = body.dni || body.dni_admin;
    const password: string = body.password;
    const rol: string = body.rol || 'chofer';
    const email: string = body.email || '';
    const apellido: string = body.apellido || '';

    if (!nombre || !dni || !password) {
      return NextResponse.json({ error: 'nombre, dni y password requeridos' }, { status: 400 });
    }

    const connection = await getConnection();
    const [exist] = await connection.execute(
      'SELECT id FROM usuarios WHERE dni_admin = $1 LIMIT 1',
      [dni]
    );
    if (Array.isArray(exist) && exist.length > 0) {
      await connection.end();
      return NextResponse.json({ error: 'DNI ya registrado' }, { status: 409 });
    }

    const [result] = await connection.execute(
      'INSERT INTO usuarios (nombre, apellido, email, dni_admin, password, rol) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [nombre, apellido, email, dni, password, rol]
    );

    await connection.end();

    return NextResponse.json({ message: 'Empleado creado exitosamente', id: (result[0] as { id: number })?.id });

  } catch (error) {
    console.error('Error creando empleado:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const id: number = Number(body.id);
    const nombre: string = body.nombre;
    const dni: string = body.dni || body.dni_admin;
    if (!id || !nombre || !dni) {
      return NextResponse.json({ error: 'id, nombre y dni requeridos' }, { status: 400 });
    }

    const connection = await getConnection();
    const [exist] = await connection.execute(
      'SELECT id FROM usuarios WHERE dni_admin = $1 AND id <> $2 LIMIT 1',
      [dni, id]
    );
    if (Array.isArray(exist) && exist.length > 0) {
      await connection.end();
      return NextResponse.json({ error: 'DNI ya registrado' }, { status: 409 });
    }
    const [res] = await connection.execute(
      'UPDATE usuarios SET nombre = $1, dni_admin = $2 WHERE id = $3 RETURNING id',
      [nombre, dni, id]
    );
    await connection.end();
    if (!Array.isArray(res) || res.length === 0) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Empleado actualizado' });
  } catch (error) {
    console.error('Error actualizando empleado:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

import { logSystemEvent } from '../../../lib/logger';

export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    const id: number = Number(body.id)
    if (!id) {
      return NextResponse.json({ error: 'id requerido' }, { status: 400 })
    }
    const connection = await getConnection()
    
    // Obtener datos del empleado antes de borrar para el log
    const [empRows] = await connection.execute('SELECT nombre, apellido, dni_admin FROM usuarios WHERE id = $1', [id])
    const emp = Array.isArray(empRows) && empRows.length > 0 ? (empRows[0] as any) : null
    const empName = emp ? `${emp.nombre} ${emp.apellido} (${emp.dni_admin})` : `ID ${id}`

    // Primero borrar recibos y horarios asociados
    await connection.execute('DELETE FROM recibos WHERE usuario_id = $1', [id])
    await connection.execute('DELETE FROM horarios WHERE usuario_id = $1', [id])
    
    // Luego borrar el usuario
    const [res] = await connection.execute(
      'DELETE FROM usuarios WHERE id = $1 RETURNING id',
      [id]
    )
    await connection.end()
    if (!Array.isArray(res) || res.length === 0) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    // Log de eliminación crítica
    await logSystemEvent('DELETE_EMPLEADO', 'admin', `Eliminado: ${empName} y sus registros`, 'dashboard')

    return NextResponse.json({ message: 'Empleado y sus registros eliminados' })
  } catch (error) {
    console.error('Error eliminando empleado:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

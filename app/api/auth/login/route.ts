import { NextRequest, NextResponse } from 'next/server';
import { getConnection } from '../../../../lib/db';
import { logSystemEvent } from '../../../../lib/logger';


export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if ((!email || email.trim() === '') || (!password || password === '')) {
      return NextResponse.json({ error: 'Usuario (email o DNI) y contraseña requeridos' }, { status: 400 });
    }

    const connection = await getConnection();
    
    // Buscar por email o DNI
    const [rows] = await connection.execute(
      "SELECT id, nombre, apellido, email, dni_admin, password, rol FROM usuarios WHERE (email = $1 OR dni_admin = $2) AND rol = 'admin' LIMIT 1",
      [email, email]
    );

    await connection.end();

    if (rows.length === 0) {
      // Log intento fallido (usuario desconocido)
      await logSystemEvent('LOGIN_FAIL', email, 'Usuario no encontrado', request.headers.get('x-forwarded-for') || 'unknown');
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    const user = rows[0] as unknown as { id: number; nombre: string; apellido: string; email: string; dni_admin: string; password: string; rol: string };
    
    // Verificar contraseña (temporal: comparación directa)
    // TODO: Hashear las contraseñas existentes en la DB
    if (password !== user.password) {
      // Log intento fallido (password)
      await logSystemEvent('LOGIN_FAIL', user.email || user.dni_admin, 'Contraseña incorrecta', request.headers.get('x-forwarded-for') || 'unknown');
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }

    // Log login exitoso
    await logSystemEvent('LOGIN_SUCCESS', user.email || user.dni_admin, `Rol: ${user.rol}`, request.headers.get('x-forwarded-for') || 'unknown');

    // Remover password de la respuesta
    const userWithoutPassword = {
      id: user.id,
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      dni_admin: user.dni_admin,
      rol: user.rol,
    };

    // Generar token simple (en producción usar JWT)
    const token = Buffer.from(`${user.id}-${Date.now()}`).toString('base64');

    return NextResponse.json({
      message: 'Login exitoso',
      user: userWithoutPassword,
      token
    });

  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

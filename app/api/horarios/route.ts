import { NextRequest, NextResponse } from 'next/server';
import { getConnection } from '../../../lib/db';


export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const usuarioId = searchParams.get('usuario_id');
    const downloadId = searchParams.get('download_id');

    const connection = await getConnection();

    if (downloadId) {
      const [rows] = await connection.execute(
        'SELECT archivo, mime_type, nombre_archivo FROM horarios WHERE id = $1',
        [downloadId]
      );
      await connection.end();
      const row = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
      if (!row || !row.archivo) {
        return new NextResponse('Not Found', { status: 404 });
      }
      const buffer = Buffer.from(row.archivo);
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': row.mime_type || 'application/pdf',
          'Content-Disposition': `inline; filename="${row.nombre_archivo || 'horario.pdf'}"`
        }
      });
    }

    let query = `
      SELECT h.*, u.nombre, u.apellido 
      FROM horarios h 
      LEFT JOIN usuarios u ON h.usuario_id = u.id 
      ORDER BY h.fecha_subida DESC
    `;
    const params: (string | number)[] = [];
    if (usuarioId) {
      query = `
        SELECT h.*, u.nombre, u.apellido 
        FROM horarios h 
        LEFT JOIN usuarios u ON h.usuario_id = u.id 
        WHERE h.usuario_id = $1 
        ORDER BY h.fecha_subida DESC
      `;
      params.push(Number(usuarioId));
    }
    const [rows] = await connection.execute(query, params);
    await connection.end();
    return NextResponse.json({ horarios: rows });

  } catch (error) {
    console.error('Error obteniendo horarios:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const form = await request.formData();
      const usuarioIdRaw = form.get('usuario_id');
      const file = form.get('file') as File | null;
      const altFile = form.get('archivo') as File | null;
      const f = file || altFile;
      if (!usuarioIdRaw || !f) {
        return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
      }
      const usuarioId = Number(usuarioIdRaw);
      const arrayBuffer = await f.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const nombre = form.get('nombre_archivo')?.toString() || f.name || 'horario.pdf';
      const mime = f.type || 'application/pdf';
      const size = buffer.length;
      const connection = await getConnection();
      const [result] = await connection.execute(
        'INSERT INTO horarios (usuario_id, nombre_archivo, mime_type, size, archivo) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [usuarioId, nombre, mime, size, buffer]
      );
      await connection.end();
      return NextResponse.json({ message: 'Horario subido exitosamente', id: (result[0] as { id: number })?.id });
    } else {
      const { usuario_id, nombre_archivo, ruta_archivo } = await request.json();
      if (!usuario_id || !nombre_archivo || !ruta_archivo) {
        return NextResponse.json({ error: 'Todos los campos son requeridos' }, { status: 400 });
      }
      const connection = await getConnection();
      const [result] = await connection.execute(
        'INSERT INTO horarios (usuario_id, nombre_archivo, ruta_archivo) VALUES ($1, $2, $3) RETURNING id',
        [usuario_id, nombre_archivo, ruta_archivo]
      );
      await connection.end();
      return NextResponse.json({ message: 'Horario subido exitosamente', id: (result[0] as { id: number })?.id });
    }
  } catch (error) {
    console.error('Error subiendo horario:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

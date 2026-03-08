import { NextResponse } from 'next/server';
import { getConnection } from '../../../../lib/db';
import { logSystemEvent } from '../../../../lib/logger';

export async function GET() {
  try {
    const connection = await getConnection();

    // Obtener todos los datos
    const [usuarios] = await connection.execute('SELECT * FROM usuarios');
    const [recibos] = await connection.execute('SELECT id, usuario_id, nombre_archivo, mime_type, size, fecha_subida, acknowledged, acknowledged_at, acknowledged_by FROM recibos'); // No incluimos el BLOB 'archivo' para no explotar la memoria, solo metadatos
    const [horarios] = await connection.execute('SELECT id, usuario_id, nombre_archivo, mime_type, size, fecha_subida FROM horarios'); // Igual, solo metadatos
    const [avisos] = await connection.execute('SELECT * FROM avisos');
    
    await connection.end();

    const backupData = {
      timestamp: new Date().toISOString(),
      version: '1.0',
      data: {
        usuarios,
        recibos, // Metadatos
        horarios, // Metadatos
        avisos
      }
    };

    const json = JSON.stringify(backupData, null, 2);
    
    await logSystemEvent('BACKUP_MANUAL', 'admin', 'Backup manual descargado');

    // Retornar como archivo descargable
    return new NextResponse(json, {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="libertador-backup-${new Date().toISOString().split('T')[0]}.json"`
      }
    });

  } catch (error) {
    console.error('Error generando backup:', error);
    return NextResponse.json({ error: 'Error interno generando backup' }, { status: 500 });
  }
}

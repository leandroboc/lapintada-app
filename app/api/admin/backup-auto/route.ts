import { NextResponse } from 'next/server';
import { getConnection } from '../../../../lib/db';
import { logSystemEvent } from '../../../../lib/logger';

export async function GET(request: Request) {
  try {
    // Verificación de seguridad básica para Cron Jobs
    // Vercel agrega este header automáticamente cuando ejecuta un Cron Job
    const authHeader = request.headers.get('authorization');
    const cronHeader = request.headers.get('x-vercel-cron');
    
    // Permitir si es Cron de Vercel O si tiene un token Bearer (para pruebas manuales si se quisiera)
    // En producción, es vital que esto esté protegido.
    // Si no es un cron job real y no tiene auth, rechazar.
    if (process.env.NODE_ENV === 'production' && !cronHeader && !authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const connection = await getConnection();

    // 1. Obtener datos para el backup
    const [usuarios] = await connection.execute('SELECT * FROM usuarios');
    const [recibos] = await connection.execute('SELECT id, usuario_id, nombre_archivo, mime_type, size, fecha_subida, acknowledged, acknowledged_at, acknowledged_by FROM recibos');
    const [horarios] = await connection.execute('SELECT id, usuario_id, nombre_archivo, mime_type, size, fecha_subida FROM horarios');
    const [avisos] = await connection.execute('SELECT * FROM avisos');
    const [avisosLeidos] = await connection.execute('SELECT * FROM avisos_leidos');

    const backupData = {
      timestamp: new Date().toISOString(),
      type: 'auto-weekly',
      version: '1.0',
      data: {
        usuarios,
        recibos,
        horarios,
        avisos,
        avisosLeidos
      }
    };

    const jsonContent = JSON.stringify(backupData);

    // 2. Guardar en la tabla system_backups
    // Asegurarse de que la tabla exista (por si el setup no corrió)
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS system_backups (
        id SERIAL PRIMARY KEY,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        data_json TEXT NOT NULL,
        tipo VARCHAR(20) DEFAULT 'auto'
      )
    `);

    await connection.execute(
      'INSERT INTO system_backups (data_json, tipo) VALUES ($1, $2)',
      [jsonContent, 'auto']
    );

    await connection.end();

    await logSystemEvent('BACKUP_AUTO', 'system', 'Backup semanal automático completado');

    return NextResponse.json({ message: 'Backup automático completado y guardado en DB' });

  } catch (error) {
    console.error('Error en backup automático:', error);
    return NextResponse.json({ error: 'Error interno en backup automático' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { getConnection } from '../../../../lib/db';
import { logSystemEvent } from '../../../../lib/logger';

export async function POST() {
  try {
    const connection = await getConnection();

    // Eliminar recibos huérfanos (cuyo usuario_id no existe en usuarios)
    const [recibosResult] = await connection.execute(
      'DELETE FROM recibos WHERE usuario_id NOT IN (SELECT id FROM usuarios)'
    );
    
    // Eliminar horarios huérfanos (cuyo usuario_id no existe en usuarios)
    const [horariosResult] = await connection.execute(
      'DELETE FROM horarios WHERE usuario_id NOT IN (SELECT id FROM usuarios)'
    );

    // Eliminar avisos_leidos huérfanos (cuyo usuario_id no existe en usuarios)
    await connection.execute(
      'DELETE FROM avisos_leidos WHERE usuario_id NOT IN (SELECT id FROM usuarios)'
    );

    // Eliminar avisos dirigidos a usuarios que no existen
    await connection.execute(
      "DELETE FROM avisos WHERE audiencia = 'usuario' AND usuario_id NOT IN (SELECT id FROM usuarios)"
    );

    await connection.end();

    // Obtener contadores de filas afectadas (dependiendo del driver puede variar la estructura, asumimos standard)
    // En mysql2/promise con execute, el resultado suele ser un objeto con affectedRows
    const deletedRecibos = (recibosResult as unknown as { affectedRows: number }).affectedRows || 0;
    const deletedHorarios = (horariosResult as unknown as { affectedRows: number }).affectedRows || 0;

    if (deletedRecibos > 0 || deletedHorarios > 0) {
      await logSystemEvent('CLEANUP', 'admin', `Limpieza: ${deletedRecibos} recibos y ${deletedHorarios} horarios eliminados`);
    }

    return NextResponse.json({
      message: 'Limpieza completada con éxito',
      detalles: {
        recibosEliminados: deletedRecibos,
        horariosEliminados: deletedHorarios
      }
    });

  } catch (error) {
    console.error('Error en saneamiento de base de datos:', error);
    return NextResponse.json({ error: 'Error interno durante el saneamiento' }, { status: 500 });
  }
}

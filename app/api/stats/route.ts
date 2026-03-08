import { NextResponse } from 'next/server';
import { getConnection } from '../../../lib/db';

export async function GET() {
  try {
    const connection = await getConnection();

    const [empleados] = await connection.execute(
      "SELECT COUNT(*)::int as total FROM usuarios WHERE rol IN ('empleado','chofer')"
    );
    const [recibos] = await connection.execute(
      'SELECT COUNT(*)::int as total FROM recibos'
    );
    const [horarios] = await connection.execute(
      'SELECT COUNT(*)::int as total FROM horarios'
    );

    const [recientesRecibos] = await connection.execute(
      'SELECT fecha_subida FROM recibos ORDER BY fecha_subida DESC LIMIT 1'
    );

    const [recientesHorarios] = await connection.execute(
      'SELECT fecha_subida FROM horarios ORDER BY fecha_subida DESC LIMIT 1'
    );

    let confirmados = 0;
    try {
      const [ack] = await connection.execute(
        'SELECT COUNT(*)::int as total FROM recibos WHERE acknowledged = TRUE'
      );
      confirmados = (ack[0] as unknown as { total: number }).total;
    } catch {
      confirmados = 0;
    }

    await connection.end();

    const stats = {
      empleados: (empleados[0] as unknown as { total: number }).total,
      recibos: (recibos[0] as unknown as { total: number }).total,
      horarios: (horarios[0] as unknown as { total: number }).total,
      ultimoRecibo: (recientesRecibos[0] as unknown as { fecha_subida: string })?.fecha_subida || null,
      ultimoHorario: (recientesHorarios[0] as unknown as { fecha_subida: string })?.fecha_subida || null,
      recibosConfirmados: confirmados,
      recibosPendientes: ((recibos[0] as unknown as { total: number }).total) - confirmados
    };

    return NextResponse.json({ stats });

  } catch (error) {
    console.error('Error obteniendo stats:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

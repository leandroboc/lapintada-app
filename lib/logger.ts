import { getConnection } from './db'

export async function logSystemEvent(accion: string, usuario: string, detalle: string, ip?: string) {
  try {
    const connection = await getConnection()
    // Asegurar que la tabla existe (por si acaso)
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS system_logs (
        id SERIAL PRIMARY KEY,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        accion VARCHAR(50) NOT NULL,
        usuario VARCHAR(100) DEFAULT 'sistema',
        detalle TEXT NULL,
        ip VARCHAR(50) NULL
      )
    `)
    
    await connection.execute(
      'INSERT INTO system_logs (accion, usuario, detalle, ip) VALUES ($1, $2, $3, $4)',
      [accion, usuario, detalle, ip || null]
    )
    await connection.end()
  } catch (error) {
    console.error('Error guardando log:', error)
  }
}

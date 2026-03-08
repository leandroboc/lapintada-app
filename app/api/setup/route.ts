import { NextResponse } from 'next/server'
import { getConnection } from '../../../lib/db'


export async function GET() {
  try {
    if (process.env.ALLOW_DB_SETUP !== 'true') {
      return NextResponse.json({ error: 'Setup deshabilitado' }, { status: 403 })
    }

    const connection = await getConnection()

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(120) NOT NULL,
        apellido VARCHAR(120) NOT NULL,
        email VARCHAR(255) DEFAULT NULL,
        dni_admin VARCHAR(20) NOT NULL,
        password VARCHAR(255) NOT NULL,
        rol TEXT NOT NULL CHECK (rol IN ('admin','empleado','chofer')),
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        fecha_modificacion TIMESTAMP NULL
      )
    `)

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS recibos (
        id SERIAL PRIMARY KEY,
        usuario_id INT NOT NULL,
        nombre_archivo VARCHAR(255) NOT NULL,
        mime_type VARCHAR(100) DEFAULT 'application/pdf',
        size INT NOT NULL,
        archivo BYTEA NOT NULL,
        fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        acknowledged BOOLEAN NOT NULL DEFAULT FALSE,
        acknowledged_at TIMESTAMP NULL,
        acknowledged_by INT NULL
      )
    `)

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS horarios (
        id SERIAL PRIMARY KEY,
        usuario_id INT NOT NULL,
        nombre_archivo VARCHAR(255) NOT NULL,
        mime_type VARCHAR(100) DEFAULT 'application/pdf',
        size INT NOT NULL,
        archivo BYTEA NOT NULL,
        fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS avisos (
        id SERIAL PRIMARY KEY,
        titulo VARCHAR(120) NOT NULL,
        mensaje TEXT NOT NULL,
        audiencia TEXT NOT NULL CHECK (audiencia IN ('todos','usuario')),
        usuario_id INT NULL,
        creado_por INT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        activo BOOLEAN NOT NULL DEFAULT TRUE,
        expires_at TIMESTAMP NULL DEFAULT NULL
      )
    `)

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS avisos_leidos (
        aviso_id INT NOT NULL,
        usuario_id INT NOT NULL,
        read_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (aviso_id, usuario_id)
      )
    `)

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS system_backups (
        id SERIAL PRIMARY KEY,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        data_json TEXT NOT NULL,
        tipo VARCHAR(20) DEFAULT 'auto'
      )
    `)

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

    const [rows] = await connection.execute(
      'SELECT COUNT(*)::int AS c FROM usuarios WHERE dni_admin = $1 LIMIT 1',
      ['12345678']
    )
    const count = (rows[0] as unknown as { c: number })?.c || 0
    if (count === 0) {
      await connection.execute(
        'INSERT INTO usuarios (nombre, apellido, email, dni_admin, password, rol) VALUES ($1, $2, $3, $4, $5, $6)',
        ['Juan', 'Pérez', 'juan@example.com', '12345678', 'secreta123', 'chofer']
      )
    }

    const [rowsAdmin] = await connection.execute(
      'SELECT COUNT(*)::int AS c FROM usuarios WHERE email = $1 LIMIT 1',
      ['admin@example.com']
    )
    const countAdmin = (rowsAdmin[0] as unknown as { c: number })?.c || 0
    if (countAdmin === 0) {
      await connection.execute(
        'INSERT INTO usuarios (nombre, apellido, email, dni_admin, password, rol) VALUES ($1, $2, $3, $4, $5, $6)',
        ['Admin', 'Principal', 'admin@example.com', '00000000', 'admin123', 'admin']
      )
    }

    let columnAdded = false
    await connection.execute(
      'ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    )
    columnAdded = true

    let modColumnAdded = false
    await connection.execute(
      'ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS fecha_modificacion TIMESTAMP NULL'
    )
    modColumnAdded = true

    const [dups] = await connection.execute(
      'SELECT dni_admin FROM usuarios GROUP BY dni_admin HAVING COUNT(*) > 1'
    )
    const duplicates = Array.isArray(dups) ? (dups as unknown[]).map((r) => (r as unknown as { dni_admin: string }).dni_admin) : []

    let indexAdded = false
    if (duplicates.length === 0) {
      await connection.execute(
        'CREATE UNIQUE INDEX IF NOT EXISTS idx_usuarios_dni_admin ON usuarios (dni_admin)'
      )
      indexAdded = true
    }

    let ackAdded = false
    await connection.execute(
      'ALTER TABLE recibos ADD COLUMN IF NOT EXISTS acknowledged BOOLEAN NOT NULL DEFAULT FALSE'
    )
    await connection.execute(
      'ALTER TABLE recibos ADD COLUMN IF NOT EXISTS acknowledged_at TIMESTAMP NULL'
    )
    await connection.execute(
      'ALTER TABLE recibos ADD COLUMN IF NOT EXISTS acknowledged_by INT NULL'
    )
    ackAdded = true

    await connection.end()

    return NextResponse.json({ message: 'Setup completo', columnAdded, modColumnAdded, indexAdded, duplicates, ackAdded })
  } catch (error: unknown) {
    const detail = typeof error === 'object' && error && 'toString' in error ? String(error) : 'Error de setup'
    return NextResponse.json({ error: 'Error de setup', detail }, { status: 500 })
  }
}

import { Pool } from 'pg'

const isProd = process.env.NODE_ENV === 'production'

const connectionString =
  process.env.LIBERTADOR_DATABASE_URL ||
  process.env.DATABASE_URL ||
  ''

const host = process.env.DB_HOST
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const database = process.env.DB_NAME
const port = process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432

const sslMode = process.env.DB_SSL
const ssl =
  sslMode === 'false'
    ? false
    : sslMode === 'true'
      ? { rejectUnauthorized: false as const }
      : isProd
        ? { rejectUnauthorized: false as const }
        : false

export const pool = new Pool({
  ...(connectionString
    ? { connectionString }
    : {
        host,
        user,
        password,
        database,
        port,
      }),
  ssl,
})

const toPgParams = (sql: string) => {
  let i = 0
  return sql.replace(/\?/g, () => `$${++i}`)
}

export const getConnection = async () => {
  if (!connectionString && (!host || !user || !database)) {
    throw new Error('Configuración de base de datos incompleta')
  }

  return {
    execute: async (sql: string, params: unknown[] = []) => {
      const q = toPgParams(sql)
      const res = await pool.query(q, params)
      return [res.rows]
    },
    end: async () => {},
  }
}

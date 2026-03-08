import { Pool } from 'pg'

const isProd = process.env.NODE_ENV === 'production'

const connectionString = process.env.DATABASE_URL || ''

export const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
})

const toPgParams = (sql: string) => {
  let i = 0
  return sql.replace(/\?/g, () => `$${++i}`)
}

export const getConnection = async () => {
  return {
    execute: async (sql: string, params: unknown[] = []) => {
      const q = toPgParams(sql)
      const res = await pool.query(q, params)
      return [res.rows]
    },
    end: async () => {},
  }
}

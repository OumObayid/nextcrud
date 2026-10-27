import { Pool } from 'pg';

export const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: Number(process.env.PG_PORT) || 5432
});

export async function query(sql: string, params?: any[]) {
  const { rows } = await pool.query(sql, params);
  return rows;
}

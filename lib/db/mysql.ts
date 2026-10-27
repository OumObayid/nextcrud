import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: Number(process.env.MYSQL_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


// Fonction utilitaire pour exécuter des requêtes
export async function query(sql: string, params?: any[]) {
  const [results] = await pool.execute(sql, params);//[results] retourne un tableau avec le premier élément qui est le résultat de la requête
  return results;
}

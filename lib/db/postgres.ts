/**
 * lib/db/postgres.ts
 * 
 * Gestionnaire de connexion directe à PostgreSQL via le pilote natif node-postgres (`pg`).
 * 
 * Caractéristiques :
 * - Fournit un Pool de connexions haute performance vers PostgreSQL.
 * - Prend en charge les requêtes SQL paramétrées avec la syntaxe standard PostgreSQL `$1, $2, etc.`.
 * - Récupère directement les lignes de données sous forme de tableaux d'objets JavaScript (`rows`).
 */

import { Pool } from 'pg';

/**
 * Instance unique du Pool PostgreSQL.
 * Réutilise les connexions TCP établies pour minimiser la latence réseau.
 */
export const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: Number(process.env.PG_PORT) || 5432,
});

/**
 * Fonction utilitaire pour exécuter des requêtes PostgreSQL préparées.
 * 
 * @param sql Requête SQL avec placeholders positionnels (ex: "SELECT * FROM products WHERE id = $1")
 * @param params Tableau des arguments substitués de manière sécurisée
 * @returns Tableau des lignes retournées (`rows`)
 */
export async function query(sql: string, params?: any[]) {
  const { rows } = await pool.query(sql, params);
  return rows;
}

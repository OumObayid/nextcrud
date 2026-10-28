/**
 * lib/db/mysql.ts
 * 
 * Gestionnaire de connexion directe à la base de données MySQL via le pilote natif mysql2.
 * 
 * Avantages de cette approche :
 * - Performance brute maximale sans couche d'abstraction ORM.
 * - Utilisation de requêtes SQL préparées (`pool.execute`) pour contrer les injections SQL.
 * - Gestion automatique du cycle de vie des connexions via un Pool partagé.
 */

import mysql from 'mysql2/promise';

/**
 * Création d'un pool de connexions MySQL réutilisables.
 * Évite d'ouvrir et fermer une connexion réseau à chaque requête HTTP.
 */
export const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: Number(process.env.MYSQL_PORT) || 3306,
  waitForConnections: true, // Met les requêtes en attente si toutes les connexions sont occupées
  connectionLimit: 10,     // Nombre maximal de connexions simultanées dans le pool
  queueLimit: 0            // File d'attente illimitée pour les requêtes en attente
});

/**
 * Fonction utilitaire simplifiée pour exécuter des requêtes SQL paramétrées.
 * 
 * @param sql Requête SQL brute avec des jokers `?` (ex: "SELECT * FROM products WHERE id = ?")
 * @param params Tableau des valeurs sécurisées injectées dans les jokers `?`
 * @returns Données de résultat désérialisées
 */
export async function query(sql: string, params?: any[]) {
  // `pool.execute` prépare la requête côté serveur MySQL pour optimiser la sécurité et la vitesse
  const [results] = await pool.execute(sql, params);
  return results;
}

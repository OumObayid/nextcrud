/**
 * lib/db/prismamysql.ts
 * 
 * Client Prisma ORM configuré pour le moteur MySQL / MariaDB.
 * 
 * Architecture et Fonctionnement clé :
 * ────────────────────────────────────
 * 1. Utilise l'adaptateur Prisma 7 `@prisma/adapter-mariadb` compatible MySQL / MariaDB.
 * 2. Prise en charge hybride des identifiants :
 *    - Priorité 1 : URL complète `DATABASE_URL_MYSQL` (format `mysql://...` ou `mariadb://...`).
 *    - Priorité 2 : objet de configuration explicite avec `MYSQL_HOST`, `MYSQL_USER`,
 *      `MYSQL_PASSWORD`, `MYSQL_DATABASE`, `MYSQL_PORT`.
 * 3. Pattern Singleton via l'objet `global` Node.js :
 *    En développement (`npm run dev`), Next.js recharge fréquemment les modules (HMR).
 *    Le Singleton évite d'épuiser le quota de connexions de la base en conservant
 *    une référence unique active à travers les rechargements.
 */

import { PrismaClient } from '@/app/generated/prisma-mysql/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { config } from "dotenv";

// Chargement préventif des variables .env.local (environnement de développement)
config({ path: ".env.local" });

// Déclaration de l'espace global typé pour le Singleton
const globalForPrisma = global as unknown as {
    prismaMysql: PrismaClient;
};

// Initialisation de l'adaptateur MariaDB/MySQL avec les identifiants d'environnement
const adapter = new PrismaMariaDb(process.env.DATABASE_URL_MYSQL || {
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'nextmysql',
  port: Number(process.env.MYSQL_PORT) || 3306,
});

// Réutilisation de l'instance existante en mémoire ou instanciation du client typé
const prismaMysql = globalForPrisma.prismaMysql || new PrismaClient({
  adapter,
});

// Enregistrement dans l'objet global hors production
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prismaMysql = prismaMysql;
}

export default prismaMysql;

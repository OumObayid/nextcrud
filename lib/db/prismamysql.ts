/**
 * lib/db/prismamysql.ts
 * 
 * Client Prisma configuré spécifiquement pour le moteur MySQL / MariaDB.
 * 
 * Fonctionnement clé :
 * 1. Utilise l'adaptateur moderne `@prisma/adapter-mariadb` pour bénéficier du pooling natif.
 * 2. Implémente le pattern Singleton via l'objet `global` de Node.js.
 *    En environnement de développement (`npm run dev`), Next.js recharge fréquemment
 *    les modules (Hot Module Replacement - HMR). Le Singleton évite d'épuiser le quota
 *    de connexions de la base en créant de nouvelles instances à chaque rechargement.
 */

import { PrismaClient } from '@/app/generated/prisma-mysql/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { config } from "dotenv";

// Chargement préventif des variables .env.local
config({ path: ".env.local" });

// Déclaration de l'espace global pour le Singleton en développement
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

// Réutilisation de l'instance existante ou instanciation d'un nouveau client
const prismaMysql = globalForPrisma.prismaMysql || new PrismaClient({
  adapter,
});

// Enregistrement dans l'objet global hors production
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prismaMysql = prismaMysql;
}

export default prismaMysql;

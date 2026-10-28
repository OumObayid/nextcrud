/**
 * lib/db/prismapg.ts
 * 
 * Client Prisma ORM configuré pour le moteur PostgreSQL.
 * 
 * Architecture et Fonctionnement clé :
 * ────────────────────────────────────
 * 1. Utilisation conjointe du pilote officiel `pg` (Pool) et de l'adaptateur
 *    Prisma 7 `@prisma/adapter-pg`.
 * 2. Prise en charge hybride de la configuration :
 *    - Priorité 1 : variables d'environnement individuelles (`PG_HOST`, `PG_USER`,
 *      `PG_PASSWORD`, `PG_DATABASE`, `PG_PORT`). Cette approche est la plus robuste
 *      sur les hébergements partagés (LWS, cPanel) où les mots de passe peuvent
 *      contenir des caractères spéciaux (`@`, `%`) problématiques dans une URI.
 *    - Priorité 2 : chaîne de connexion complète (`DATABASE_URL_PG`).
 * 3. Pattern Singleton via l'objet `global` Node.js :
 *    En développement (`npm run dev`), Next.js recharge fréquemment les fichiers (HMR).
 *    Le Singleton garantit qu'une seule instance du client Prisma et de son pool
 *    de connexions reste active, évitant l'épuisement du quota de sockets du serveur PostgreSQL.
 */

import { PrismaClient } from '@/app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { config } from "dotenv";

// Chargement préventif des variables .env.local (environnement de développement)
config({ path: ".env.local" });

// Espace global typé pour le pattern Singleton
const globalForPrisma = global as unknown as {
    prisma: PrismaClient;
};

// Construction du pool de connexions PostgreSQL
// Réutilise exactement la même logique robuste que lib/db/postgres.ts
const pool = new Pool(
  process.env.PG_HOST
    ? {
        host: process.env.PG_HOST || 'localhost',
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE,
        port: Number(process.env.PG_PORT) || 5432,
      }
    : {
        connectionString: process.env.DATABASE_URL_PG || 'postgresql://postgres:password123@localhost:5432/nextpg',
      }
);

// Initialisation de l'adaptateur Prisma 7 avec le pool PostgreSQL instancié
const adapter = new PrismaPg(pool);

// Réutilisation du client en mémoire ou instanciation d'un nouveau client typé
const prisma = globalForPrisma.prisma || new PrismaClient({
  adapter,
});

// Conservation de l'instance dans le scope global hors production
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;

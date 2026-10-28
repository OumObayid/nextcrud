/**
 * lib/db/prismapg.ts
 * 
 * Client Prisma configuré pour PostgreSQL.
 * 
 * Fonctionnement clé :
 * 1. Utilise le pool de connexions pg.Pool (identique à lib/db/postgres.ts)
 *    avec @prisma/adapter-pg pour garantir une compatibilité totale avec
 *    les identifiants d'environnement PG_HOST, PG_USER, PG_PASSWORD, etc.
 * 2. Implémente le pattern Singleton sur l'objet global afin d'éviter la
 *    prolifération de connexions concurrentes pendant le rechargement (HMR).
 */

import { PrismaClient } from '@/app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { config } from "dotenv";

// Chargement préventif des variables .env.local
config({ path: ".env.local" });

// Espace global pour le Singleton
const globalForPrisma = global as unknown as {
    prisma: PrismaClient;
};

// Pool PostgreSQL réutilisant la même configuration que lib/db/postgres.ts
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

// Initialisation de l'adaptateur PostgreSQL via le pool pg
const adapter = new PrismaPg(pool);

// Récupération de l'instance mise en cache ou nouvelle instanciation
const prisma = globalForPrisma.prisma || new PrismaClient({
  adapter,
});

// Conservation de l'instance dans le scope global hors production
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;

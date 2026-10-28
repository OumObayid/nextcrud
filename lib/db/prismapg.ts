/**
 * lib/db/prismapg.ts
 * 
 * Client Prisma configuré pour PostgreSQL.
 * 
 * Fonctionnement clé :
 * 1. Utilise `@prisma/adapter-pg` avec l'URL de connexion PostgreSQL `DATABASE_URL_PG`.
 * 2. Implémente le pattern Singleton sur l'objet `global` afin d'éviter la prolifération
 *    de connexions concurrentes pendant le rechargement à chaud (HMR) en développement.
 */

import { PrismaClient } from '@/app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { config } from "dotenv";

// Chargement préventif des variables .env.local
config({ path: ".env.local" });

// Espace global pour le Singleton
const globalForPrisma = global as unknown as {
    prisma: PrismaClient;
};

// Initialisation de l'adaptateur PostgreSQL
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL_PG,
});

// Récupération de l'instance mise en cache ou nouvelle instanciation
const prisma = globalForPrisma.prisma || new PrismaClient({
  adapter,
});

// Conservation de l'instance dans le scope global hors production
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
/**
 * prisma.config.ts (Prisma 7 Config standard)
 * 
 * Fichier de configuration centralisé pour Prisma ORM.
 * 
 * Il permet :
 * 1. De charger spécifiquement le fichier `.env.local` utilisé par Next.js au lieu du `.env` standard.
 * 2. De pointer vers le schéma Prisma PostgreSQL principal.
 * 3. De configurer l'exécution automatique des migrations et du script de seed (`prisma/seed.ts`).
 */

import { config } from "dotenv";
import fs from "fs";

// Chargement intelligent des variables d'environnement pour Prisma CLI :
// Ordre de priorité : .env.local > .env.[mode] > .env > .env.development (secours)
const nodeEnv = process.env.NODE_ENV || "development";
const envFiles = [
  `.env.${nodeEnv}.local`,
  ".env.local",
  `.env.${nodeEnv}`,
  ".env",
  ".env.development",
];

for (const file of envFiles) {
  if (fs.existsSync(file)) {
    config({ path: file });
  }
}

import { defineConfig, env } from "prisma/config";

export default defineConfig({
  // Schéma Prisma actif par défaut (PostgreSQL)
  schema: "prisma/schema.prisma",

  migrations: {
    // Dossier contenant l'historique des migrations SQL versionnées
    path: "prisma/migrations",
    // Commande de peuplement initial exécutée via tsx (TypeScript runtime)
    seed: `tsx prisma/seed.ts`,
  },

  datasource: {
    // URL de connexion dynamique injectée depuis l'environnement
    url: env("DATABASE_URL_PG"),
  },
});

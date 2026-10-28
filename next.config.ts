import type { NextConfig } from "next";

/**
 * ==============================================================================
 * Configuration Globale Next.js
 * ==============================================================================
 * 
 * Ce fichier configure le comportement d'exécution du compilateur Next.js.
 * 
 * serverExternalPackages :
 * ───────────────────────
 * Exclut explicitement les packages de bases de données et les adaptateurs
 * Prisma ORM du processus de bundling interne de Next.js.
 * 
 * Pourquoi cette configuration est indispensable :
 * 1. Les pilotes de bases de données (`mariadb`, `pg`, `mysql2`) et les adaptateurs
 *    Prisma 7 (`@prisma/adapter-mariadb`, `@prisma/adapter-pg`) utilisent des modules
 *    Node.js bas niveau ou des compilateurs WASM.
 * 2. Si Next.js tente de les bundler, il génère des erreurs au runtime comme :
 *    - "Cannot read properties of undefined (reading 'graph')"
 *    - "Cannot find module [externals]_node:buffer_..."
 * 3. En les déclarant dans `serverExternalPackages`, Next.js les laisse intacts
 *    et les charge directement depuis `node_modules` via le `require()` natif
 *    au moment de l'exécution sur le serveur de production (Phusion Passenger / Linux).
 */
const nextConfig: NextConfig = {
  serverExternalPackages: [
    // Adaptateurs Prisma 7
    "@prisma/adapter-mariadb",
    "@prisma/adapter-pg",
    // Cœur du client Prisma ORM
    "@prisma/client",
    // Pilotes natifs de bases de données
    "mariadb",
    "mysql2",
    "pg",
  ],
};

export default nextConfig;

import type { NextConfig } from "next";

/**
 * ==============================================================================
 * Configuration Globale Next.js
 * ==============================================================================
 * 
 * serverExternalPackages :
 * Permet d'exclure les drivers natifs et les clients Prisma du bundling
 * interne Turbopack afin qu'ils soient résolus directement au runtime Node.js.
 */
const nextConfig: NextConfig = {
  serverExternalPackages: [
    "@prisma/adapter-mariadb",
    "@prisma/adapter-pg",
    "@prisma/client",
    "mariadb",
    "mysql2",
    "pg",
  ],
};

export default nextConfig;

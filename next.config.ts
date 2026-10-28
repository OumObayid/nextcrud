import type { NextConfig } from "next";

/**
 * ==============================================================================
 * Configuration Globale Next.js
 * ==============================================================================
 * 
 * Ce fichier configure le comportement d'exécution du compilateur Next.js.
 * Options extensibles : optimisations d'images distantes, redirections, en-têtes de sécurité, etc.
 */
const nextConfig: NextConfig = {
  /**
   * Mode Standalone :
   * Génère automatiquement un dossier autonome (.next/standalone) incluant
   * uniquement le code et les modules Node.js strictement nécessaires à l'exécution.
   * Idéal pour le déploiement léger sur serveur et les transferts FTP rapides.
   */
  output: "standalone",
};

export default nextConfig;

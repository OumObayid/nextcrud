/**
 * proxy.ts (Convention Next.js 16 - remplaçant de middleware.ts)
 * 
 * Ce fichier gère la sécurisation et l'interception des requêtes entrantes
 * grâce au wrapper `withAuth` fourni par NextAuth.js.
 * 
 * Fonctionnement :
 * 1. Toute requête correspondant aux routes définies dans `config.matcher` est interceptée.
 * 2. Si l'utilisateur n'est pas authentifié (aucun token de session valide), il est
 *    automatiquement redirigé vers la page de connexion (`/login`).
 * 3. Si l'utilisateur est authentifié, la requête continue son cycle normal.
 */

import { withAuth } from "next-auth/middleware";

export const proxy = withAuth({
  pages: {
    // Page personnalisée vers laquelle rediriger en cas d'accès non autorisé
    signIn: "/login",
  },
});

export default proxy;

/**
 * Configuration du matcher d'interception :
 * Seules les routes listées ci-dessous nécessitent une session active.
 * Ex: /dashboard, /dashboard/profil, etc.
 */
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};

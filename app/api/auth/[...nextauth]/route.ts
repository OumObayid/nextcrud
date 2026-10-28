/**
 * app/api/auth/[...nextauth]/route.ts
 * 
 * Route Handler dynamique pour NextAuth.js (App Router de Next.js).
 * 
 * Ce fichier intercepte toutes les requêtes d'authentification :
 * - `GET /api/auth/signin`, `/api/auth/signout`, `/api/auth/session`, `/api/auth/csrf`, `/api/auth/providers`
 * - `POST /api/auth/callback/:provider`, `/api/auth/signin/:provider`
 * 
 * Toutes les requêtes GET et POST sont déléguées à l'instance NextAuth
 * configurée avec les options de sécurité de `lib/auth/auth.ts`.
 */

import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

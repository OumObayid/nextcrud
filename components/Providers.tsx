/**
 * components/Providers.tsx
 * 
 * Composant Provider Client pour NextAuth.js.
 * 
 * Pourquoi ce composant intermédiaire ?
 * Le layout racine (`app/layout.tsx`) est un Server Component par défaut.
 * Le contexte d'authentification React (`SessionProvider`) nécessite le contexte client
 * (`use client`). En isolant `SessionProvider` dans ce composant dédié,
 * nous permettons à l'arbre entier de bénéficier du hook `useSession()`
 * tout en conservant le rendu serveur sur les autres composants du layout.
 */

"use client";

import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
    return <SessionProvider>{children}</SessionProvider>;
}

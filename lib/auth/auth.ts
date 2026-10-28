/**
 * lib/auth/auth.ts
 * 
 * Configuration centrale de l'authentification avec NextAuth.js.
 * 
 * Fonctionnalités implémentées :
 * 1. Stratégie JWT (JSON Web Tokens) : aucun stockage de session côté serveur, scalabilité optimale.
 * 2. Fournisseur Credentials (Email / Mot de passe) avec hachage sécurisé bcrypt.
 * 3. Fournisseur OAuth Google (avec liaison automatique de compte en base).
 * 4. Callbacks personnalisés (`signIn`, `jwt`, `session`) pour enrichir le token et la session avec l'identifiant utilisateur (`user.id`).
 */

import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { query } from "@/lib/db/mysql";

export const authOptions: NextAuthOptions = {
    // Clé secrète utilisée pour signer et chiffrer les tokens JWT
    secret: process.env.NEXTAUTH_SECRET,

    // Session basée sur des jetons JWT sécurisés et signés
    session: {
        strategy: "jwt",
    },

    // Pages personnalisées pour remplacer les interfaces par défaut de NextAuth
    pages: {
        signIn: "/login",
        error: "/login",
    },

    providers: [
        /**
         * 1. Fournisseur par identifiants classiques (Email / Mot de passe)
         */
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Mot de passe", type: "password" },
            },

            async authorize(credentials) {
                // Validation de présence des deux champs
                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                // Recherche de l'utilisateur par son email dans MySQL
                const users: any = await query(
                    "SELECT * FROM users WHERE email = ? LIMIT 1",
                    [credentials.email]
                );

                const user = users[0];
                // Si l'utilisateur n'existe pas ou s'il s'agit d'un compte créé exclusivement via OAuth (sans mot de passe)
                if (!user || !user.password_hash) return null;

                // Comparaison sécurisée du mot de passe en clair avec l'empreinte bcrypt
                const isValid = await bcrypt.compare(
                    credentials.password,
                    user.password_hash
                );

                if (!isValid) return null;

                // Objet renvoyé au JWT pour créer la session
                return {
                    id: user.id.toString(),
                    email: user.email,
                    name: user.name,
                };
            },
        }),

        /**
         * 2. Fournisseur OAuth Google
         */
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],

    callbacks: {
        /**
         * Callback exécuté à chaque tentative de connexion réussie.
         * Gère la création ou la fusion de compte pour les connexions OAuth (Google).
         */
        async signIn({ user, account }) {
            if (!account) return false;
            // Pour credentials, l'autorisation a déjà été validée dans `authorize()`
            if (account.provider === "credentials") return true;

            if (!user.email) {
                console.error("Connexion OAuth : aucun email fourni par le fournisseur.");
                return false;
            }

            try {
                // 1. Vérifier si un compte existe déjà avec cet email
                const existingUsers: any = await query(
                    "SELECT * FROM users WHERE email = ? LIMIT 1",
                    [user.email]
                );

                if (existingUsers.length > 0) {
                    // L'utilisateur existe déjà : mise à jour du fournisseur et de son identifiant externe
                    await query(
                        "UPDATE users SET provider = ?, provider_id = ?, name = COALESCE(?, name) WHERE email = ?",
                        [account.provider, account.providerAccountId, user.name ?? null, user.email]
                    );
                } else {
                    // Nouvel utilisateur externe : insertion automatique
                    await query(
                        "INSERT INTO users (email, name, provider, provider_id) VALUES (?, ?, ?, ?)",
                        [user.email, user.name ?? null, account.provider, account.providerAccountId]
                    );
                }

                return true;
            } catch (error) {
                console.error("Erreur dans le callback signIn:", error);
                return false;
            }
        },

        /**
         * Callback appelé chaque fois qu'un token JWT est créé ou mis à jour.
         * Permet d'attacher l'id numérique de l'utilisateur directement au payload du jeton.
         */
        async jwt({ token, user, account }) {
            if (account && user?.email) {
                try {
                    const dbUsers: any = await query(
                        "SELECT id FROM users WHERE email = ? LIMIT 1",
                        [user.email]
                    );
                    if (dbUsers.length > 0) {
                        token.id = dbUsers[0].id.toString();
                    }
                } catch (e) {
                    console.error("Erreur dans le callback jwt:", e);
                }
            } else if (user?.id) {
                token.id = user.id;
            }
            return token;
        },

        /**
         * Callback appelé chaque fois que la session est lue côté client (`useSession`) ou serveur (`getServerSession`).
         * Expose l'identifiant utilisateur (`session.user.id`) aux composants React.
         */
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id || token.sub;
            }
            return session;
        },
    },
};

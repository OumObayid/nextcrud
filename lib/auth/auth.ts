import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { query } from "@/lib/db/mysql";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,

    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/login",
        error: "/login",
    },

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Mot de passe", type: "password" },
            },

            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                const users: any = await query(
                    "SELECT * FROM users WHERE email = ? LIMIT 1",
                    [credentials.email]
                );

                const user = users[0];
                if (!user || !user.password_hash) return null;

                const isValid = await bcrypt.compare(
                    credentials.password,
                    user.password_hash
                );

                if (!isValid) return null;

                return {
                    id: user.id.toString(),
                    email: user.email,
                    name: user.name,
                };
            },
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],

    callbacks: {
        async signIn({ user, account }) {
            if (!account) return false;
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
                    // L'utilisateur existe déjà : on lie le compte en mettant à jour provider et provider_id
                    await query(
                        "UPDATE users SET provider = ?, provider_id = ?, name = COALESCE(?, name) WHERE email = ?",
                        [account.provider, account.providerAccountId, user.name ?? null, user.email]
                    );
                } else {
                    // Nouvel utilisateur : on l'insère
                    await query(
                        "INSERT INTO users (email, name, provider, provider_id) VALUES (?, ?, ?, ?)",
                        [user.email, user.name ?? null, account.provider, account.providerAccountId]
                    );
                }

                return true;
            } catch (error) {
                console.error("Erreur dans signIn callback:", error);
                return false;
            }
        },

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
                    console.error("Erreur jwt callback:", e);
                }
            } else if (user?.id) {
                token.id = user.id;
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id || token.sub;
            }
            return session;
        },
    },
};

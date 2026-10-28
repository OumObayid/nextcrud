/**
 * app/api/register/route.ts
 * 
 * Endpoint d'inscription d'un nouvel utilisateur (POST /api/register).
 * 
 * Étapes du traitement :
 * 1. Extraction et validation de la présence des champs `name`, `email` et `password`.
 * 2. Contrôle d'unicité de l'adresse email dans la table `users`.
 * 3. Hachage à sens unique du mot de passe avec l'algorithme bcrypt (10 rounds de salage).
 * 4. Insertion en base de données avec le fournisseur par défaut `credentials`.
 * 5. Retour d'une réponse JSON normalisée avec code HTTP adapté (201 Created ou 400 Bad Request).
 */

import { NextResponse } from "next/server";
import { query } from "@/lib/db/mysql";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, name, password } = await req.json();

    // 1. Validation des champs obligatoires
    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    // 2. Vérification d'unicité de l'adresse email
    const existing: any = await query(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (existing && existing.length > 0) {
      return NextResponse.json(
        { message: "Cet email est déjà utilisé. Veuillez vous connecter." },
        { status: 400 }
      );
    }

    // 3. Hachage sécurisé du mot de passe avec bcrypt
    const password_hash = await bcrypt.hash(password, 10);

    // 4. Insertion du nouvel utilisateur en base MySQL
    await query(
      "INSERT INTO users (email, name, password_hash, provider) VALUES (?, ?, ?, 'credentials')",
      [email, name, password_hash]
    );

    return NextResponse.json(
      { message: "Compte créé avec succès" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    return NextResponse.json(
      { message: "Une erreur est survenue lors de l'enregistrement" },
      { status: 500 }
    );
  }
}

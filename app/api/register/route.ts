import { NextResponse } from "next/server";
import { query } from "@/lib/db/mysql";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { email, name, password } = await req.json();

  if (!email || !password || !name) {
    return NextResponse.json({ message: "Tous les champs sont requis" }, { status: 400 });
  }

  // Vérifier si l'utilisateur existe déjà
  const existing: any = await query(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email]
  );
  if (existing.length > 0) {
    return NextResponse.json({ message: "Cet email est déjà utilisé. Veuillez vous connecter." }, { status: 400 });
  }

  // Hasher le mot de passe
  const password_hash = await bcrypt.hash(password, 10);

  // Créer l'utilisateur
  await query(
    "INSERT INTO users (email, name, password_hash, provider) VALUES (?, ?, ?, 'credentials')",
    [email, name, password_hash]
  );

  return NextResponse.json({ message: "Utilisateur créé" }, { status: 201 });
}

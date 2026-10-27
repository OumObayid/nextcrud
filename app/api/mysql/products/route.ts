import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/mysql';

// GET /api/products
export async function GET(req: NextRequest) {
  try {
    // Récupérer tous les produits
    const products = await query('SELECT * FROM products ORDER BY id ASC');

    // Retourner en JSON
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Erreur GET /api/products:', error);
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}

// POST /api/products
export async function POST(req: NextRequest) {
  try {
    // Récupérer le corps de la requête
    const body = await req.json();
   // Destructuration des champs
    const { name, description, price, image } = body;
   // Vérification des champs
    if (!name || !description || !price || !image) {
      return NextResponse.json(
        { message: 'Champs manquants' },
        { status: 400 }
      );
    }
    // Insertion du produit dans la base de données
    const result = await query(
      'INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)',
      [name, description, price, image]
    );
    // Retourner l'id du produit ajouté
    return NextResponse.json(
      { message: 'Produit ajouté', id: (result as any).insertId },
      { status: 201 }
    );
    // Gestion des erreurs
  } catch (error) {
    console.error('POST /api/mysql/products error:', error);
    return NextResponse.json(
      { message: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
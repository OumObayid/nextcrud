/**
 * app/api/pg/products/route.ts
 * 
 * Route API pour les Produits - Moteur PostgreSQL Natif.
 * 
 * Endpoints :
 * - GET  /api/pg/products : Récupère la liste ordonnée de tous les produits PostgreSQL.
 * - POST /api/pg/products : Insère un nouveau produit en utilisant la syntaxe paramétrée `$1, $2...`.
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/postgres';

/**
 * GET : Sélection de tous les produits stockés dans PostgreSQL
 */
export async function GET(_req: NextRequest) {
  try {
    // Requête brute exécutée sur le Pool PostgreSQL
    const products = await query('SELECT * FROM products ORDER BY id ASC');

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Erreur GET /api/pg/products:', error);
    return NextResponse.json({ message: 'Erreur serveur lors de la récupération' }, { status: 500 });
  }
}

/**
 * POST : Création d'un produit avec validation et insertion paramétrée PostgreSQL ($1, $2, $3, $4)
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, price, image } = body;

    // Contrôle de validation
    if (!name || !description || !price || !image) {
      return NextResponse.json(
        { message: 'Tous les champs (nom, description, prix, image) sont obligatoires' },
        { status: 400 }
      );
    }

    // Insertion PostgreSQL avec clause RETURNING id pour récupérer la clé primaire générée
    const result: any = await query(
      'INSERT INTO products (name, description, price, image) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, description, price, image]
    );

    const insertedId = result && result[0] ? result[0].id : undefined;

    return NextResponse.json(
      { message: 'Produit créé avec succès', id: insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur POST /api/pg/products:', error);
    return NextResponse.json(
      { message: 'Erreur serveur lors de la création' },
      { status: 500 }
    );
  }
}
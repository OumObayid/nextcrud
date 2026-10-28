/**
 * app/api/mysql/products/route.ts
 * 
 * Route API pour les Produits - Moteur MySQL Natif.
 * 
 * Endpoints :
 * - GET  /api/mysql/products : Récupère la liste complète des produits ordonnée par id.
 * - POST /api/mysql/products : Crée un nouveau produit via une requête SQL paramétrée.
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/mysql';

/**
 * GET : Sélection de tous les produits stockés dans MySQL
 */
export async function GET(_req: NextRequest) {
  try {
    // Exécution d'une requête SQL pure via le pool mysql2
    const products = await query('SELECT * FROM products ORDER BY id ASC');

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Erreur GET /api/mysql/products:', error);
    return NextResponse.json({ message: 'Erreur serveur lors de la récupération' }, { status: 500 });
  }
}

/**
 * POST : Création d'un produit avec validation et requête INSERT préparée
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, price, image } = body;

    // Validation des données requises
    if (!name || !description || !price || !image) {
      return NextResponse.json(
        { message: 'Tous les champs (nom, description, prix, image) sont obligatoires' },
        { status: 400 }
      );
    }

    // Insertion sécurisée avec placeholders '?' anti-injection
    const result = await query(
      'INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)',
      [name, description, price, image]
    );

    // Retour de l'identifiant nouvellement généré (insertId)
    return NextResponse.json(
      { message: 'Produit créé avec succès', id: (result as any).insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur POST /api/mysql/products:', error);
    return NextResponse.json(
      { message: 'Erreur serveur lors de la création' },
      { status: 500 }
    );
  }
}
/**
 * app/api/pg/products/[id]/route.ts
 * 
 * Route Handler dynamique pour un produit PostgreSQL Natif : /api/pg/products/:id.
 * 
 * Opérations unitaires :
 * - GET    : Récupération d'un produit par identifiant avec la syntaxe `$1`.
 * - PUT    : Mise à jour des informations avec placeholders `$1, $2, $3, $4, $5`.
 * - DELETE : Suppression sécurisée de la ligne correspondante.
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/postgres';

/**
 * GET : Récupération d'un produit par ID
 */
export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Requête préparée avec paramètre positionnel $1
        const results = await query('SELECT * FROM products WHERE id = $1', [id]);

        if (!results || !Array.isArray(results) || results.length === 0) {
            return NextResponse.json(
                { message: 'Produit introuvable' },
                { status: 404 }
            );
        }

        const product = results[0];
        return NextResponse.json(product, { status: 200 });
    } catch (error: any) {
        console.error('Erreur GET /api/pg/products/[id]:', error);
        return NextResponse.json(
            { message: 'Erreur serveur', error: error.message },
            { status: 500 }
        );
    }
}

/**
 * PUT : Modification d'un produit existant
 */
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { name, description, price, image } = body;

        // Validation des champs reçus
        if (!name || !description || !price || !image) {
            return NextResponse.json(
                { message: 'Tous les champs sont requis pour la mise à jour' },
                { status: 400 }
            );
        }

        // Requête de mise à jour paramétrée
        await query(
            'UPDATE products SET name = $1, description = $2, price = $3, image = $4 WHERE id = $5',
            [name, description, price, image, id]
        );

        return NextResponse.json(
            { message: 'Produit mis à jour avec succès' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Erreur PUT /api/pg/products/[id]:', error);
        return NextResponse.json(
            { message: 'Erreur serveur lors de la mise à jour', error: error.message },
            { status: 500 }
        );
    }
}

/**
 * DELETE : Suppression d'un produit par clé primaire
 */
export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Requête DELETE préparée
        await query('DELETE FROM products WHERE id = $1', [id]);

        return NextResponse.json(
            { message: 'Produit supprimé avec succès' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Erreur DELETE /api/pg/products/[id]:', error);
        return NextResponse.json(
            { message: 'Erreur serveur lors de la suppression', error: error.message },
            { status: 500 }
        );
    }
}

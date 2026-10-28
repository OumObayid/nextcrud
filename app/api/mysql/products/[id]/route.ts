/**
 * app/api/mysql/products/[id]/route.ts
 * 
 * Route Handler dynamique par identifiant : /api/mysql/products/:id (MySQL Natif).
 * 
 * Opérations unitaires :
 * - GET    : Récupération des informations détaillées d'un produit spécifique.
 * - PUT    : Mise à jour complète des attributs du produit.
 * - DELETE : Suppression définitive du produit de la table MySQL.
 * 
 * Note Next.js 15/16 : `params` est traité de manière asynchrone (`await params`).
 */

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/mysql';

/**
 * GET : Recherche d'un produit par clé primaire
 */
export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Requête préparée avec filtre sur l'id
        const results = await query('SELECT * FROM products WHERE id = ?', [id]);

        // Vérification de l'existence du produit retourné
        if (!results || !Array.isArray(results) || results.length === 0) {
            return NextResponse.json(
                { message: 'Produit introuvable' },
                { status: 404 }
            );
        }

        const product = results[0];
        return NextResponse.json(product, { status: 200 });
    } catch (error: any) {
        console.error('Erreur GET /api/mysql/products/[id]:', error);
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

        // Contrôle de complétude des données
        if (!name || !description || !price || !image) {
            return NextResponse.json(
                { message: 'Tous les champs sont requis pour la mise à jour' },
                { status: 400 }
            );
        }

        // Exécution de l'UPDATE SQL
        const result = await query(
            'UPDATE products SET name = ?, description = ?, price = ?, image = ? WHERE id = ?',
            [name, description, price, image, id]
        );

        // Si aucune ligne n'a été affectée, l'id n'existait pas
        if ((result as { affectedRows: number }).affectedRows === 0) {
            return NextResponse.json(
                { message: 'Produit introuvable pour la mise à jour' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Produit mis à jour avec succès' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Erreur PUT /api/mysql/products/[id]:', error);
        return NextResponse.json(
            { message: 'Erreur serveur lors de la mise à jour', error: error.message },
            { status: 500 }
        );
    }
}

/**
 * DELETE : Suppression d'un produit par identifiant
 */
export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Exécution du DELETE SQL
        const result = await query('DELETE FROM products WHERE id = ?', [id]);

        // Contrôle du nombre de lignes supprimées
        if ((result as any).affectedRows === 0) {
            return NextResponse.json(
                { message: 'Produit introuvable pour la suppression' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: 'Produit supprimé avec succès' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Erreur DELETE /api/mysql/products/[id]:', error);
        return NextResponse.json(
            { message: 'Erreur serveur lors de la suppression', error: error.message },
            { status: 500 }
        );
    }
}

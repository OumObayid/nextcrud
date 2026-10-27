import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/mysql';

// GET /api/mysql/products/:id - Récupérer un produit par son ID
export async function GET(req: NextRequest,
    { params }: { params: Promise<{ id: string }> } // Params est une Promise en Next.js 15+
) {
    try {
        const { id } = await params;

        // Récupérer le produit
        const results = await query('SELECT * FROM products WHERE id = ?', [id]);

        // Vérifier si results est bien un tableau et contient au moins un élément
        if (!results || !Array.isArray(results) || results.length === 0) {
            return NextResponse.json(
                { message: 'Produit non trouvé' },
                { status: 404 }
            );
        }

        const product = results[0];

        // Retourner le produit
        return NextResponse.json(product, { status: 200 });
    } catch (error: any) {
        console.error('Erreur GET /api/mysql/products/[id]:', error);
        return NextResponse.json(
            { message: 'Erreur serveur', error: error.message },
            { status: 500 }
        );
    }
}

// PUT /api/mysql/products/:id - Mettre à jour un produit
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { name, description, price, image } = body;

        // Validation basique
        if (!name || !description || !price || !image) {
            return NextResponse.json(
                { message: 'Champs manquants' },
                { status: 400 }
            );
        }

        // Mise à jour dans la base de données
        const result = await query(
            'UPDATE products SET name = ?, description = ?, price = ?, image = ? WHERE id = ?',
            [name, description, price, image, id]
        );

        // Vérifier si le produit a été trouvé et mis à jour
        if ((result as { affectedRows: number }).affectedRows === 0) {
            return NextResponse.json(
                { message: 'Produit non trouvé' },
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
            { message: 'Erreur serveur', error: error.message },
            { status: 500 }
        );
    }
}

// DELETE /api/mysql/products/:id - Supprimer un produit
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Suppression dans la base de données
        const result = await query('DELETE FROM products WHERE id = ?', [id]);

        // Vérifier si le produit a été trouvé et supprimé
        // Retourner un message d'erreur si le produit n'a pas été trouvé
        if ((result as any).affectedRows === 0) {
            return NextResponse.json(
                { message: 'Produit non trouvé' },
                { status: 404 }
            );
        }
        // Retourner un message de succès
        return NextResponse.json(
            { message: 'Produit supprimé avec succès' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Erreur DELETE /api/mysql/products/[id]:', error);
        return NextResponse.json(
            { message: 'Erreur serveur', error: error.message },
            { status: 500 }
        );
    }
}

import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/postgres';

// GET /api/pg/products/:id - Récupérer un produit par son ID
export async function GET(req: NextRequest,
    { params }: { params: Promise<{ id: string }> } // Params est une Promise en Next.js 15+
) {
    try {
        const { id } = await params;
        console.log('API GET ID:', id);

        // Récupérer le produit
        const results = await query('SELECT * FROM products WHERE id = $1', [id]);

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
        console.error('Erreur GET /api/pg/products/[id]:', error);
        return NextResponse.json(
            { message: 'Erreur serveur', error: error.message },
            { status: 500 }
        );
    }
}

// PUT /api/pg/products/:id - Mettre à jour un produit
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
            'UPDATE products SET name = $1, description = $2, price = $3, image = $4 WHERE id = $5',
            [name, description, price, image, id]
        );

        // Vérifier si le produit a été trouvé et mis à jour
        if ((result as any).affectedRows === 0) {
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
        console.error('Erreur PUT /api/pg/products/[id]:', error);
        return NextResponse.json(
            { message: 'Erreur serveur', error: error.message },
            { status: 500 }
        );
    }
}

// DELETE /api/pg/products/:id - Supprimer un produit
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Suppression dans la base de données
        const result = await query('DELETE FROM products WHERE id = $1', [id]);

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
        console.error('Erreur DELETE /api/pg/products/[id]:', error);
        return NextResponse.json(
            { message: 'Erreur serveur', error: error.message },
            { status: 500 }
        );
    }
}

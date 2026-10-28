/**
 * app/api/mysqlprisma/products/[id]/route.ts
 * 
 * Route Handler dynamique par ID pour MySQL via Prisma ORM : /api/mysqlprisma/products/:id.
 * 
 * Méthodes Prisma utilisées :
 * - `prisma.product.findUnique()` : Recherche par clé primaire indexée.
 * - `prisma.product.update()`     : Mise à jour atomique avec typage vérifié.
 * - `prisma.product.delete()`     : Suppression sécurisée par clé primaire.
 */

import { NextRequest, NextResponse } from 'next/server';
import prismaMysql from '@/lib/db/prismamysql';

/**
 * GET : Récupère les détails d'un produit MySQL spécifique
 */
export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const productId = parseInt(id, 10);

        if (isNaN(productId)) {
            return NextResponse.json({ error: 'ID de produit invalide' }, { status: 400 });
        }

        // Recherche par clé primaire 'id'
        const product = await prismaMysql.product.findUnique({
            where: { id: productId }
        });

        if (!product) {
            return NextResponse.json({ error: 'Produit introuvable' }, { status: 404 });
        }

        return NextResponse.json(product, { status: 200 });
    } catch (error: any) {
        console.error("Erreur API MySQL Prisma GET:", error);
        return NextResponse.json(
            { error: error?.message || "Erreur technique lors de la récupération" },
            { status: 500 }
        );
    }
}

/**
 * PUT : Met à jour un produit existant dans MySQL
 */
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const productId = parseInt(id, 10);

        if (isNaN(productId)) {
            return NextResponse.json({ error: 'ID de produit invalide' }, { status: 400 });
        }

        const body = await req.json();
        const { name, description, price, image } = body;

        if (!name || price === undefined || price === null) {
            return NextResponse.json({ error: 'Le nom et le prix sont obligatoires' }, { status: 400 });
        }

        const parsedPrice = parseFloat(String(price));
        if (isNaN(parsedPrice)) {
            return NextResponse.json({ error: 'Format de prix invalide' }, { status: 400 });
        }

        // Mise à jour typée via Prisma
        const product = await prismaMysql.product.update({
            where: { id: productId },
            data: {
                name: String(name),
                description: description ? String(description) : null,
                price: parsedPrice,
                image: image ? String(image) : null,
            },
        });

        return NextResponse.json(product, { status: 200 });
    } catch (error: any) {
        console.error("Erreur API MySQL Prisma PUT:", error);
        return NextResponse.json(
            { error: error?.message || "Erreur technique lors de la mise à jour" },
            { status: 500 }
        );
    }
}

/**
 * DELETE : Supprime un produit par ID dans MySQL
 */
export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const productId = parseInt(id, 10);

        if (isNaN(productId)) {
            return NextResponse.json({ error: 'ID de produit invalide' }, { status: 400 });
        }

        // Suppression de la ligne correspondante
        await prismaMysql.product.delete({
            where: { id: productId }
        });

        return NextResponse.json({ message: 'Produit supprimé avec succès' }, { status: 200 });
    } catch (error: any) {
        console.error("Erreur API MySQL Prisma DELETE:", error);
        return NextResponse.json(
            { error: error?.message || "Erreur technique lors de la suppression" },
            { status: 500 }
        );
    }
}

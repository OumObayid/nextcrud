/**
 * app/api/pgprisma/products/[id]/route.ts
 * 
 * Route Handler dynamique par ID pour PostgreSQL via Prisma ORM : /api/pgprisma/products/:id.
 * 
 * Opérations unitaires :
 * - GET    : Recherche par clé primaire (`findUnique`).
 * - PUT    : Mise à jour des valeurs (`update`).
 * - DELETE : Suppression de la ligne correspondante (`delete`).
 */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prismapg';

/**
 * GET : Récupère les détails d'un produit spécifique par son ID
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

        const product = await prisma.product.findUnique({
            where: { id: productId }
        });

        if (!product) {
            return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 });
        }

        return NextResponse.json(product, { status: 200 });
    } catch (error: any) {
        console.error("Erreur API PostgreSQL Prisma GET:", error);
        return NextResponse.json(
            { error: "Une erreur est survenue lors de la récupération du produit." },
            { status: 500 }
        );
    }
}

/**
 * PUT : Met à jour un produit existant
 */
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const productId = parseInt(id, 10);

        if (isNaN(productId)) {
            return NextResponse.json({ error: 'ID de produit invalide' }, { status: 400 });
        }

        const body = await request.json();
        const parsedPrice = parseFloat(String(body.price));

        const product = await prisma.product.update({
            where: { id: productId },
            data: {
                name: String(body.name),
                description: body.description ? String(body.description) : null,
                price: isNaN(parsedPrice) ? 0 : parsedPrice,
                image: body.image ? String(body.image) : null,
            },
        });

        return NextResponse.json(product, { status: 200 });
    } catch (error: any) {
        console.error("Erreur API PostgreSQL Prisma PUT:", error);
        return NextResponse.json(
            { error: "Une erreur est survenue lors de la mise à jour." },
            { status: 500 }
        );
    }
}

/**
 * DELETE : Supprime un produit par son ID
 */
export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const productId = parseInt(id, 10);

        if (isNaN(productId)) {
            return NextResponse.json({ error: 'ID de produit invalide' }, { status: 400 });
        }

        await prisma.product.delete({
            where: { id: productId }
        });

        return NextResponse.json({ message: 'Produit supprimé avec succès' }, { status: 200 });
    } catch (error: any) {
        console.error("Erreur API PostgreSQL Prisma DELETE:", error);
        return NextResponse.json(
            { error: "Une erreur est survenue lors de la suppression." },
            { status: 500 }
        );
    }
}

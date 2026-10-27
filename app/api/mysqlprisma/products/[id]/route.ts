import { NextRequest, NextResponse } from 'next/server';
import prismaMysql from '@/lib/db/prismamysql';

/**
 * GET: Récupère les détails d'un produit MySQL spécifique par son ID via Prisma
 */
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const productId = parseInt(id, 10);

        if (isNaN(productId)) {
            return NextResponse.json({ error: 'ID de produit invalide' }, { status: 400 });
        }

        const product = await prismaMysql.product.findUnique({
            where: { id: productId }
        });

        if (!product) {
            return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 });
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
 * PUT: Met à jour un produit existant dans MySQL via Prisma
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
            return NextResponse.json({ error: 'Nom et prix sont obligatoires' }, { status: 400 });
        }

        const parsedPrice = parseFloat(String(price));
        if (isNaN(parsedPrice)) {
            return NextResponse.json({ error: 'Format de prix invalide' }, { status: 400 });
        }

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
 * DELETE: Supprime un produit MySQL par son ID via Prisma
 */
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const productId = parseInt(id, 10);

        if (isNaN(productId)) {
            return NextResponse.json({ error: 'ID de produit invalide' }, { status: 400 });
        }

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

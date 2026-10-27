import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prismapg';

/**
 * GET: Récupère les détails d'un produit spécifique par son ID
 */
export async function GET(req: NextRequest,
    { params }: { params: Promise<{ id: string }> } // Params est une Promise en Next.js 15+
) {
    try {
        const { id } = await params;
        console.log('API GET ID:', id);
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) }
        });

        if (!product) {
            return NextResponse.json({ error: 'Produit non trouvé' }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error: any) {
        console.error("Erreur API Product Detail:", error);
        return NextResponse.json({ error: "Désolé, une erreur technique est survenue. Nos équipes ont été prévenues." }, { status: 500 });
    }
}

/**
 * PUT: Met à jour un produit existant
 */
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const product = await prisma.product.update({
            where: { id: parseInt(id) },
            data: {
                name: body.name,
                description: body.description,
                price: body.price,
                image: body.image,
            },
        });
        return NextResponse.json(product);
    } catch (error: any) {
        console.error("Erreur API Product Detail:", error);
        return NextResponse.json({ error: "Désolé, une erreur technique est survenue. Nos équipes ont été prévenues." }, { status: 500 });
    }
}

/**
 * DELETE: Supprime un produit par son ID
 */
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.product.delete({
            where: { id: parseInt(id) }
        });
        return NextResponse.json({ message: 'Produit supprimé avec succès' });
    } catch (error: any) {
        console.error("Erreur API Product Detail:", error);
        return NextResponse.json({ error: "Désolé, une erreur technique est survenue. Nos équipes ont été prévenues." }, { status: 500 });
    }
}

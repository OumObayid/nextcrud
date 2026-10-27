import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prismapg';

/**
 * GET: Récupère la liste de tous les produits
 * Triés par ID décroissant (plus récents en premier)
 */
export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { id: 'desc' }
        });
        return NextResponse.json(products);
    } catch (error: any) {
        console.error("Erreur API Products:", error);
        return NextResponse.json({ error: "Une erreur est survenue lors de l'opération. Veuillez réessayer plus tard." }, { status: 500 });
    }
}

/**
 * POST: Crée un nouveau produit dans la base de données
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const product = await prisma.product.create({
            data: {
                name: body.name,
                description: body.description,
                price: body.price,
                image: body.image,
            },
        });
        return NextResponse.json(product, { status: 201 });
    } catch (error: any) {
        console.error("Erreur API Products:", error);
        return NextResponse.json({ error: "Une erreur est survenue lors de l'opération. Veuillez réessayer plus tard." }, { status: 500 });
    }
}

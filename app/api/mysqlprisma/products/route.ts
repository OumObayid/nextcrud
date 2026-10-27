import { NextRequest, NextResponse } from 'next/server';
import prismaMysql from '@/lib/db/prismamysql';

/**
 * GET: Récupère la liste de tous les produits MySQL via Prisma
 * Triés par ID décroissant (plus récents en premier)
 */
export async function GET() {
    try {
        const products = await prismaMysql.product.findMany({
            orderBy: { id: 'desc' }
        });
        return NextResponse.json(products);
    } catch (error: any) {
        console.error("Erreur API MySQL Prisma Products:", error);
        return NextResponse.json({ error: "Une erreur est survenue lors de l'opération. Veuillez réessayer plus tard." }, { status: 500 });
    }
}

/**
 * POST: Crée un nouveau produit dans MySQL via Prisma
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, description, price, image } = body;

        if (!name || price === undefined || price === null) {
            return NextResponse.json({ error: 'Le nom et le prix sont obligatoires' }, { status: 400 });
        }

        const parsedPrice = parseFloat(String(price));
        if (isNaN(parsedPrice)) {
            return NextResponse.json({ error: 'Le prix doit être un nombre valide' }, { status: 400 });
        }

        const product = await prismaMysql.product.create({
            data: {
                name: String(name),
                description: description ? String(description) : null,
                price: parsedPrice,
                image: image ? String(image) : null,
            },
        });
        return NextResponse.json(product, { status: 201 });
    } catch (error: any) {
        console.error("Erreur API MySQL Prisma Products:", error);
        return NextResponse.json({ error: error?.message || "Une erreur est survenue lors de l'opération." }, { status: 500 });
    }
}

/**
 * app/api/pgprisma/products/route.ts
 * 
 * Route API pour les Produits - Architecture PostgreSQL + Prisma ORM.
 * 
 * Endpoints :
 * - GET  /api/pgprisma/products : Liste tous les produits de PostgreSQL via le modèle Prisma.
 * - POST /api/pgprisma/products : Insère un nouveau produit avec validation des types.
 */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prismapg';

/**
 * GET : Récupération ordonnée de tous les produits PostgreSQL
 */
export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { id: 'desc' }
        });
        return NextResponse.json(products, { status: 200 });
    } catch (error: any) {
        console.error("Erreur API PostgreSQL Prisma (GET):", error);
        return NextResponse.json(
            { error: "Une erreur est survenue lors de la récupération des produits." },
            { status: 500 }
        );
    }
}

/**
 * POST : Création d'un nouveau produit via `prisma.product.create()`
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, description, price, image } = body;

        // Validation des champs
        if (!name || price === undefined || price === null) {
            return NextResponse.json(
                { error: 'Le nom et le prix sont obligatoires' },
                { status: 400 }
            );
        }

        const parsedPrice = parseFloat(String(price));
        if (isNaN(parsedPrice)) {
            return NextResponse.json(
                { error: 'Le prix doit être un nombre valide' },
                { status: 400 }
            );
        }

        const product = await prisma.product.create({
            data: {
                name: String(name),
                description: description ? String(description) : null,
                price: parsedPrice,
                image: image ? String(image) : null,
            },
        });

        return NextResponse.json(product, { status: 201 });
    } catch (error: any) {
        console.error("Erreur API PostgreSQL Prisma (POST):", error);
        return NextResponse.json(
            { error: "Une erreur est survenue lors de la création du produit." },
            { status: 500 }
        );
    }
}

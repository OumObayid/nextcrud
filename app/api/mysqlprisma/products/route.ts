/**
 * app/api/mysqlprisma/products/route.ts
 * 
 * Route API pour les Produits - Architecture MySQL + Prisma ORM.
 * 
 * Avantages de l'ORM :
 * - Typage strict TypeScript généré automatiquement à partir de `prisma/schema.mysql.prisma`.
 * - Écriture déclarative des requêtes (`findMany`, `create`) sans manipuler de SQL brut.
 * - Protection automatique contre les injections SQL et conversion transparente des types.
 */

import { NextRequest, NextResponse } from 'next/server';
import prismaMysql from '@/lib/db/prismamysql';

/**
 * GET /api/mysqlprisma/products
 * Récupère tous les produits stockés dans MySQL via le client Prisma, triés par ID décroissant.
 */
export async function GET() {
    try {
        const products = await prismaMysql.product.findMany({
            orderBy: { id: 'desc' }
        });
        return NextResponse.json(products, { status: 200 });
    } catch (error: any) {
        console.error("Erreur API MySQL Prisma (GET):", error);
        return NextResponse.json(
            { error: "Une erreur est survenue lors de la récupération des produits." },
            { status: 500 }
        );
    }
}

/**
 * POST /api/mysqlprisma/products
 * Crée un nouveau produit dans MySQL via la méthode `prisma.product.create()`.
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, description, price, image } = body;

        // Validation des données requises
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

        // Création typée dans la table 'products'
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
        console.error("Erreur API MySQL Prisma (POST):", error);
        return NextResponse.json(
            { error: error?.message || "Une erreur est survenue lors de la création du produit." },
            { status: 500 }
        );
    }
}

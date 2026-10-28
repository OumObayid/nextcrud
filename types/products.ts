/**
 * types/products.ts
 * 
 * Définition du modèle de données principal pour les Produits.
 * 
 * Cette structure TypeScript sert de contrat universel partagé à travers
 * toute l'application (pages frontend, formulaires, et routes API backend).
 * Elle assure l'interopérabilité entre les 4 architectures du banc d'essai :
 * - MySQL Natif
 * - PostgreSQL Natif
 * - MySQL + Prisma ORM
 * - PostgreSQL + Prisma ORM
 */

export type Product = {
    /** Identifiant unique du produit (auto-incrémenté en base de données) */
    id: number;
    /** Nom ou intitulé commercial du produit */
    name: string;
    /** Description détaillée des fonctionnalités ou caractéristiques */
    description: string;
    /** Prix unitaire en euros (€) */
    price: number;
    /** URL publique vers l'image illustrative du produit */
    image: string;
};
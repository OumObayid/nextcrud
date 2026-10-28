'use client';

/**
 * ==============================================================================
 * Page Détail & Suppression de Produit - Moteur MySQL + Prisma ORM (Client Component)
 * ==============================================================================
 * 
 * Cette page présente la fiche technique détaillée d'un produit spécifique
 * issu de MySQL via Prisma ORM et permet de le modifier ou de le supprimer.
 * 
 * Fonctionnalités :
 * - Lecture de l'identifiant avec `useParams()`.
 * - Chargement des détails via `GET /api/mysqlprisma/products/${id}`.
 * - Dialogue modal de confirmation de suppression (`ConfirmDeleteModal`).
 * - Exécution de la suppression définitive via `DELETE /api/mysqlprisma/products/${id}`.
 */

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';

export default function ViewProductPage() {
    const router = useRouter();
    const routeParams = useParams();
    const id = (routeParams?.id as string) || '';

    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    /**
     * Récupération des données du produit
     */
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/mysqlprisma/products/${id}`);
                if (!res.ok) {
                    const data = await res.json();
                    throw new Error(data.error || "Impossible de charger les détails du produit.");
                }
                const data = await res.json();
                setProduct(data);
            } catch (err: any) {
                console.error("Erreur chargement produit:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    /**
     * Confirmation et exécution de la suppression
     */
    const handleDeleteConfirm = async () => {
        setDeleting(true);
        try {
            const res = await fetch(`/api/mysqlprisma/products/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setIsDeleteModalOpen(false);
                router.push('/mysqlprisma/products');
            } else {
                const data = await res.json();
                alert(data.error || "Une erreur est survenue lors de la suppression.");
            }
        } catch (err: any) {
            console.error("Erreur suppression produit:", err);
            alert("Erreur de connexion : impossible de joindre le serveur.");
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="glass-card p-12 text-center rounded-3xl max-w-md w-full border-red-500/20">
                    <h2 className="text-2xl font-bold mb-4 text-red-500">Erreur</h2>
                    <p className="text-foreground/60 mb-6">{error || "Produit introuvable"}</p>
                    <button
                        onClick={() => router.back()}
                        className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-xl transition-all"
                    >
                        Retour
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative flex items-center justify-center p-6">
            <div className="bg-mesh" />

            <div className="w-full max-w-4xl glass-card rounded-3xl overflow-hidden relative border border-white/10 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Colonne Image */}
                    <div className="relative h-72 md:h-full min-h-[350px] overflow-hidden bg-black/20">
                        <img
                            src={product.image || '/placeholder.png'}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-zinc-950/70 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold border border-white/10 text-primary">
                            MySQL + Prisma
                        </div>
                    </div>

                    {/* Colonne Détails */}
                    <div className="p-8 md:p-12 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between gap-4 mb-4">
                                <span className="text-xs uppercase tracking-widest text-foreground/40 font-bold">
                                    ID #{product.id}
                                </span>
                                <span className="text-2xl font-black bg-gradient-to-r from-primary to-amber-300 bg-clip-text text-transparent">
                                    {Number(product.price).toFixed(2)} €
                                </span>
                            </div>

                            <h1 className="text-3xl font-extrabold mb-4 text-white">
                                {product.name}
                            </h1>

                            <div className="h-px w-full bg-white/5 my-6" />

                            <div className="space-y-2">
                                <h3 className="text-xs uppercase tracking-wider text-foreground/40 font-bold">Description</h3>
                                <p className="text-foreground/70 leading-relaxed text-sm whitespace-pre-line">
                                    {product.description}
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-8 mt-8 border-t border-white/5 flex flex-wrap items-center gap-3">
                            {/* Retour */}
                            <button
                                onClick={() => router.back()}
                                className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-semibold transition-all hover:scale-105"
                            >
                                Retour
                            </button>

                            {/* Modifier */}
                            <Link
                                href={`/mysqlprisma/products/edit/${product.id}`}
                                className="px-6 py-3 rounded-xl bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary text-sm font-semibold transition-all hover:scale-105"
                            >
                                Modifier
                            </Link>

                            {/* Supprimer */}
                            <button
                                type="button"
                                onClick={() => setIsDeleteModalOpen(true)}
                                disabled={deleting}
                                className="px-6 py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 text-sm font-semibold transition-all hover:scale-105 ml-auto disabled:opacity-50 cursor-pointer"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de confirmation de suppression */}
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                itemName={product?.name}
                loading={deleting}
            />
        </div>
    );
}

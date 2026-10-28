'use client';

/**
 * ==============================================================================
 * Page Détail & Suppression de Produit - Moteur PostgreSQL + Prisma ORM (Client Component)
 * ==============================================================================
 * 
 * Cette page présente la fiche technique détaillée d'un produit spécifique
 * issu de PostgreSQL via Prisma ORM et permet de le modifier ou de le supprimer.
 * 
 * Fonctionnalités :
 * - Déballage asynchrone des paramètres d'URL avec `use(params)`.
 * - Chargement des détails via `GET /api/pgprisma/products/${id}`.
 * - Dialogue modal de confirmation de suppression (`ConfirmDeleteModal`).
 * - Exécution de la suppression définitive via `DELETE /api/pgprisma/products/${id}`.
 */

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';

export default function ViewProductPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    // Résolution asynchrone de l'ID depuis les paramètres dynamiques
    const { id } = use(params);

    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    /**
     * Récupération des informations du produit
     */
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/pgprisma/products/${id}`);
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
            const res = await fetch(`/api/pgprisma/products/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setIsDeleteModalOpen(false);
                router.push('/pgprisma/products');
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
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center justify-center">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 blur-lg bg-purple-500/20 rounded-full"></div>
                </div>
                <p className="mt-4 text-sm text-zinc-400 font-medium">Chargement des détails du produit...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-16 text-center">
                <div className="glass-card p-10 rounded-3xl border border-white/10 relative overflow-hidden">
                    <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl flex items-center justify-center mx-auto mb-5">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Produit introuvable</h2>
                    <p className="text-zinc-400 text-sm mb-6">{error || 'Le produit demandé n’existe pas ou a été supprimé.'}</p>
                    <Link
                        href="/pgprisma/products"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-sm transition-all"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Retour aux produits
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            {/* Barre de navigation supérieure */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <Link
                    href="/pgprisma/products"
                    className="group inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
                >
                    <span className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                        <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </span>
                    <span className="font-medium">Retour aux produits</span>
                </Link>
            </div>

            {/* Fiche Produit Principale */}
            <div className="glass-card rounded-3xl border border-white/10 overflow-hidden shadow-2xl hover:transform-none hover:scale-100">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                    {/* Colonne gauche : Image */}
                    <div className="md:col-span-5 relative min-h-[260px] border-b md:border-b-0 md:border-r border-white/10 overflow-hidden group">
                        <img
                            src={product.image || '/placeholder.png'}
                            alt={product.name}
                            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>

                    {/* Colonne droite : Détails */}
                    <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-center gap-4">
                        {/* En-tête : Titre & Prix */}
                        <div className="flex items-center justify-between gap-4 flex-wrap">
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                                {product.name}
                            </h1>
                            <div className="inline-flex items-baseline gap-1.5 px-4 py-2 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
                                <span className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                                    {Number(product.price).toFixed(2)}
                                </span>
                                <span className="text-lg font-bold text-purple-400">€</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-zinc-300 text-sm leading-relaxed">
                            {product.description || "Aucune description renseignée pour cet article."}
                        </div>

                        {/* Actions */}
                        <div className="pt-2 flex flex-wrap sm:flex-nowrap gap-3">
                            <Link
                                href={`/pgprisma/products/edit/${id}`}
                                className="group relative flex-1 overflow-hidden rounded-xl p-[1px] transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] shadow-[0_10px_25px_-5px_rgba(181,161,9,0.35)] hover:shadow-[0_15px_35px_-5px_rgba(181,161,9,0.55)]"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-primary via-amber-300 to-accent opacity-90 group-hover:opacity-100 transition-opacity" />
                                <span className="relative flex items-center justify-center gap-2 px-5 py-3 rounded-[11px] bg-gradient-to-r from-[#d4af37] via-[#c99e28] to-[#b58c1f] text-zinc-950 font-bold text-sm tracking-wide transition-all group-hover:brightness-105">
                                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out pointer-events-none" />
                                    <svg className="w-4 h-4 text-zinc-950 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    <span>Modifier</span>
                                </span>
                            </Link>

                            <button
                                type="button"
                                onClick={() => setIsDeleteModalOpen(true)}
                                disabled={deleting}
                                className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/25 hover:border-red-500/40 font-semibold text-sm transition-all duration-300 shadow-[0_4px_20px_-5px_rgba(239,68,68,0.2)] hover:shadow-[0_6px_25px_-5px_rgba(239,68,68,0.4)] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                            >
                                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-red-400/15 to-transparent transition-transform duration-1000 ease-out pointer-events-none" />
                                <svg className="w-4 h-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                <span>Supprimer</span>
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

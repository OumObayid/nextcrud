'use client';

/**
 * ==============================================================================
 * Page de Création de Produit - Moteur PostgreSQL + Prisma ORM (Client Component)
 * ==============================================================================
 * 
 * Cette page propose un formulaire interactif permettant à l'utilisateur de
 * créer et insérer un nouvel article via l'ORM Prisma sur la base PostgreSQL.
 * 
 * Fonctionnalités :
 * - Gestion contrôlée des états pour chaque champ (name, description, price, image).
 * - Aperçu dynamique en direct de l'image dès qu'une URL valide est saisie.
 * - Envoi asynchrone des données via HTTP POST à `/api/pgprisma/products`.
 * - Gestion des retours utilisateur (succès avec redirection temporisée, alertes d'erreurs).
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateProductPage() {
    const router = useRouter();

    // Gestion des états
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [image, setImage] = useState<string>('');
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' | null }>({ text: '', type: null });
    const [loading, setLoading] = useState(false);

    /**
     * Traitement de la soumission du formulaire d'ajout
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: '', type: null });

        try {
            const res = await fetch('/api/pgprisma/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    description,
                    price,
                    image
                })
            });

            const data = await res.json();

            if (res.ok) {
                setMessage({ text: 'Produit ajouté avec succès ! Redirection...', type: 'success' });
                // Réinitialisation du formulaire
                setName('');
                setDescription('');
                setPrice(0);
                setImage('');

                // Redirection après un court délai
                setTimeout(() => {
                    router.push('/pgprisma/products');
                }, 2000);
            } else {
                setMessage({ text: `Erreur : ${data.error || 'Une erreur est survenue'}`, type: 'error' });
            }
        } catch (error: any) {
            console.error("Erreur formulaire création:", error);
            setMessage({ text: "Une erreur de connexion est survenue. Veuillez vérifier votre réseau.", type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8">
            {/* Arrière-plan stylisé en dégradé maillé */}
            <div className="bg-mesh" />

            <div className="w-full max-w-2xl glass-card p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl relative overflow-hidden">
                {/* Lueur d'ambiance d'arrière-plan */}
                <div className="absolute -top-24 -right-24 w-48 height-48 bg-primary/20 blur-3xl rounded-full" />
                <div className="absolute -bottom-24 -left-24 w-48 height-48 bg-accent/20 blur-3xl rounded-full" />

                <div className="relative z-10">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                        Ajouter un Produit
                    </h1>
                    <p className="text-foreground/60 mb-8">Remplissez les informations ci-dessous pour créer un nouveau produit dans la base de données PostgreSQL (via Prisma).</p>

                    {/* Notification d'état (Succès / Erreur) */}
                    {message.text && (
                        <div className={`mb-6 p-4 rounded-xl border ${message.type === 'success'
                            ? 'bg-green-500/10 border-green-500/50 text-green-400'
                            : 'bg-red-500/10 border-red-500/50 text-red-400'
                            } flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300`}>
                            {message.type === 'success' ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            )}
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Champ Nom du produit */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground/80 ml-1">Nom du produit</label>
                                <input
                                    type="text"
                                    placeholder="ex: MacBook Pro M3"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                                    required
                                />
                            </div>

                            {/* Champ Prix */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground/80 ml-1">Prix (€)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    value={price || ''}
                                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Champ Description */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground/80 ml-1">Description</label>
                            <textarea
                                placeholder="Décrivez votre produit en quelques mots..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all min-h-[120px] resize-none"
                                required
                            />
                        </div>

                        {/* Champ URL de l'image */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground/80 ml-1">URL de l'image (Unsplash, etc.)</label>
                            <input
                                type="text"
                                placeholder="https://images.unsplash.com/..."
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                                required
                            />
                        </div>

                        {/* Prévisualisation dynamique */}
                        {image && image.startsWith('http') && (
                            <div className="mt-4 p-2 border border-white/10 rounded-2xl bg-white/5 overflow-hidden">
                                <img
                                    src={image}
                                    alt="Preview"
                                    className="w-full h-40 object-cover rounded-xl"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                            </div>
                        )}

                        <div className="pt-6 flex flex-row items-stretch gap-3 sm:gap-4">
                            {/* Bouton Annuler */}
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="group flex-1 h-[50px] sm:h-[52px] inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-zinc-400 hover:text-white transition-all duration-300 font-medium text-xs sm:text-sm active:scale-[0.98]"
                            >
                                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-400 group-hover:text-white group-hover:-translate-x-1 transition-all duration-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span className="whitespace-nowrap">Annuler</span>
                            </button>

                            {/* Bouton Ajouter */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative flex-1 sm:flex-[1.5] h-[50px] sm:h-[52px] overflow-hidden rounded-2xl p-[1px] transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_10px_30px_-5px_rgba(181,161,9,0.35)] hover:shadow-[0_15px_40px_-5px_rgba(181,161,9,0.55)] flex items-stretch"
                            >
                                {/* Bordure lumineuse dégradée */}
                                <span className="absolute inset-0 bg-gradient-to-r from-primary via-amber-300 to-accent opacity-90 group-hover:opacity-100 transition-opacity" />

                                {/* Contenu intérieur en or radiant */}
                                <span className="relative w-full h-full flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 rounded-[15px] bg-gradient-to-r from-[#d4af37] via-[#c99e28] to-[#b58c1f] text-zinc-950 font-bold text-xs sm:text-sm tracking-normal sm:tracking-wide transition-all group-hover:brightness-105 whitespace-nowrap">
                                    {/* Rayon de brillance spéculaire */}
                                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out pointer-events-none" />

                                    {loading ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-zinc-950 shrink-0" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" stroke="currentColor" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            <span className="whitespace-nowrap">Ajout...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-zinc-950/15 border border-zinc-950/20 group-hover:rotate-90 group-hover:scale-110 transition-all duration-300 shrink-0">
                                                <svg className="w-3.5 h-3.5 text-zinc-950 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                                </svg>
                                            </span>
                                            <span className="whitespace-nowrap">Ajouter</span>
                                        </>
                                    )}
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

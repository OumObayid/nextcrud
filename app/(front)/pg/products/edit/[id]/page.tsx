'use client';

/**
 * ==============================================================================
 * Page de Modification de Produit - Moteur PostgreSQL Natif (Client Component)
 * ==============================================================================
 * 
 * Cette page permet à l'utilisateur de charger et mettre à jour les données
 * d'un produit existant dans PostgreSQL.
 * 
 * Spécificités Next.js 15+ / React 19 :
 * - `params` est une `Promise` résolue via le hook `use(params)`.
 * - Chargement des données au montage du composant via un appel `GET /api/pg/products/${id}`.
 * - Mise à jour asynchrone lors de la soumission via une requête `PUT /api/pg/products/${id}`.
 */

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    // Résolution asynchrone de l'identifiant présent dans l'URL
    const { id } = use(params);

    // États locaux du formulaire de modification
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [image, setImage] = useState<string>('');
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' | null }>({ text: '', type: null });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    /**
     * Chargement initial des caractéristiques du produit à modifier
     */
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/pg/products/${id}`);
                const data = await res.json();

                if (res.ok) {
                    setName(data.name);
                    setDescription(data.description);
                    setPrice(data.price);
                    setImage(data.image);
                } else {
                    setMessage({ text: `Erreur : ${data.error || data.message}`, type: 'error' });
                }
            } catch (error: any) {
                setMessage({ text: `Erreur de chargement : ${error.message}`, type: 'error' });
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    /**
     * Traitement de la mise à jour (requête HTTP PUT)
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ text: '', type: null });

        try {
            const res = await fetch(`/api/pg/products/${id}`, {
                method: 'PUT',
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
                setMessage({ text: 'Produit mis à jour avec succès !', type: 'success' });
                // Redirection vers le catalogue après confirmation
                setTimeout(() => {
                    router.push('/pg/products');
                }, 1500);
            } else {
                setMessage({ text: `Erreur : ${data.message}`, type: 'error' });
            }
        } catch (error: any) {
            setMessage({ text: `Erreur serveur : ${error.message}`, type: 'error' });
        } finally {
            setSaving(false);
        }
    };

    // Affichage d'un indicateur de chargement tant que les données ne sont pas prêtes
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

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
                        Modifier le Produit
                    </h1>
                    <p className="text-foreground/60 mb-8">Mettez à jour les informations du produit #{id}.</p>

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
                                    value={price}
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
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all min-h-[120px] resize-none"
                                required
                            />
                        </div>

                        {/* Champ URL de l'image */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground/80 ml-1">URL de l'image</label>
                            <input
                                type="text"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                                required
                            />
                        </div>

                        {/* Prévisualisation dynamique */}
                        {image && (
                            <div className="mt-4 p-2 border border-white/10 rounded-2xl bg-white/5 overflow-hidden">
                                <img
                                    src={image}
                                    alt="Preview"
                                    className="w-full h-48 object-cover rounded-xl"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                            </div>
                        )}

                        {/* Boutons d'action alignés avec hauteurs identiques */}
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

                            {/* Bouton Enregistrer */}
                            <button
                                type="submit"
                                disabled={saving}
                                className="group relative flex-1 sm:flex-[1.5] h-[50px] sm:h-[52px] overflow-hidden rounded-2xl p-[1px] transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_10px_30px_-5px_rgba(181,161,9,0.35)] hover:shadow-[0_15px_40px_-5px_rgba(181,161,9,0.55)] flex items-stretch"
                            >
                                {/* Bordure lumineuse dégradée */}
                                <span className="absolute inset-0 bg-gradient-to-r from-primary via-amber-300 to-accent opacity-90 group-hover:opacity-100 transition-opacity" />

                                {/* Contenu intérieur en or radiant */}
                                <span className="relative w-full h-full flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 rounded-[15px] bg-gradient-to-r from-[#d4af37] via-[#c99e28] to-[#b58c1f] text-zinc-950 font-bold text-xs sm:text-sm tracking-normal sm:tracking-wide transition-all group-hover:brightness-105 whitespace-nowrap">
                                    {/* Rayon de brillance spéculaire */}
                                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out pointer-events-none" />

                                    {saving ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-zinc-950 shrink-0" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" stroke="currentColor" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            <span className="whitespace-nowrap">Enregistrement...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-zinc-950/15 border border-zinc-950/20 group-hover:scale-110 transition-all duration-300 shrink-0">
                                                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-zinc-950 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </span>
                                            <span className="whitespace-nowrap">Enregistrer</span>
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

import { Product } from '@/types/products';
import Link from 'next/link';

// Forcer le rechargement de la page
export const dynamic = 'force-dynamic';

// Page des produits
export default async function ProductsPage() {
    // Récupérer les produits depuis l'API
    let products: Product[] = [];
    let error: string | null = null;

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/mysql/products`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                cache: "no-store"
            }
        );

        if (!res.ok) {
            throw new Error('Erreur lors du chargement des produits');
        }
        const result = await res.json();
        products = Array.isArray(result) ? result : [];
    } catch (err: any) {
        error = err.message;
    }

    return (
        <div className="min-h-screen relative p-4 sm:p-6 lg:p-8">
            {/* Background Background */}
            <div className="bg-mesh" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 lg:mb-12">
                    <div className="relative z-20">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
                            Nos Produits
                        </h1>
                        <p className="text-foreground/60 text-lg">
                            Gérez votre catalogue <span className="inline-block font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">MySQL</span> avec une interface moderne et fluide.
                        </p>
                    </div>
                    <Link
                        href="/mysql/products/create"
                        className="relative z-20 group inline-flex items-center p-[2px] rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-[0_0_25px_rgba(245,183,39,0.25)] hover:shadow-[0_0_45px_rgba(245,183,39,0.55)]"
                    >
                        {/* Faisceau laser rotatif infini (Magic Border Beam) */}
                        <span className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_0_300deg,#f5b727_340deg,#fff_360deg)] animate-spin-border group-hover:[animation-duration:1.5s]" />

                        {/* Coeur en verre sombre haute technologie */}
                        <span className="relative flex items-center gap-3.5 px-6 py-3.5 rounded-[14px] bg-zinc-950/90 group-hover:bg-zinc-900/90 backdrop-blur-2xl transition-all duration-300">
                            {/* Balise radar pulsante */}
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
                            </span>

                            {/* Badge icône stylisé */}
                            <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-primary/15 border border-primary/30 text-primary group-hover:bg-primary group-hover:text-zinc-950 group-hover:rotate-90 group-hover:scale-110 transition-all duration-300 shadow-sm">
                                <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                            </span>

                            {/* Texte */}
                            <span className="font-semibold text-sm tracking-wide bg-gradient-to-r from-zinc-100 to-zinc-300 group-hover:from-white group-hover:to-amber-200 bg-clip-text text-transparent transition-all">
                                Nouveau Produit
                            </span>
                        </span>
                    </Link>
                </div>

                {error ? (
                    <div className="glass-card p-12 text-center rounded-3xl border-red-500/20">
                        <div className="text-red-500 mb-4 flex justify-center">
                            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Erreur de chargement</h2>
                        <p className="text-foreground/60">{error}</p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="glass-card p-20 text-center rounded-3xl flex flex-col items-center">
                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-10 h-10 text-foreground/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-3.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                        </div>
                        <h2 className="text-2xl font-bold text-foreground/40">Aucun produit trouvé</h2>
                        <p className="text-foreground/30 mt-2 mb-8">Commencez par ajouter votre premier produit au catalogue.</p>
                        <Link href="/mysql/products/create" className="text-primary hover:underline font-medium">Ajouter maintenant</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="group glass-card rounded-3xl overflow-hidden hover:border-primary/30 transition-all duration-500 flex flex-col h-full"
                            >
                                {/* Product Image */}
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold border border-white/10">
                                        {product.price} €
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-foreground/50 text-sm line-clamp-2 mb-6 flex-grow">
                                        {product.description}
                                    </p>

                                    {/* Actions */}
                                    <div className="grid grid-cols-2 gap-3 mt-auto">
                                        <Link
                                            href={`/mysql/products/view/${product.id}`}
                                            className="bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl text-center text-sm font-bold transition-all"
                                        >
                                            Voir
                                        </Link>
                                        <Link
                                            href={`/mysql/products/edit/${product.id}`}
                                            className="bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary py-3 rounded-xl text-center text-sm font-bold transition-all"
                                        >
                                            Modifier
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

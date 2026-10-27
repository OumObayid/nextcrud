'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LogosShowcasePage() {
    const [selectedConcept, setSelectedConcept] = useState<number | null>(null);

    const concepts = [
        {
            id: 1,
            name: "Concept 1 : Le Prisme Géométrique",
            tag: "High-Tech & R&D",
            tagColor: "border-amber-500/30 text-amber-400 bg-amber-500/10",
            description: "Un prisme isométrique 3D doré à facettes multiples (symbolisant les 4 moteurs de bases de données), couplé à une typographie audacieuse et futuriste.",
            render: (
                <div className="flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-amber-400/40 transition-all duration-300 shadow-[0_0_30px_rgba(245,183,39,0.15)] group-hover:shadow-[0_0_40px_rgba(245,183,39,0.3)]">
                    {/* Prisme 3D Géométrique SVG */}
                    <svg className="w-10 h-10 shrink-0 filter drop-shadow-[0_0_12px_rgba(245,183,39,0.6)]" viewBox="0 0 100 100" fill="none">
                        <polygon points="50,10 90,32 50,55 10,32" fill="url(#prismTop)" />
                        <polygon points="10,32 50,55 50,95 10,72" fill="url(#prismLeft)" />
                        <polygon points="50,55 90,32 90,72 50,95" fill="url(#prismRight)" />
                        <polygon points="50,10 50,55 90,72" fill="url(#prismFacet)" opacity="0.4" />
                        <defs>
                            <linearGradient id="prismTop" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#fff2a8" />
                                <stop offset="100%" stopColor="#f5b727" />
                            </linearGradient>
                            <linearGradient id="prismLeft" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#d49200" />
                                <stop offset="100%" stopColor="#8a5a00" />
                            </linearGradient>
                            <linearGradient id="prismRight" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#f5b727" />
                                <stop offset="100%" stopColor="#b57700" />
                            </linearGradient>
                            <linearGradient id="prismFacet" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#ffffff" />
                                <stop offset="100%" stopColor="#f5b727" />
                            </linearGradient>
                        </defs>
                    </svg>
                    {/* Logotype */}
                    <div className="flex flex-col">
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black tracking-tight text-white">CRUD</span>
                            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-amber-300 via-primary to-amber-500 bg-clip-text text-transparent">LAB</span>
                        </div>
                        <span className="text-[9px] tracking-[0.25em] font-semibold text-zinc-400 uppercase -mt-0.5">
                            Multi-Database Studio
                        </span>
                    </div>
                </div>
            )
        },
        {
            id: 2,
            name: "Concept 2 : La Boucle Infinie SQL",
            tag: "Continuité & Fluidité",
            tagColor: "border-indigo-500/30 text-indigo-400 bg-indigo-500/10",
            description: "Deux cylindres de données SQL superposés fusionnant en boucle Möbius infinie, représentant le flux ininterrompu entre les différents moteurs.",
            render: (
                <div className="flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-amber-400/40 transition-all duration-300 shadow-[0_0_30px_rgba(245,183,39,0.15)] group-hover:shadow-[0_0_40px_rgba(245,183,39,0.3)]">
                    {/* Double Cylindre Infini SVG */}
                    <svg className="w-12 h-10 shrink-0 filter drop-shadow-[0_0_12px_rgba(245,183,39,0.5)]" viewBox="0 0 120 70" fill="none">
                        <path
                            d="M35 15 C15 15, 10 35, 35 55 C55 35, 65 35, 85 15 C105 15, 110 35, 85 55 C65 35, 55 35, 35 15 Z"
                            stroke="url(#infinityGrad)"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <ellipse cx="35" cy="35" rx="12" ry="8" stroke="url(#infinityInner)" strokeWidth="3" />
                        <ellipse cx="85" cy="35" rx="12" ry="8" stroke="url(#infinityInner)" strokeWidth="3" />
                        <defs>
                            <linearGradient id="infinityGrad" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#f5b727" />
                                <stop offset="50%" stopColor="#ffffff" />
                                <stop offset="100%" stopColor="#d4af37" />
                            </linearGradient>
                            <linearGradient id="infinityInner" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#ffe58f" />
                                <stop offset="100%" stopColor="#8a5a00" />
                            </linearGradient>
                        </defs>
                    </svg>
                    {/* Logotype */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-light tracking-wide text-zinc-300">NEXT</span>
                            <span className="text-2xl font-black tracking-tight text-amber-400">CRUD</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full border border-amber-400/40 text-amber-300 font-bold bg-amber-500/10">v1.0</span>
                        </div>
                        <span className="text-[9px] tracking-[0.25em] font-semibold text-zinc-400 uppercase -mt-0.5">
                            High-Performance Stack
                        </span>
                    </div>
                </div>
            )
        },
        {
            id: 3,
            name: "Concept 3 : Le Monogramme Suisse « CL »",
            tag: "Minimalisme & Prestige",
            tagColor: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
            description: "Un badge carré en verre dépoli aux reflets métalliques portant le monogramme CL, associé à une typographie suisse épurée avec point doré signature.",
            render: (
                <div className="flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-amber-400/40 transition-all duration-300 shadow-[0_0_30px_rgba(245,183,39,0.15)] group-hover:shadow-[0_0_40px_rgba(245,183,39,0.3)]">
                    {/* Écusson verre dépoli Monogramme CL */}
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/20 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(245,183,39,0.25)]">
                        <span className="text-base font-black tracking-tighter bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                            CL
                        </span>
                    </div>
                    {/* Logotype */}
                    <div className="flex items-baseline">
                        <span className="text-2xl font-black tracking-tight text-white">CRUDLAB</span>
                        <span className="text-2xl font-black text-amber-400 animate-pulse">.</span>
                    </div>
                </div>
            )
        },
        {
            id: 4,
            name: "Concept 4 : L'Onde Sculpturale Dorée",
            tag: "Haute Esthétique Plastique",
            tagColor: "border-purple-500/30 text-purple-400 bg-purple-500/10",
            description: "Une onde organique fluide dorée en suspension rappelant la sculpture d'art plastique du Hero, mariée à une typographie éditoriale d'exception.",
            render: (
                <div className="flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-amber-400/40 transition-all duration-300 shadow-[0_0_30px_rgba(245,183,39,0.15)] group-hover:shadow-[0_0_40px_rgba(245,183,39,0.3)]">
                    {/* Onde fluide sculpturale SVG */}
                    <svg className="w-10 h-10 shrink-0 filter drop-shadow-[0_0_12px_rgba(245,183,39,0.5)]" viewBox="0 0 100 100" fill="none">
                        <path
                            d="M50 15 C75 15, 88 35, 82 58 C76 80, 58 88, 42 82 C22 76, 12 55, 20 38 C28 18, 38 15, 50 15 Z"
                            fill="none"
                            stroke="url(#sculptureGold)"
                            strokeWidth="10"
                            strokeLinecap="round"
                        />
                        <circle cx="50" cy="50" r="10" fill="url(#coreGlow)" opacity="0.6" />
                        <defs>
                            <linearGradient id="sculptureGold" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#fff4b8" />
                                <stop offset="40%" stopColor="#f5b727" />
                                <stop offset="80%" stopColor="#b57700" />
                                <stop offset="100%" stopColor="#ffd86b" />
                            </linearGradient>
                            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="#ffffff" />
                                <stop offset="100%" stopColor="#f5b727" />
                            </radialGradient>
                        </defs>
                    </svg>
                    {/* Logotype */}
                    <div className="flex items-baseline gap-2">
                        <span className="text-xl font-light tracking-widest text-amber-200 uppercase">L'ART DU</span>
                        <span className="text-2xl font-black tracking-tight text-white">CRUD</span>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="min-h-screen py-12 px-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-primary/10 border border-primary/20 text-primary mb-4">
                    Brand Identity Showcase
                </span>
                <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
                    Les 4 Concepts de <span className="bg-gradient-to-r from-primary via-amber-300 to-accent bg-clip-text text-transparent">Logos Horizontaux</span>
                </h1>
                <p className="text-zinc-400 text-base leading-relaxed">
                    Comparez visuellement chaque concept en grand format, découvrez leur rendu graphique et testez leur intégration en situation réelle.
                </p>
            </div>

            {/* Planche Haute Définition Générée */}
            <div className="mb-20">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <span>📸</span> Planche de Présentation Visuelle Complète
                    </h2>
                    <span className="text-xs text-zinc-500 font-medium">Générée en 16:9 • Rendu Obscur & Or</span>
                </div>
                <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] group">
                    <img
                        src="/logos-showcase.jpg"
                        alt="Planche de présentation des 4 logos horizontaux"
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.01]"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none rounded-3xl" />
                </div>
            </div>

            {/* Grille Interactive des 4 Concepts Vectoriels */}
            <div className="mb-20">
                <h2 className="text-2xl font-bold text-white mb-2 text-center">
                    Rendus Vectoriels Interactifs
                </h2>
                <p className="text-zinc-400 text-sm text-center mb-10 max-w-xl mx-auto">
                    Survolez et sélectionnez votre concept préféré pour voir ses détails stylistiques.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {concepts.map((concept) => (
                        <div
                            key={concept.id}
                            onClick={() => setSelectedConcept(concept.id)}
                            className={`group glass-card p-8 rounded-3xl cursor-pointer transition-all duration-300 relative overflow-hidden border ${
                                selectedConcept === concept.id
                                    ? 'border-primary ring-2 ring-primary/40 shadow-[0_0_35px_rgba(245,183,39,0.3)]'
                                    : 'border-white/10 hover:border-white/20'
                            }`}
                        >
                            {/* Header de la carte */}
                            <div className="flex items-center justify-between gap-4 mb-6">
                                <span className="text-base font-bold text-white">
                                    {concept.name}
                                </span>
                                <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border ${concept.tagColor}`}>
                                    {concept.tag}
                                </span>
                            </div>

                            {/* Zone de démonstration du logo horizontal */}
                            <div className="my-8 flex items-center justify-center p-6 rounded-2xl bg-black/60 border border-white/5">
                                {concept.render}
                            </div>

                            {/* Description stylistique */}
                            <p className="text-zinc-400 text-xs leading-relaxed mb-6">
                                {concept.description}
                            </p>

                            {/* Bouton de sélection visuelle */}
                            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                <span className="text-xs text-zinc-500 font-medium">
                                    {selectedConcept === concept.id ? '✓ Sélectionné' : 'Cliquer pour choisir'}
                                </span>
                                <button
                                    type="button"
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                        selectedConcept === concept.id
                                            ? 'bg-primary text-zinc-950 shadow-[0_0_15px_rgba(245,183,39,0.5)]'
                                            : 'bg-white/5 hover:bg-white/10 text-zinc-300'
                                    }`}
                                >
                                    {selectedConcept === concept.id ? 'Votre Choix' : 'Sélectionner'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Simulation dans la Navbar */}
            <div className="glass-card p-8 sm:p-12 rounded-3xl border border-white/10 text-center">
                <h3 className="text-2xl font-bold text-white mb-3">
                    Prêt à faire votre choix ?
                </h3>
                <p className="text-zinc-400 text-sm max-w-xl mx-auto mb-8">
                    Indiquez simplement le numéro du concept (1, 2, 3 ou 4) que vous préférez, et je l'intégrerai directement dans la barre de navigation et l'ensemble de votre application !
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        href="/"
                        className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-semibold text-zinc-300 hover:text-white transition-all"
                    >
                        ← Retour à l'Accueil
                    </Link>
                </div>
            </div>
        </div>
    );
}

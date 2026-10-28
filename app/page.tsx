/**
 * app/page.tsx
 * 
 * Page d'accueil principale (Landing Page - Server Component).
 * 
 * Architecture visuelle :
 * 1. Hero Section :
 *    - Accroche artistique, badge d'architecture, titre sculptural et texte narratif.
 *    - Bouton d'action avec rayon lumineux tournant (border animation) menant à l'ancrage `#environments`.
 *    - Sculpture plastique illustrative en rendu 3D avec masque radial sur desktop.
 * 2. Section Grille des Environnements (`#environments`) :
 *    - 4 cartes interactives présentant les 4 stacks technologiques du banc d'essai
 *      (MySQL Natif, PostgreSQL Natif, MySQL + Prisma, PostgreSQL + Prisma).
 */

import Link from 'next/link';

export default function Home() {
  const platforms = [
    {
      title: "MySQL",
      description: "Connexion directe avec mysql2. Requêtes SQL pures pour un contrôle total et une vitesse maximale.",
      icon: "🗄️",
      href: "/mysql/products",
      color: "from-primary/20 to-amber-500/20",
      borderColor: "border-primary/30",
      tag: "Natif"
    },
    {
      title: "PostgreSQL",
      description: "Connexion directe avec le pilote pg. Interaction SQL directe, robuste et hautement fiable.",
      icon: "🐘",
      href: "/pg/products",
      color: "from-indigo-500/20 to-primary/20",
      borderColor: "border-indigo-500/30",
      tag: "Natif"
    },
    {
      title: "MySQL + Prisma",
      description: "Prisma ORM avec pilote MariaDB/MySQL. Typage strict, relations déclaratives et requêtes fluides.",
      icon: "🐬",
      href: "/mysqlprisma/products",
      color: "from-amber-500/20 to-primary/20",
      borderColor: "border-amber-500/30",
      tag: "ORM"
    },
    {
      title: "PostgreSQL + Prisma",
      description: "La puissance de l'ORM Prisma combinée à la robustesse et la flexibilité de PostgreSQL.",
      icon: "⚡",
      href: "/pgprisma/products",
      color: "from-purple-500/20 to-indigo-500/20",
      borderColor: "border-purple-500/30",
      tag: "ORM"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section Artistique calibrée sur la hauteur de l'écran restante */}
      <section className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-center overflow-hidden px-4 sm:px-6 py-10 lg:py-0">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Moitié Gauche : Bloc Texte Artistique épuré (Centré sur mobile, aligné à gauche sur desktop) */}
            <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center items-center lg:items-start text-center lg:text-left relative z-10 max-w-2xl mx-auto lg:max-w-none lg:mx-0">
              {/* Badge d'en-tête (Masqué sur mobile, affiché sur desktop) */}
              <div className="hidden lg:inline-flex items-center gap-2 px-3 py-1 mb-4 text-[11px] font-semibold tracking-wider text-amber-300 uppercase bg-primary/10 rounded-full border border-primary/20 backdrop-blur-md w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
                </span>
                <span>Architecture Multi-Bases & Next.js</span>
              </div>

              {/* Titre Sculptural */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight sm:leading-[1.15] mb-5 sm:mb-6 lg:mb-4">
                <span className="text-white">L&apos;Art du CRUD</span> <br />
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent inline-block mt-1 sm:mt-0">
                  Multi-Bases Moderne
                </span>
              </h1>

              {/* Texte narratif */}
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-8 lg:mb-6 max-w-lg mx-auto lg:mx-0">
                Une plateforme d&apos;expérimentation haute performance orchestrant{' '}
                <span className="text-zinc-200 font-semibold">MySQL</span>,{' '}
                <span className="text-zinc-200 font-semibold">PostgreSQL</span> et{' '}
                <span className="text-zinc-200 font-semibold">Prisma ORM</span>. 
                Contrôle SQL natif, typage strict et esthétique contemporaine fusionnent pour sublimer la gestion de vos données.
              </p>

              {/* Bouton d'Action Principal */}
              <div className="flex justify-center lg:justify-start w-full">
                <a
                  href="#environments"
                  className="group relative inline-flex items-center p-[2px] rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-[0_0_25px_rgba(245,183,39,0.25)] hover:shadow-[0_0_45px_rgba(245,183,39,0.55)] cursor-pointer"
                >
                  <span className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_0_300deg,#f5b727_340deg,#fff_360deg)] animate-spin-border group-hover:[animation-duration:1.5s]" />
                  <span className="relative flex items-center gap-2 px-6 py-3 rounded-[14px] bg-zinc-950/90 group-hover:bg-zinc-900/90 backdrop-blur-2xl transition-all font-semibold text-xs sm:text-sm text-zinc-100 group-hover:text-white">
                    <span>Découvrir Les environnements</span>
                    <svg className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>

            {/* Moitié Droite : Sculpture d'Art Plastique (Masquée sur mobile `hidden`, affichée sur desktop `lg:flex`) */}
            <div className="hidden lg:flex lg:col-span-5 xl:col-span-5 relative items-center justify-center">
              {/* Halo doré d'ambiance d'arrière-plan */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/25 via-amber-500/15 to-transparent blur-[100px] rounded-full pointer-events-none -z-10" />
              
              <div className="relative w-full max-w-[280px] sm:max-w-[400px] lg:max-w-[430px] xl:max-w-[460px] aspect-square flex items-center justify-center animate-float">
                {/* Lueur arrière directe */}
                <div className="absolute w-[85%] h-[85%] bg-primary/20 blur-[80px] rounded-full pointer-events-none -z-10" />
                
                {/* Sculpture avec masque dégradé uniforme fusionnant dans le fond sombre */}
                <img
                  src="/hero-art.jpg"
                  alt="Sculpture en art plastique représentant le CRUD Next.js et les flux de données"
                  className="w-full h-full object-cover mask-radial-fade filter drop-shadow-[0_20px_50px_rgba(245,183,39,0.3)] select-none pointer-events-none"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Grille des Environnements */}
      <section id="environments" className="container mx-auto px-4 sm:px-6 pt-20 lg:pt-28 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Choisissez votre environnement de données
          </h2>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto">
            Chaque base de données dispose de ses propres routes API dédiées, tables synchronisées et interfaces CRUD.
          </p>
        </div>

        {/* Dynamic Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2 sm:px-4">          
          {platforms.map((platform, index) => (
            <Link
              key={index}
              href={platform.href}
              className={`group relative glass-card p-6 sm:p-8 rounded-3xl overflow-hidden flex flex-col items-start text-left border ${platform.borderColor}`}
            >
              {/* Card Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Tag */}
              <span className="relative z-10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500 bg-white/5 rounded-full mb-6 border border-white/10">
                {platform.tag}
              </span>

              {/* Icon */}
              <span
                className="block relative z-10 text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300 select-none"
                role="img"
                aria-label={platform.title}
                suppressHydrationWarning
              >
                {platform.icon}
              </span>

              {/* Content */}
              <h3 className="relative z-10 text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                {platform.title}
              </h3>

              <p className="relative z-10 text-zinc-400 group-hover:text-zinc-300 text-sm leading-relaxed mb-8">
                {platform.description}
              </p>

              {/* Action Button */}
              <div className="relative z-10 mt-auto flex items-center gap-2 text-sm font-semibold text-white group/btn">
                <span>Explorer le CRUD</span>
                <svg
                  className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>

              {/* Decorative Corner Glow */}
              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-primary/20 blur-[60px] rounded-full group-hover:bg-primary/40 transition-all duration-500" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

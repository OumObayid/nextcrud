import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const environments = [
    {
      name: "MySQL Natif",
      driver: "Pilote direct mysql2",
      badge: "Natif",
      badgeColor: "bg-amber-400/10 text-amber-300 border-amber-400/20",
      description: "Exécution directe de requêtes SQL brutes avec un contrôle d'accès bas niveau et une latence minimale.",
      href: "/mysql/products",
      countLabel: "Table produits synchronisée",
    },
    {
      name: "PostgreSQL Natif",
      driver: "Pilote direct pg",
      badge: "Natif",
      badgeColor: "bg-indigo-400/10 text-indigo-300 border-indigo-400/20",
      description: "Interaction directe avec le moteur relationnel PostgreSQL. Robustesse SQL pure et transactions ACID.",
      href: "/pg/products",
      countLabel: "Table produits synchronisée",
    },
    {
      name: "MySQL + Prisma",
      driver: "Prisma ORM Client",
      badge: "ORM",
      badgeColor: "bg-emerald-400/10 text-emerald-300 border-emerald-400/20",
      description: "Couche d'abstraction Prisma avec génération dynamique de requêtes typées et validation déclarative.",
      href: "/mysqlprisma/products",
      countLabel: "Modèle Product Prisma",
    },
    {
      name: "PostgreSQL + Prisma",
      driver: "Prisma ORM Client",
      badge: "ORM",
      badgeColor: "bg-purple-400/10 text-purple-300 border-purple-400/20",
      description: "Synergie entre la puissance relationnelle de PostgreSQL et la sécurité de typage strict offerte par Prisma.",
      href: "/pgprisma/products",
      countLabel: "Modèle Product Prisma",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* En-tête de la Console */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-[11px] font-semibold tracking-wider text-amber-300 uppercase bg-primary/10 rounded-full border border-primary/25">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(245,183,39,0.8)]" />
            <span>Banc d'Essai Technique Restreint</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Console de Test CRUD Multi-Bases
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Session connectée :{" "}
            <span className="text-zinc-200 font-medium">
              {session?.user?.name || session?.user?.email}
            </span>
          </p>
        </div>

        {/* Sélecteur d'onglets restreints */}
        <div className="inline-flex items-center p-1 rounded-2xl bg-zinc-900/80 border border-white/10 shrink-0">
          <span className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-950 bg-primary shadow-[0_0_15px_rgba(245,183,39,0.4)]">
            Banc de Test
          </span>
          <Link
            href="/dashboard/profil"
            className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white transition-colors"
          >
            Profil
          </Link>
        </div>
      </div>

      {/* Bannière de Précision de la Mission Exclusive (Rétreinte au test CRUD) */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-zinc-900/80 to-zinc-950/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        {/* Glow discret d'ambiance */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-primary/20 blur-[60px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(245,183,39,0.25)]">
            <svg className="w-6 h-6 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>

          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Périmètre & Finalité de l'Application
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
              Cet espace est strictement dédié au banc d'essai CRUD avec PostgreSQL et MySQL (avec ou sans Prisma ORM).
            </h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Cette interface n'est pas un tableau de bord généraliste ni une application commerciale : il s'agit d'un 
              laboratoire technique calibré pour éprouver, comparer et valider les opérations 
              fondamentales <span className="text-amber-300 font-semibold">C</span>reate, <span className="text-amber-300 font-semibold">R</span>ead, <span className="text-amber-300 font-semibold">U</span>pdate, <span className="text-amber-300 font-semibold">D</span>elete sur 4 architectures de persistance distinctes.
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-400">
              <div className="flex items-center gap-2 bg-black/30 px-3 py-2 rounded-xl border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>Validation SQL brut (MySQL2 & PG natifs)</span>
              </div>
              <div className="flex items-center gap-2 bg-black/30 px-3 py-2 rounded-xl border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span>Typage strict et modélisation déclarative Prisma</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grille des 4 Bancs d'Essai CRUD */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-zinc-200 uppercase tracking-wider text-xs">
            Sélectionner un environnement de test
          </h3>
          <span className="text-xs text-zinc-500">4 bancs opérationnels</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {environments.map((env) => (
            <div
              key={env.name}
              className="glass-card p-6 rounded-3xl border border-white/10 hover:border-primary/40 flex flex-col justify-between transition-all duration-300 group relative"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
                    <span className="text-xs font-semibold text-zinc-400">{env.driver}</span>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${env.badgeColor}`}>
                    {env.badge}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                  {env.name}
                </h4>

                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  {env.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-mono">
                  {env.countLabel}
                </span>

                <Link
                  href={env.href}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-primary hover:text-zinc-950 text-zinc-200 border border-white/10 hover:border-primary transition-all duration-200 shadow-md group/btn"
                >
                  <span>Exécuter le CRUD</span>
                  <svg className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

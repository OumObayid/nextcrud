import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import Link from "next/link";

/**
 * ==============================================================================
 * Page de Profil Utilisateur (Server Component)
 * ==============================================================================
 * 
 * Cette page affiche les informations de l'opérateur connecté extraites
 * de la session NextAuth (nom, adresse email, rôle au sein du banc d'essai).
 * 
 * Fonctionnalités :
 * - Lecture directe et asynchrone de la session côté serveur via `getServerSession`.
 * - Affichage sécurisé de l'identité sans exposer d'informations critiques (mots de passe).
 * - Navigation fluide entre la console d'essai et la vue profil.
 */
export default async function ProfilPage() {
  // Récupération des informations de la session active
  const session = await getServerSession(authOptions);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* En-tête de la page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-[11px] font-semibold tracking-wider text-amber-300 uppercase bg-primary/10 rounded-full border border-primary/25">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Identité & Sécurité</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Profil Utilisateur
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Informations de session et gestion de vos accès au banc d'essai
          </p>
        </div>

        {/* Sélecteur d'onglets (Banc de Test / Profil) */}
        <div className="inline-flex items-center p-1 rounded-2xl bg-zinc-900/80 border border-white/10 shrink-0">
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white transition-colors"
          >
            Banc de Test
          </Link>
          <span className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-950 bg-primary shadow-[0_0_15px_rgba(245,183,39,0.4)]">
            Profil
          </span>
        </div>
      </div>

      {/* Carte d'Identité Utilisateur */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 glass-card p-8 rounded-3xl border border-white/10 space-y-6">
          <h2 className="text-lg font-bold text-white">Coordonnées du Compte</h2>

          <div className="space-y-4">
            {/* Nom complet */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-white/5">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Nom complet
              </span>
              <span className="text-sm font-semibold text-zinc-200 mt-1 sm:mt-0">
                {session?.user?.name || "Non renseigné"}
              </span>
            </div>

            {/* Email */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-white/5">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Adresse email
              </span>
              <span className="text-sm font-mono text-zinc-200 mt-1 sm:mt-0">
                {session?.user?.email}
              </span>
            </div>

            {/* Rôle attribué */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-white/5">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Rôle système
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/15 text-amber-300 border border-primary/30 mt-1 sm:mt-0">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Opérateur Banc d'Essai
              </span>
            </div>

            {/* État de la session */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Statut de session
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 mt-1 sm:mt-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Session active
              </span>
            </div>
          </div>
        </div>

        {/* Panneau latéral d'information bac à sable */}
        <div className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-white">Zone de Test Développeur</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Ce profil est rattaché à l'expérimentation CRUD. Vous disposez des autorisations nécessaires pour insérer, modifier, afficher et supprimer des produits sur MySQL et PostgreSQL.
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-white/5">
            <Link
              href="/dashboard"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-white/5 hover:bg-primary hover:text-zinc-950 text-zinc-200 border border-white/10 hover:border-primary transition-all duration-200"
            >
              ← Retour au banc d'essai
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

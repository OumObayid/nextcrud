/**
 * components/DisclaimerModal.tsx
 * 
 * Modale d'avertissement et de cadrage pédagogique.
 * 
 * Fonctionnement :
 * - S'affiche uniquement lors de la toute première visite de l'utilisateur.
 * - Utilise `localStorage` (`next_crud_first_visit_seen`) pour mémoriser l'acquittement.
 * - Informe le visiteur que ce projet est un banc d'essai d'apprentissage pour
 *   comparer différentes architectures de bases de données, et non un site commercial.
 */

"use client";

import { useState, useEffect } from "react";

export default function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      // 1. Vérifier si le visiteur a déjà validé la modale lors d'une session précédente
      const hasSeen = localStorage.getItem("next_crud_first_visit_seen");
      if (!hasSeen) {
        // Enregistrement préventif pour garantir un affichage unique
        localStorage.setItem("next_crud_first_visit_seen", "true");
        // Délai court pour laisser le temps au rendu initial et éviter le saut visuel
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 300);
        return () => clearTimeout(timer);
      }
    } catch {
      // Bloc de sécurité si les cookies/localStorage sont bloqués par le navigateur
    }
  }, []);

  const handleClose = () => {
    try {
      localStorage.setItem("next_crud_first_visit_seen", "true");
    } catch {}
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md transition-opacity">
      <div
        className="relative w-full max-w-md p-6 sm:p-7 rounded-[2rem] border border-primary/30 bg-gradient-to-br from-zinc-900/95 via-zinc-900/90 to-zinc-950/95 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(245,183,39,0.15)] text-left overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Lueur dorée d'arrière-plan */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 blur-[50px] rounded-full pointer-events-none" />

        <div className="relative z-10 space-y-5">
          {/* Bouton de fermeture croix */}
          <div className="flex justify-end">
            <button
              onClick={handleClose}
              className="text-zinc-500 hover:text-white p-1 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Fermer la fenêtre"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Corps explicatif */}
          <div className="space-y-3.5 text-sm leading-relaxed">
            <p className="font-semibold text-amber-200/95 text-[15px] leading-snug">
              Ce site est un banc d&apos;essai technique dédié à l&apos;apprentissage et au test des opérations CRUD avec PostgreSQL et MySQL (avec ou sans Prisma ORM).
            </p>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Il ne s&apos;agit pas d&apos;une application commerciale complexe, mais d&apos;un projet personnel conçu comme un laboratoire d&apos;expérimentation pour explorer et comparer la gestion des données (Create, Read, Update, Delete) sur différentes architectures Next.js.
            </p>
          </div>

          {/* Bouton d'acquittement */}
          <div className="pt-2">
            <button
              onClick={handleClose}
              className="w-full relative group overflow-hidden p-[1px] rounded-2xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] shadow-[0_10px_25px_-5px_rgba(181,161,9,0.35)] cursor-pointer"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-amber-300 to-accent opacity-90 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center justify-center gap-2 px-6 py-3 rounded-[15px] bg-gradient-to-r from-[#d4af37] via-[#c99e28] to-[#b58c1f] text-zinc-950 font-bold text-sm tracking-wide">
                <span>J&apos;ai compris</span>
                <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

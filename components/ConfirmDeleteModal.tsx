'use client';

import { useEffect } from 'react';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  itemName?: string;
  loading?: boolean;
}

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmer la suppression",
  itemName,
  loading = false,
}: ConfirmDeleteModalProps) {
  // Fermeture via la touche Échap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !loading) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, loading, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={!loading ? onClose : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      {/* Conteneur de la boîte de dialogue */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md glass-card rounded-3xl p-6 sm:p-8 border border-red-500/25 shadow-[0_25px_60px_-15px_rgba(239,68,68,0.35)] overflow-hidden scale-in-95 animate-in duration-200"
      >
        {/* Lueur rouge d'ambiance en arrière-plan */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-red-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center">
          {/* Icône de danger animée avec halo */}
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-tr from-red-500/20 via-rose-500/10 to-transparent border border-red-500/30 flex items-center justify-center text-red-400 shadow-[0_0_25px_rgba(239,68,68,0.3)]">
            <svg className="w-8 h-8 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>

          {/* Titre */}
          <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
            {title}
          </h3>

          <p className="text-zinc-400 text-sm mb-4">
            Êtes-vous sûr de vouloir supprimer définitivement cet élément ?
          </p>

          {/* Produit concerné */}
          {itemName && (
            <div className="mb-5 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
              <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-semibold block mb-0.5">
                Produit sélectionné
              </span>
              <span className="font-bold text-white text-sm line-clamp-1">
                « {itemName} »
              </span>
            </div>
          )}

          {/* Avertissement irréversible */}
          <div className="flex items-center gap-2.5 text-xs text-amber-300/90 bg-amber-500/10 border border-amber-500/20 px-3.5 py-2.5 rounded-xl mb-6 text-left">
            <svg className="w-4 h-4 shrink-0 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Cette action est irréversible et supprimera l'enregistrement de la base.</span>
          </div>

          {/* Boutons d'Action */}
          <div className="flex items-center gap-3">
            {/* Annuler */}
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-sm font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              Annuler
            </button>

            {/* Supprimer définitivement */}
            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white text-sm font-bold shadow-[0_0_25px_rgba(239,68,68,0.45)] hover:shadow-[0_0_35px_rgba(239,68,68,0.7)] transition-all duration-200 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Suppression...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Supprimer</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

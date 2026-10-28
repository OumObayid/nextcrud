/**
 * components/Logo.tsx
 * 
 * Composant de marque et Logotype vectoriel (SVG pur).
 * 
 * Symbolisme visuel :
 * - Double cylindre SQL entrecroisé formant le signe de l'infini (∞).
 * - Représente la continuité et la fluidité des cycles de données CRUD (Create, Read, Update, Delete).
 * - Finition dorée métallique avec dégradés spéculaires et ombrages de profondeur.
 * - Typographie contrastée associant "NEXT" (fin et léger) et "CRUD" (robuste et audacieux en dégradé d'or).
 */

import React from 'react';

interface LogoProps {
  /** Classes CSS complémentaires appliquées au conteneur externe */
  className?: string;
  /** Afficher ou masquer le texte 'NEXT CRUD' */
  showText?: boolean;
  /** Palier de taille prédéfini ('sm' | 'md' | 'lg' | 'xl') */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Classe Tailwind personnalisée pour forcer les dimensions du symbole */
  symbolClassName?: string;
  /** Classe Tailwind personnalisée pour forcer la taille du texte */
  textClassName?: string;
}

/**
 * Symbole seul : Double cylindre SQL en boucle infinie (Or métallique)
 */
export function LogoSymbol({ className = "w-10 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Dégradé doré spéculaire haute brillance */}
        <linearGradient id="goldInfinityMain" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF6C2" />
          <stop offset="25%" stopColor="#F5B727" />
          <stop offset="50%" stopColor="#FFE082" />
          <stop offset="75%" stopColor="#D49200" />
          <stop offset="100%" stopColor="#9E6900" />
        </linearGradient>

        {/* Dégradé pour la profondeur des disques inférieurs */}
        <linearGradient id="goldInfinityDepth" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#664100" />
          <stop offset="50%" stopColor="#B37800" />
          <stop offset="100%" stopColor="#F5B727" />
        </linearGradient>
      </defs>

      {/* Disque inférieur 3 (Base du cylindre) */}
      <path
        d="M28 32 C 14 32, 6 24, 6 17 C 6 10, 14 4, 28 4 C 41 4, 47 14, 50 17 C 53 14, 59 4, 72 4 C 86 4, 94 10, 94 17 C 94 24, 86 32, 72 32 C 59 32, 53 20, 50 17 C 47 20, 41 32, 28 32 Z"
        transform="translate(0, 14)"
        fill="none"
        stroke="url(#goldInfinityDepth)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />

      {/* Disque intermédiaire 2 */}
      <path
        d="M28 32 C 14 32, 6 24, 6 17 C 6 10, 14 4, 28 4 C 41 4, 47 14, 50 17 C 53 14, 59 4, 72 4 C 86 4, 94 10, 94 17 C 94 24, 86 32, 72 32 C 59 32, 53 20, 50 17 C 47 20, 41 32, 28 32 Z"
        transform="translate(0, 7)"
        fill="none"
        stroke="url(#goldInfinityDepth)"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />

      {/* Disque supérieur 1 (Surface dorée lumineuse) */}
      <path
        d="M28 32 C 14 32, 6 24, 6 17 C 6 10, 14 4, 28 4 C 41 4, 47 14, 50 17 C 53 14, 59 4, 72 4 C 86 4, 94 10, 94 17 C 94 24, 86 32, 72 32 C 59 32, 53 20, 50 17 C 47 20, 41 32, 28 32 Z"
        fill="none"
        stroke="url(#goldInfinityMain)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Anneaux intérieurs (ouvertures des disques) */}
      <ellipse cx="28" cy="17" rx="9" ry="5.5" fill="none" stroke="url(#goldInfinityMain)" strokeWidth="2.5" />
      <ellipse cx="72" cy="17" rx="9" ry="5.5" fill="none" stroke="url(#goldInfinityMain)" strokeWidth="2.5" />
    </svg>
  );
}

/**
 * Logo horizontal complet associant le symbole infini et le titre NEXT CRUD
 */
export default function Logo({
  className = "",
  showText = true,
  size = "md",
  symbolClassName,
  textClassName
}: LogoProps) {
  // Paliers de taille pour le symbole graphique
  const defaultSymbolSizes = {
    sm: "w-10 h-6",
    md: "w-14 h-8 sm:w-16 sm:h-9",
    lg: "w-20 h-11 sm:w-24 sm:h-13",
    xl: "w-28 h-15 sm:w-32 sm:h-17"
  };

  // Paliers de taille pour la typographie
  const defaultTextSizes = {
    sm: "text-xs sm:text-sm",
    md: "text-sm sm:text-base",
    lg: "text-lg sm:text-xl",
    xl: "text-2xl sm:text-3xl"
  };

  const activeSymbolClass = symbolClassName || defaultSymbolSizes[size];
  const activeTextClass = textClassName || defaultTextSizes[size];

  return (
    <div className={`inline-flex items-center gap-3 bg-transparent select-none ${className}`}>
      {/* Symbole infini doré grand format avec lueur */}
      <div className="shrink-0 transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_0_14px_rgba(245,183,39,0.5)]">
        <LogoSymbol className={activeSymbolClass} />
      </div>

      {/* Typographie NEXT CRUD */}
      {showText && (
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-light tracking-wider text-zinc-200 transition-colors group-hover:text-white ${activeTextClass}`}>
            NEXT
          </span>
          <span className={`font-black tracking-tight bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent transition-all group-hover:brightness-110 ${activeTextClass}`}>
            CRUD
          </span>
        </div>
      )}
    </div>
  );
}

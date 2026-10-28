/**
 * components/Navbar.tsx
 * 
 * Barre de navigation principale responsive et interactive (Client Component).
 * 
 * Responsabilités clés :
 * 1. Logotype réactif menant à l'accueil.
 * 2. Menu de navigation Desktop (visible >= 1024px) avec pastille lumineuse pour l'onglet actif.
 * 3. Menu latéral Mobile (tiroir escamotable) avec gestion de l'état ouvert/fermé.
 * 4. Gestion de session utilisateur NextAuth (boutons Login/Register si déconnecté,
 *    avatar et menu déroulant avec options Profil/Déconnexion si connecté).
 * 5. Gestion des événements clavier (Échap) et clics extérieurs pour l'accessibilité.
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import Logo from "@/components/Logo";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Fermer le dropdown et le menu mobile lors d'un clic extérieur ou avec la touche Echap
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        // Ne pas fermer si le clic est sur le bouton hamburger lui-même
        const target = event.target as HTMLElement;
        if (!target.closest('[data-mobile-toggle="true"]')) {
          setMobileMenuOpen(false);
        }
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };
    if (dropdownOpen || mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dropdownOpen, mobileMenuOpen]);

  // Fermer les menus lors d'un changement de page
  useEffect(() => {
    const timer = setTimeout(() => {
      setDropdownOpen(false);
      setMobileMenuOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Fermer le menu mobile automatiquement si la fenêtre est redimensionnée en mode desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "MySQL", href: "/mysql/products" },
    { name: "PostgreSQL", href: "/pg/products" },
    { name: "MySQL + Prisma", href: "/mysqlprisma/products" },
    { name: "PostgreSQL + Prisma", href: "/pgprisma/products" },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    if (href === "/mysql/products") {
      return pathname.startsWith("/mysql/") && !pathname.startsWith("/mysqlprisma");
    }
    if (href === "/pg/products") {
      return pathname.startsWith("/pg/") && !pathname.startsWith("/pgprisma");
    }
    if (href === "/mysqlprisma/products") {
      return pathname.startsWith("/mysqlprisma");
    }
    if (href === "/pgprisma/products") {
      return pathname.startsWith("/pgprisma");
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  const isLoginActive = pathname === "/login";
  const isRegisterActive = pathname === "/register";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/40 backdrop-blur-md border-b border-white/[0.05] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* 1 - Logo NEXT CRUD à GAUCHE */}
        <Link
          href="/"
          className="group shrink-0 flex items-center hover:opacity-95 transition-all"
          title="NEXT CRUD - Accueil"
        >
          <Logo
            symbolClassName="w-14 h-8 sm:w-16 sm:h-9 lg:w-20 lg:h-11"
            textClassName="text-xs sm:text-sm lg:text-base"
          />
        </Link>

        {/* 2 - Bloc des menus Desktop à DROITE (INCHANGÉ, visible uniquement sur desktop >= 1024px) */}
        <div className="hidden lg:flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-full border border-primary/20 bg-gradient-to-r from-slate-900/85 via-primary/[0.12] to-slate-900/85 shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_20px_rgba(181,161,9,0.12)] backdrop-blur-lg">
          {/* Liens principaux */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 max-w-[50vw] sm:max-w-none overflow-x-auto scrollbar-none py-0.5">
            {navLinks.map((link) => {
              const isActive = isLinkActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? "bg-primary text-zinc-950 font-bold shadow-[0_0_15px_rgba(245,183,39,0.5)]"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Séparateur discret */}
          <div className="h-4 w-px bg-white/10 shrink-0" />

          {/* Partie utilisateur Desktop (Login / Register ou Profil Dropdown) */}
          <div className="relative shrink-0" ref={dropdownRef}>
            {!session?.user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className={`px-3 sm:px-3.5 py-1 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                    isLoginActive
                      ? "bg-primary text-zinc-950 font-bold shadow-[0_0_15px_rgba(245,183,39,0.5)]"
                      : "text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className={`px-3 sm:px-3.5 py-1 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isRegisterActive
                      ? "bg-primary text-zinc-950 font-bold shadow-[0_0_15px_rgba(245,183,39,0.5)]"
                      : "bg-zinc-400 text-zinc-950 hover:bg-zinc-300"
                  }`}
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="relative">
                {/* Bouton profil soigné avec avatar et chevron animé */}
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-primary/20 hover:border-primary/40 text-white text-xs sm:text-sm font-medium transition-all duration-200 focus:outline-none cursor-pointer"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-amber-300 text-zinc-950 font-bold flex items-center justify-center text-[11px] shrink-0 shadow-sm">
                    {(session.user.name || session.user.email || "U").charAt(0).toUpperCase()}
                  </span>
                  <span className="max-w-[85px] sm:max-w-[130px] truncate text-zinc-200 font-medium">
                    {session.user.name || session.user.email}
                  </span>
                  <svg
                    className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 shrink-0 ${
                      dropdownOpen ? "rotate-180 text-primary" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Menu déroulant flottant, positionné en dessous sans contrainte d'overflow */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-3 w-64 rounded-2xl bg-zinc-900/95 backdrop-blur-xl border border-primary/25 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_25px_rgba(245,183,39,0.12)] z-[60] animate-fade-in">
                    {/* Header info utilisateur */}
                    <div className="px-3 py-2.5 border-b border-white/5 mb-1 text-left">
                      <p className="text-xs font-semibold text-white truncate">
                        {session.user.name || "Utilisateur"}
                      </p>
                      <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                        {session.user.email}
                      </p>
                    </div>

                    {/* Liens de navigation */}
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-all group"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <svg className="w-4 h-4 text-primary/80 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                      <span>Dashboard</span>
                    </Link>

                    <Link
                      href="/dashboard/profil"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-all group"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <svg className="w-4 h-4 text-primary/80 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Mon Profil</span>
                    </Link>

                    <div className="h-px bg-white/5 my-1 mx-1" />

                    {/* Déconnexion */}
                    <button
                      type="button"
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full flex items-center gap-2.5 text-left px-3 py-2 rounded-xl text-xs sm:text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all font-medium cursor-pointer group"
                    >
                      <svg className="w-4 h-4 text-red-400/80 group-hover:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Déconnexion</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 3 - Contrôles Mobiles / Tablettes (< 1024px) */}
        <div className="flex lg:hidden items-center gap-2.5">
          {session?.user && (
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-primary/20 text-xs text-zinc-200 hover:border-primary/40 transition-colors"
              title="Accéder au Dashboard"
            >
              <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-primary to-amber-300 text-zinc-950 font-bold flex items-center justify-center text-[10px]">
                {(session.user.name || session.user.email || "U").charAt(0).toUpperCase()}
              </span>
              <span className="text-[11px] font-medium text-amber-300 hidden sm:inline">Dashboard</span>
            </Link>
          )}

          <button
            type="button"
            data-mobile-toggle="true"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 sm:p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-primary/25 hover:border-primary/50 text-zinc-200 hover:text-white transition-all focus:outline-none cursor-pointer"
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Menu Mobile Déroulant Flottant */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden border-t border-primary/20 bg-zinc-950/95 backdrop-blur-2xl px-4 py-5 shadow-2xl animate-fade-in max-h-[calc(100vh-5rem)] overflow-y-auto space-y-4"
        >
          {/* Liens de navigation */}
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = isLinkActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all ${
                    isActive
                      ? "text-amber-400 font-bold bg-white/[0.04]"
                      : "text-zinc-300 hover:text-white hover:bg-white/5 font-medium"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  )}
                </Link>
              );
            })}

            {/* Liens Connexion et Inscription à la suite des autres (pas sous forme de boutons) */}
            {!session?.user && (
              <>
                <div className="h-px bg-white/10 my-2" />
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all ${
                    isLoginActive
                      ? "text-amber-400 font-bold bg-white/[0.04]"
                      : "text-zinc-300 hover:text-white hover:bg-white/5 font-medium"
                  }`}
                >
                  <span>Connexion</span>
                  {isLoginActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  )}
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all ${
                    isRegisterActive
                      ? "text-amber-400 font-bold bg-white/[0.04]"
                      : "text-zinc-300 hover:text-white hover:bg-white/5 font-medium"
                  }`}
                >
                  <span>Inscription</span>
                  {isRegisterActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  )}
                </Link>
              </>
            )}
          </div>

          {session?.user && (
            <div className="space-y-3 pt-2 border-t border-white/10">
              {/* Carte profil utilisateur mobile */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                <span className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-amber-300 text-zinc-950 font-bold flex items-center justify-center text-sm shrink-0 shadow-sm">
                  {(session.user.name || session.user.email || "U").charAt(0).toUpperCase()}
                </span>
                <div className="min-w-0 flex-1 text-left">
                  <p className="text-sm font-semibold text-white truncate">
                    {session.user.name || "Utilisateur"}
                  </p>
                  <p className="text-xs text-zinc-400 truncate">
                    {session.user.email}
                  </p>
                </div>
              </div>

              {/* Boutons d'accès direct */}
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-zinc-200 transition-all"
                >
                  <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  <span>Dashboard</span>
                </Link>

                <Link
                  href="/dashboard/profil"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-zinc-200 transition-all"
                >
                  <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Mon Profil</span>
                </Link>
              </div>

              {/* Bouton déconnexion mobile */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-semibold transition-all cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Se déconnecter</span>
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/login?registered=true");
      } else {
        setError(data.message || "Impossible de finaliser l'inscription avec les informations fournies.");
      }
    } catch (err) {
      setError("Une erreur réseau est survenue lors de la communication avec le serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)] px-4 py-8 sm:py-12">
      <div className="glass-card w-full max-w-md p-6 sm:p-10 rounded-2xl sm:rounded-[2rem] border border-white/10 relative overflow-hidden group shadow-2xl">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-[80px] rounded-full group-hover:bg-primary/30 transition-all duration-700" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/15 blur-[80px] rounded-full group-hover:bg-secondary/25 transition-all duration-700" />

        <div className="relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Créer un compte
            </h1>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs py-3 px-4 rounded-xl flex items-start gap-2.5 animate-shake">
                <svg className="w-4 h-4 shrink-0 mt-0.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider ml-1">
                Nom complet
              </label>
              <input
                type="text"
                placeholder="Alexandre Dupont"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
                required
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider ml-1">
                Adresse email
              </label>
              <input
                type="email"
                placeholder="nom@entreprise.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
                required
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider ml-1">
                Mot de passe
              </label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-2xl p-[1px] transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_10px_25px_-5px_rgba(181,161,9,0.35)] hover:shadow-[0_15px_35px_-5px_rgba(181,161,9,0.55)] cursor-pointer"
            >
              {/* Bordure lumineuse dégradée */}
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-amber-300 to-accent opacity-90 group-hover:opacity-100 transition-opacity" />

              {/* Contenu intérieur */}
              <span className="relative flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-[15px] bg-gradient-to-r from-[#d4af37] via-[#c99e28] to-[#b58c1f] text-zinc-950 font-bold text-sm tracking-wide transition-all group-hover:brightness-105">
                {/* Rayon de brillance spéculaire */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out pointer-events-none" />

                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-zinc-950" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Création du compte...</span>
                  </>
                ) : (
                  <>
                    <span>Créer un compte</span>
                    <svg className="w-4 h-4 text-zinc-950 group-hover:translate-x-1 transition-transform stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-zinc-500 text-xs sm:text-sm">
              Vous disposez déjà d'un compte ?{" "}
              <Link
                href="/login"
                className="text-primary hover:brightness-125 font-semibold transition-colors"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

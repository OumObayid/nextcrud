import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_SUPPORT || "contact@oumportfolio.com";
  const rawPhone = process.env.NEXT_PUBLIC_TELEPHONE || "0600000000";
  const formattedPhone = rawPhone.replace(/(\d{2})(?=\d)/g, "$1 ").trim();

  return (
    <footer className="w-full mt-16 md:mt-24 border-t border-white/[0.05] bg-zinc-950/40 backdrop-blur-md pt-10 md:pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Contenu symétrique, simple et sophistiqué */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Colonne Gauche : Environnements */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Environnements
            </span>
            <ul className="space-y-2 text-sm text-zinc-400 text-center md:text-left">
              <li>
                <Link href="/mysql/products" className="hover:text-primary transition-colors">
                  MySQL Natif (mysql2)
                </Link>
              </li>
              <li>
                <Link href="/pg/products" className="hover:text-primary transition-colors">
                  PostgreSQL Natif (pg)
                </Link>
              </li>
              <li>
                <Link href="/mysqlprisma/products" className="hover:text-primary transition-colors">
                  MySQL + Prisma ORM
                </Link>
              </li>
              <li>
                <Link href="/pgprisma/products" className="hover:text-primary transition-colors">
                  PostgreSQL + Prisma ORM
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne Centrale : Identité de marque NEXT CRUD & Statut */}
          <div className="flex flex-col items-center text-center space-y-3">
            <Link href="/" className="group inline-flex items-center hover:opacity-90 transition-opacity">
              <Logo size="md" />
            </Link>
            <div>
              <p className="text-xs text-zinc-500 mt-1">Architecture Multi-Bases Next.js</p>
            </div>
            <div className="inline-flex items-center gap-2 text-xs text-zinc-400 bg-zinc-900/80 px-3 py-1 rounded-full border border-white/5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              <span>Systèmes opérationnels</span>
            </div>
          </div>

          {/* Colonne Droite : Support & Contact */}
          <div className="flex flex-col items-center md:items-end space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Support & Contact
            </span>
            <ul className="space-y-2 text-sm text-zinc-400 text-center md:text-right">
              <li>
                <a
                  href={`mailto:${contactEmail}`}
                  className="group inline-flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <span className="order-2 md:order-1">{contactEmail}</span>
                  <svg className="w-4 h-4 text-primary shrink-0 order-1 md:order-2 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${rawPhone}`}
                  className="group inline-flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <span className="order-2 md:order-1">{formattedPhone}</span>
                  <svg className="w-4 h-4 text-primary shrink-0 order-1 md:order-2 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
              </li>
              <li className="text-xs text-zinc-500">
                Support technique & assistance
              </li>
            </ul>
          </div>
        </div>

        {/* HR de longueur équilibrée sur mobile et 50vw sur desktop */}
        <hr className="w-3/4 max-w-md md:w-[50vw] h-px mx-auto border-0 bg-gradient-to-r from-transparent via-zinc-600/70 to-transparent my-8" />

        {/* Copyright sous le HR */}
        <p className="text-center text-xs text-zinc-500 tracking-wider" suppressHydrationWarning>
          © {new Date().getFullYear()} Database CRUD Lab. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}

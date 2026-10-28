/**
 * app/layout.tsx
 * 
 * Layout racine global (RootLayout) de l'application Next.js (App Router).
 * 
 * Fonctionnalités intégrées :
 * 1. Métadonnées SEO et configuration exhaustive des favicons pour tous appareils.
 * 2. Injection du thème sombre par défaut (`className="dark"`).
 * 3. Script pré-hydratation pour nettoyer les attributs parasites injectés par des extensions tierces (ex: Bitdefender).
 * 4. Enveloppe globale des Providers (NextAuth SessionProvider).
 * 5. Inclusion des composants permanents : Navbar, DisclaimerModal et Footer.
 */

import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "@/components/Providers";
import DisclaimerModal from "@/components/DisclaimerModal";

export const metadata: Metadata = {
  title: "NEXT CRUD | Database Lab",
  description: "Architecture et comparatif complet des opérations CRUD sur MySQL et PostgreSQL avec ou sans Prisma ORM",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Nettoyage pré-hydratation contre les attributs tiers injectés par les extensions de sécurité (ex: Bitdefender bis_skin_checked) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var clean = function(node) {
                    if (!node || node.nodeType !== 1) return;
                    if (node.hasAttribute('bis_skin_checked')) {
                      node.removeAttribute('bis_skin_checked');
                    }
                    var list = node.querySelectorAll ? node.querySelectorAll('[bis_skin_checked]') : [];
                    for (var i = 0; i < list.length; i++) {
                      list[i].removeAttribute('bis_skin_checked');
                    }
                  };
                  clean(document.documentElement);
                  if (typeof MutationObserver !== 'undefined') {
                    var observer = new MutationObserver(function(mutations) {
                      for (var i = 0; i < mutations.length; i++) {
                        var m = mutations[i];
                        if (m.type === 'attributes' && m.attributeName === 'bis_skin_checked' && m.target) {
                          m.target.removeAttribute('bis_skin_checked');
                        } else if (m.addedNodes) {
                          for (var j = 0; j < m.addedNodes.length; j++) {
                            clean(m.addedNodes[j]);
                          }
                        }
                      }
                    });
                    observer.observe(document.documentElement, {
                      attributes: true,
                      childList: true,
                      subtree: true,
                      attributeFilter: ['bis_skin_checked']
                    });
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={` antialiased selection:bg-primary/30`}
      >
        <div className="bg-mesh" suppressHydrationWarning />
        <Providers>
          <Navbar />
          <DisclaimerModal />
          <main className="min-h-screen mt-20">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

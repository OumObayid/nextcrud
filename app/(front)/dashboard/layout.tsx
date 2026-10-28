import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

/**
 * ==============================================================================
 * Layout Protégé du Tableau de Bord (Server Component)
 * ==============================================================================
 * 
 * Ce composant de layout enveloppe toutes les routes du tableau de bord (/dashboard/*).
 * 
 * Rôles et responsabilités :
 * 1. Contrôle d'accès sécurisé côté serveur :
 *    Interroge `getServerSession` avec la configuration `authOptions`.
 * 2. Protection contre les accès non autorisés :
 *    Si aucune session active n'est détectée, redirige immédiatement vers `/login`.
 * 3. Structure visuelle commune :
 *    Offre un conteneur centré avec espacements responsifs pour la console et le profil.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Récupération de la session utilisateur côté serveur
  const session = await getServerSession(authOptions);

  // Redirection immédiate si l'utilisateur n'est pas connecté
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-[calc(100vh-12rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {children}
      </div>
    </div>
  );
}

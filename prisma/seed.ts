/**
 * ==============================================================================
 * Script de Remplissage Initial de la Base de Données (Database Seeding)
 * ==============================================================================
 * 
 * Ce script permet de peupler la table des produits avec un jeu d'essai complet
 * et réaliste lors de l'initialisation du projet ou après une réinitialisation de la base.
 * 
 * Caractéristiques techniques :
 * - Utilise Prisma Client 7 avec l'adaptateur de pilote PostgreSQL (`PrismaPg`).
 * - Se connecte via la variable d'environnement `DATABASE_URL_PG`.
 * - Déclare un jeu de données varié typé avec `Prisma.ProductCreateInput`.
 * - Assure une déconnexion propre (`$disconnect`) à la fin du traitement.
 * 
 * Exécution :
 * `npx prisma db seed` (configuré dans package.json sous prisma.seed).
 */

import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

// 1. Initialisation de l'adaptateur de connexion PostgreSQL Prisma
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL_PG,
});

// 2. Instanciation du client Prisma typé avec l'adaptateur de pilote
const prisma = new PrismaClient({
  adapter,
});

// 3. Définition du catalogue initial de démonstration (12 articles diversifiés)
const productsData: Prisma.ProductCreateInput[] = [
  {
    name: "T-shirt Classique",
    description: "Confectionné en pur coton biologique peigné de 180 g/m², ce t-shirt offre une douceur exceptionnelle et un confort durable tout au long de la journée. Sa coupe moderne et ses finitions renforcées au col garantissent une excellente tenue même après de nombreux lavages. Une pièce intemporelle et polyvalente, idéale pour composer des tenues décontractées ou habillées.",
    price: 15.99,
    image: "https://images.pexels.com/photos/845434/pexels-photo-845434.jpeg",
  },
  {
    name: "Chaussures de Sport",
    description: "Conçues pour allier dynamisme et confort, ces chaussures de sport intègrent une semelle intermédiaire amortissante qui absorbe efficacement chaque impact. L'empeigne en mesh respirant assure une aération continue du pied lors de vos séances d'entraînement intensives ou de vos marches quotidiennes. Leur semelle extérieure antidérapante procure une adhérence optimale sur toutes les surfaces.",
    price: 49.90,
    image: "https://images.pexels.com/photos/2529151/pexels-photo-2529151.jpeg",
  },
  {
    name: "Sac à Dos",
    description: "Idéal pour vos déplacements urbains ou vos excursions en plein air, ce sac à dos robuste dispose d'une capacité généreuse avec compartiment rembourré pour ordinateur portable jusqu'à 15 pouces. Son tissu déperlant haute densité protège efficacement vos effets personnels contre les intempéries et les déchirures. Les bretelles ergonomiques matelassées et le dos ventilé réduisent la fatigue même en charge complète.",
    price: 35.50,
    image: "https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg",
  },
  {
    name: "Montre Digitale 30",
    description: "Équipée d'un boîtier renforcé résistant aux chocs et à l'eau jusqu'à 50 mètres, cette montre digitale allie robustesse sportive et lisibilité parfaite. Elle propose un éventail complet de fonctionnalités utiles incluant chronomètre au 1/100e de seconde, alarme quotidienne et calendrier automatique. Son rétroéclairage électroluminescent assure une consultation de l'heure claire dans l'obscurité totale.",
    price: 30.00,
    image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg",
  },
  {
    name: "Casque Audio",
    description: "Plongez au cœur de votre musique grâce à des transducteurs dynamiques de 40 mm délivrant des basses profondes et des aigus d'une grande clarté. La technologie avancée de réduction active du bruit atténue considérablement les nuisances sonores extérieures pour une immersion acoustique totale. Doté de coussinets à mémoire de forme et d'une autonomie longue durée, il garantit des sessions d'écoute prolongées sans aucune gêne.",
    price: 59.90,
    image: "https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg",
  },
  {
    name: "Lunettes de Soleil",
    description: "Sublimez votre style tout en protégeant vos yeux grâce à ces lunettes de soleil alliant monture acétate légère et design contemporain épuré. Leurs verres polarisés haute définition filtrent 100% des rayons UVA/UVB tout en éliminant les reflets éblouissants pour un confort visuel irréprochable. Livrées avec leur étui rigide et une lingette microfibre pour une protection optimale lors de tous vos déplacements.",
    price: 19.99,
    image: "https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg",
  },
  {
    name: "Lampe de Bureau",
    description: "Cette lampe de bureau moderne à technologie LED offre un éclairage ciblé, homogène et sans scintillement pour préserver vos yeux pendant vos heures de travail ou de lecture. Grâce à son panneau tactile intuitif, vous pouvez ajuster précisément la luminosité et choisir entre plusieurs températures de couleur selon vos besoins. Son bras articulé multi-angles permet d'orienter le faisceau lumineux exactement où vous en avez besoin.",
    price: 22.50,
    image: "https://images.pexels.com/photos/5326053/pexels-photo-5326053.jpeg",
  },
  {
    name: "Bouteille Isotherme",
    description: "Fabriquée en acier inoxydable de qualité alimentaire sans BPA, cette bouteille isotherme double paroi sous vide maintient vos boissons fraîches jusqu'à 24h et chaudes pendant 12h. Son bouchon à joint hermétique garantit une étanchéité parfaite pour un transport serein dans votre sac ou lors de vos séances sportives. Sa finition thermolaquée anti-rayures offre une prise en main agréable et durable sans risque de condensation extérieure.",
    price: 14.90,
    image: "https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg",
  },
  {
    name: "Clavier Mécanique",
    description: "Développé pour les passionnés de gaming et les rédacteurs exigeants, ce clavier mécanique est doté de switches réactifs offrant une frappe précise et un retour tactile agréable. Son châssis en aluminium brossé assure une stabilité irréprochable sur votre bureau, tandis que le rétroéclairage RGB personnalisable sublime votre espace de travail. Il intègre la technologie anti-ghosting complète (N-Key Rollover) pour enregistrer chaque frappe sans aucune latence.",
    price: 69.99,
    image: "https://images.pexels.com/photos/210647/pexels-photo-210647.jpeg",
  },
  {
    name: "Souris Sans Fil",
    description: "Offrant une prise en main naturelle et ergonomique qui réduit la fatigue du poignet, cette souris sans fil garantit une navigation fluide et silencieuse au quotidien. Son capteur optique haute précision réglable jusqu'à 2400 DPI s'adapte à tous vos types de tâches, de la bureautique minutieuse au graphisme. Grâce à sa connectivité 2,4 GHz stable et sa gestion intelligente de l'énergie, elle assure des mois d'utilisation continue sans interruption.",
    price: 24.90,
    image: "https://images.pexels.com/photos/7848996/pexels-photo-7848996.jpeg",
  },
  {
    name: "Enceinte Bluetooth Portable",
    description: "Conçue pour délivrer un son surround puissant à 360 degrés, cette enceinte portable sans fil intègre des basses profondes et des aigus équilibrés. Sa certification d'étanchéité IPX7 vous permet de l'emporter en toute sérénité au bord de la piscine, à la plage ou sous la douche sans craindre les éclaboussures. Grâce à sa batterie haute capacité de 5200 mAh, profitez de plus de 15 heures de lecture musicale ininterrompue en une seule charge.",
    price: 45.00,
    image: "https://images.pexels.com/photos/1706694/pexels-photo-1706694.jpeg",
  },
  {
    name: "Support Ordinateur Ergonomique",
    description: "Fabriqué en alliage d'aluminium anodisé haut de gamme, ce support réglable surélève votre écran à une hauteur visuelle idéale pour soulager les tensions cervicales et dorsales. Sa conception aérée en X favorise une dissipation thermique optimale de votre ordinateur afin de prévenir toute surchauffe lors de tâches intensives. Pliable et ultra-léger, il se glisse aisément dans une sacoche pour vous accompagner dans tous vos espaces de travail.",
    price: 29.90,
    image: "https://images.pexels.com/photos/7974/pexels-photo.jpg",
  },
];

/**
 * Fonction principale d'insertion séquentielle des produits
 */
export async function main() {
  console.log("Démarrage du peuplement de la base de données...");
  for (const p of productsData) {
    await prisma.product.create({ data: p });
  }
  console.log("Seed terminé avec succès !");
}

// 4. Déclenchement de l'exécution avec gestion d'erreur et libération de connexion
main()
  .catch((e) => {
    console.error("Erreur lors de l'exécution du seed :", e);
    process.exit(1);
  })
  .finally(async () => {
    // Déconnexion systématique du client pour éviter les connexions pendantes
    await prisma.$disconnect();
  });

import { PrismaClient } from '@/app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

// on configure dotenv pour charger les variables d'environnement .env.local
import { config } from "dotenv"; // Load environment variables from .env file
config({ path: ".env.local" }); // Load environment variables from .env.local file

// on crée une instance de PrismaClient avec l'adapter
const globalForPrisma = global as unknown as {
    prisma: PrismaClient
}

// on crée l'adapter
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL_PG,
})

// on crée une instance de PrismaClient avec l'adapter
const prisma = globalForPrisma.prisma || new PrismaClient({
  adapter,
})

// on stocke l'instance de PrismaClient dans la variable globalForPrisma
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
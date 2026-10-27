import { PrismaClient } from '@/app/generated/prisma-mysql/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

// on configure dotenv pour charger les variables d'environnement .env.local
import { config } from "dotenv"; // Load environment variables from .env file
config({ path: ".env.local" }); // Load environment variables from .env.local file

// on crée une instance de PrismaClient avec l'adapter
const globalForPrisma = global as unknown as {
    prismaMysql: PrismaClient
}

// on crée l'adapter MariaDB / MySQL
const adapter = new PrismaMariaDb(process.env.DATABASE_URL_MYSQL || {
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'nextmysql',
  port: Number(process.env.MYSQL_PORT) || 3306,
})

// on crée une instance de PrismaClient avec l'adapter
const prismaMysql = globalForPrisma.prismaMysql || new PrismaClient({
  adapter,
})

// on stocke l'instance de PrismaClient dans la variable globalForPrisma
if (process.env.NODE_ENV !== 'production') globalForPrisma.prismaMysql = prismaMysql

export default prismaMysql

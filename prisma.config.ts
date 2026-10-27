// on configure dotenv pour charger les variables d'environnement .env.local et non pas .env
import { config } from "dotenv"; // Load environment variables from .env file
config({ path: ".env.local" }); // Load environment variables from .env.local file

import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: `tsx prisma/seed.ts`,
  },
  datasource: {
    url: env("DATABASE_URL_PG"),
  },
});

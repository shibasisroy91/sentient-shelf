import { config } from "dotenv"; // Required to read your .env.local file
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
  schema: "./src/db/schema.ts", // Point to where your schema lives
  out: "./drizzle", // Where migration files will be generated
  dialect: "postgresql", // We are using PostgreSQL
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Your Supabase connection string
  },
});

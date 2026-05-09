import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  vector,
} from "drizzle-orm/pg-core";

// Define our progress status options
export const statusEnum = pgEnum("reading_status", [
  "to_read",
  "reading",
  "finished",
]);

//Users Table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

//Materials Table (Global Library)
export const materials = pgTable("materials", {
  id: serial("id").primaryKey(),
  externalId: text("external_id").unique(), // Open library id
  title: text("title").notNull(),
  author: text("author").notNull(),
  summary: text("summary"),
  type: text("type").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

//UserMaterials Table (Personal Vault)
export const userMaterials = pgTable("user_materials", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  materialId: integer("material_id")
    .references(() => materials.id)
    .notNull(),
  status: statusEnum("status").default("to_read").notNull(),
  personalNote: text("personal_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Embedding tables (AI intelligence layer)
export const embeddings = pgTable("embeddings", {
  id: serial("id").primaryKey(),
  materialId: integer("material_id")
    .references(() => materials.id)
    .notNull(),
  embedding: vector("embedding", { dimensions: 1536 }), //Store the AI "meaning"
});

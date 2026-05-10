import {
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  vector,
} from "drizzle-orm/pg-core";
import { AdapterAccount } from "@auth/core/adapters";

// Define our progress status options
export const statusEnum = pgEnum("reading_status", [
  "to_read",
  "reading",
  "finished",
]);

//Users Table
export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

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
  userId: text("user_id")
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

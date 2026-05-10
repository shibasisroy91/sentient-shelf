"use server";

import { eq } from "drizzle-orm";
import { db } from "../db";
import { materials, userMaterials } from "../db/schema";
import { BookSearchResult } from "../services/openLibrary";
import { auth } from "../auth";

export const saveBookToVault = async (book: BookSearchResult) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        message: "You must be logged in to save books.",
      };
    }
    const currentUserId = session.user.id;
    const existingBooks = await db
      .select()
      .from(materials)
      .where(eq(materials.externalId, book.key));

    let materialId;
    if (existingBooks.length > 0) {
      materialId = existingBooks[0].id;
    } else {
      const [newBook] = await db
        .insert(materials)
        .values({
          externalId: book.key,
          title: book.title,
          author: book.author_name?.join(", ") || "Unknown Author",
          type: "books",
        })
        .returning();

      materialId = newBook.id;
    }

    await db.insert(userMaterials).values({
      userId: currentUserId,
      materialId: materialId,
      status: "to_read",
    });

    return { success: true, message: "Book secured in vault." };
  } catch (error) {
    console.error("Vault Save Error:", error);
    return { success: false, message: "Failed to save book." };
  }
};

export const getUserVault = async () => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        message: "You must be logged in to save books.",
      };
    }
    const currentUserId = session.user.id;
    const vaultItems = await db
      .select({
        id: userMaterials.id,
        status: userMaterials.status,
        personalNotes: userMaterials.personalNote,
        book: {
          title: materials.title,
          author: materials.author,
          externalId: materials.externalId,
        },
      })
      .from(userMaterials)
      .innerJoin(materials, eq(userMaterials.materialId, materials.id))
      .where(eq(userMaterials.userId, currentUserId));

    return { success: true, data: vaultItems };
  } catch (error) {
    console.error("Failed to fetch vault: ", error);
    return { success: false, data: [] };
  }
};

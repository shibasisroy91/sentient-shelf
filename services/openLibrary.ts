export interface BookSearchResult {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
}

/**
 * Searches the Open Library API for books matching a query.
 * Standardizing this here allows us to reuse it in our search bar,
 * our AI agent, and our library indexing services.
 */

export const searchBooks = async (
  query: string,
): Promise<BookSearchResult[]> => {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch from Open Library");

    const data = await response.json();
    return data.docs.map((book: any) => ({
      key: book.key,
      title: book.title,
      author_name: book.author_name,
      first_publish_year: book.first_publish_year,
      cover_i: book.cover_i,
    }));
  } catch (error) {
    console.error("Search service error", error);
    return [];
  }
};

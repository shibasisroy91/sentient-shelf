"use client";

import BookCard from "@/components/BookCard";
import { BookSearchResult, searchBooks } from "@/services/openLibrary";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BookSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!query) return;

    setIsLoading(true);
    const books = await searchBooks(query);
    console.log(books);
    setResults(books);
    setIsLoading(false);
  };

  return (
    <main className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center">
        Sentient-Shelf
      </h1>

      <form
        onSubmit={handleSearch}
        className="flex gap-4 mb-12 max-w-2xl mx-auto"
      >
        <input
          type="text"
          placeholder="Search for books or research papers..."
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {results.map((book) => (
          <BookCard key={book.key} book={book} />
        ))}
      </div>
    </main>
  );
}

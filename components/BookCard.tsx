import Image from "next/image";
import { BookSearchResult } from "../services/openLibrary";
import { useTransition } from "react";
import { saveBookToVault } from "../actions/library";

const BookCard = ({ book }: { book: BookSearchResult }) => {
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      const result = await saveBookToVault(book);
      if (result.success) {
        alert("Saved to your vault!");
      } else {
        alert("Error saving book");
      }
    });
  };

  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://via.placeholder.com/150x200?text=No+Cover";

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white">
      <Image
        src={coverUrl}
        alt={book.title}
        width={150}
        height={150}
        className="object-cover rounded-md"
      />
      <h3 className="font-bold text-lg line-clamp-2">{book.title}</h3>
      <p className="text-gray-600 text-sm">
        {book.author_name?.join(", ") || "Unknown Author"}
      </p>
      <p className="text-gray-400 text-xs mt-2">
        {book.first_publish_year || "N/A"}
      </p>
      <button
        onClick={handleSave}
        disabled={isPending}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        {isPending ? "Saving..." : "Save to Vault"}
      </button>
    </div>
  );
};

export default BookCard;

import { getUserVault } from "@/actions/library";
import Link from "next/link";

const VaultPage = async () => {
  const response = await getUserVault();
  const books = response.data || [];

  return (
    <main className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">My Vault</h1>
        <Link className="text-blue-600 hover:underline font-medium" href="/">
          Back to search
        </Link>
      </div>

      {books.length === 0 ? (
        <p className="text-gray-500 text-center py-12">Your vault is empty</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-6 shadow-sm bg-white border-l-4 border-l-blue-600"
            >
              <h3 className="font-bold text-xl mb-1">{item.book.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{item.book.author}</p>
              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  {item.status.replace("_", " ")}
                </span>
                <span className="text-xs text-gray-400">
                  {item.book.externalId}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default VaultPage;

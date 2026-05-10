"use client";

import { useEffect } from "react";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error("Critical application error caught:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="bg-red-50 border-l-4 border-red-500 p-8 rounded-lg shadow-sm max-w-lg w-full text-center">
        <h2 className="text-red-800 font-extrabold text-2xl mb-3">
          System Malfunction
        </h2>
        <p className="text-red-600 text-sm mb-8">
          {error.message ||
            "An unexpected error occurred while communicating with the database."}
        </p>
        <button
          onClick={() => reset()}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-md transition-colors w-full"
        >
          Attempt Recovery (Try Again)
        </button>
      </div>
    </div>
  );
};

export default Error;

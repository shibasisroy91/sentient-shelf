import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import AuthButton from "@/components/AuthButton";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sentient-Shelf",
  description: "AI-Powered Research Assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        {/* Global Navigation Bar */}
        <nav className="bg-white border-b px-8 py-4 flex justify-between items-center shadow-sm">
          <Link
            href="/"
            className="text-xl font-bold text-blue-600 tracking-tight"
          >
            Sentient-Shelf
          </Link>
          <div className="flex gap-6 items-center">
            <Link
              href="/vault"
              className="text-sm font-medium text-gray-600 hover:text-black"
            >
              My Vault
            </Link>
            <AuthButton />
          </div>
        </nav>

        {/* Page Content */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

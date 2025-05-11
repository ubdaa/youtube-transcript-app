import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YouTube Transcript App",
  description: "Récupérer la transcription de vidéos YouTube",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <main className="min-h-screen bg-slate-50 dark:bg-slate-900">
          {children}
        </main>
      </body>
    </html>
  );
}
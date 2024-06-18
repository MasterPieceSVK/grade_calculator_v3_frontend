import type { Metadata } from "next";
import { Inter, Play, Roboto } from "next/font/google";
import "./globals.css";
import Provider from "../../utils/Provider";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: "400" });
const play = Play({ subsets: ["latin"], weight: "400" });

export const metadata = {
  manifest: "/manifest.json",
  title: "Flashcards",
  description: "Flashcards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="lemonade">
      <body className={play.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

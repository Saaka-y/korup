import type { Metadata } from "next";
import { Actor } from "next/font/google";
import "./globals.css";

const actor = Actor({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "KORUP",
  description: "App for KORU student management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={actor.className}>
        {children}
      </body>
    </html>
  );
}

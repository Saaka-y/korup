import type { Metadata } from "next";
import { Actor } from "next/font/google";
import ClientLayout  from "@/app/components/ClientLayout";
import "@/app/global.css";

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
    <html lang="ja">
      <body className={actor.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}

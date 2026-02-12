import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meu Portfólio",
  description: "Portfólio de projetos desenvolvido com Next.js e Notion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}

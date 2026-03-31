import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Search d_evs",
  description: "Encontre perfis e repositórios de desenvolvedores no GitHub de forma rápida e elegante.",
  keywords: ["GitHub", "Desenvolvedores", "Repositórios", "Busca", "Portfólio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body suppressHydrationWarning style={{ margin: 0, padding: 0, boxSizing: 'border-box' }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
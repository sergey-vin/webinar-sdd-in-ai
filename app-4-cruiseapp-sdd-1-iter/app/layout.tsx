import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Header } from "@/components/layout/header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { TimezoneNotice } from "@/components/layout/timezone-notice";
import { AppShell } from "@/components/app-shell";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "CruiseApp — Ваш помощник на борту",
  description: "Мобильное приложение для пассажиров круизного лайнера",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#1a365d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background font-sans">
        <AppShell>
          <Header />
          <TimezoneNotice />
          <main className="flex-1 pb-16">{children}</main>
          <BottomNav />
        </AppShell>
      </body>
    </html>
  );
}

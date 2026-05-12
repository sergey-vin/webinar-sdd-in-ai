import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { TabBar } from "@/components/layout/tab-bar";
import { ServiceWorkerRegistrar } from "@/components/sw-registrar";
import { Onboarding } from "@/components/onboarding";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CruiseApp",
  description: "Your cruise companion — schedule, navigation, and cabin booking",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CruiseApp",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B3D5C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink font-sans">
        <main className="flex-1 pb-28">{children}</main>
        <TabBar />
        <Onboarding />
        <ThemeProvider />
        <ServiceWorkerRegistrar />
      </body>
    </html>
  );
}

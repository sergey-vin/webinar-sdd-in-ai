"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/stores/auth-store";
import { Header } from "./header";
import { BottomTabs } from "./bottom-tabs";
import { SWRegister } from "../pwa/sw-register";
import { OfflineIndicator } from "../pwa/offline-indicator";

export function AppShell({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  const initialize = useAuthStore((s) => s.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div className="phone-shell flex flex-col min-h-dvh md:min-h-0 bg-background">
      <SWRegister />
      <OfflineIndicator />
      <Header />
      <main className="flex-1 overflow-y-auto pb-20">{children}</main>
      <BottomTabs locale={locale} />
    </div>
  );
}

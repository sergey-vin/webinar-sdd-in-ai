"use client";

import { useEffect } from "react";
import { usePreferencesStore } from "@/lib/stores/preferences-store";
import { Onboarding } from "@/components/onboarding";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { darkMode } = usePreferencesStore();

  // Apply dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Register service worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // SW registration failed, offline won't work
      });
    }
  }, []);

  return (
    <>
      <Onboarding />
      {children}
    </>
  );
}

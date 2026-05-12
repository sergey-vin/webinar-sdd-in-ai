"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/store/theme-store";

export function ThemeProvider() {
  const { theme } = useThemeStore();

  useEffect(() => {
    const saved = localStorage.getItem("cruiseapp-theme") as "light" | "dark" | "auto" | null;
    if (saved) useThemeStore.getState().setTheme(saved);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem("cruiseapp-theme", theme);

    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "auto") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      root.classList.toggle("dark", mq.matches);
      const handler = (e: MediaQueryListEvent) => root.classList.toggle("dark", e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return null;
}

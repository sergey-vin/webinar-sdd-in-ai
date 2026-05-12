"use client";

import { Moon, Sun } from "lucide-react";
import { usePreferencesStore } from "@/lib/stores/preferences-store";

export function ThemeToggle() {
  const { darkMode, toggleDarkMode } = usePreferencesStore();

  return (
    <button
      onClick={toggleDarkMode}
      className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
      title={darkMode ? "Светлая тема" : "Тёмная тема"}
    >
      {darkMode ? (
        <Sun className="w-4 h-4 text-gold" />
      ) : (
        <Moon className="w-4 h-4 text-gold-light" />
      )}
    </button>
  );
}

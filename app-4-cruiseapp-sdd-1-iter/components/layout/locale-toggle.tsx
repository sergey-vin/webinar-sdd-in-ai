"use client";

import { usePreferencesStore } from "@/lib/stores/preferences-store";

export function LocaleToggle() {
  const { locale, setLocale } = usePreferencesStore();

  return (
    <button
      onClick={() => setLocale(locale === "ru" ? "en" : "ru")}
      className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors text-xs font-semibold text-gold-light"
      title={locale === "ru" ? "Switch to English" : "Переключить на русский"}
    >
      {locale === "ru" ? "EN" : "RU"}
    </button>
  );
}

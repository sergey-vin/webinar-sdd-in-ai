"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type Locale = "ru" | "en";

interface PreferencesStore {
  onboardingComplete: boolean;
  homeTimezone: string;
  darkMode: boolean;
  locale: Locale;
  completeOnboarding: (timezone: string) => void;
  toggleDarkMode: () => void;
  setLocale: (locale: Locale) => void;
}

export const usePreferencesStore = create<PreferencesStore>()(
  persist(
    (set) => ({
      onboardingComplete: false,
      homeTimezone: "",
      darkMode: false,
      locale: "ru",
      completeOnboarding: (timezone) =>
        set({ onboardingComplete: true, homeTimezone: timezone }),
      toggleDarkMode: () =>
        set((state) => ({ darkMode: !state.darkMode })),
      setLocale: (locale) => set({ locale }),
    }),
    { name: "cruise-preferences" }
  )
);

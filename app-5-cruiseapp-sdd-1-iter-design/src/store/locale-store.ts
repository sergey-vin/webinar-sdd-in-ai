import { create } from "zustand";
import en from "@/messages/en.json";
import ru from "@/messages/ru.json";

type Locale = "en" | "ru";

type Messages = typeof en;

const messages: Record<Locale, Messages> = { en, ru };

interface LocaleStore {
  locale: Locale;
  t: Messages;
  setLocale: (locale: Locale) => void;
}

export const useLocaleStore = create<LocaleStore>((set) => ({
  locale: "en",
  t: en,
  setLocale: (locale) => set({ locale, t: messages[locale] }),
}));

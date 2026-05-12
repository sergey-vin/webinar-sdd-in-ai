import { create } from "zustand";

interface TimezoneStore {
  shipTime: string;
  homeTime: string;
  shipTimezone: string;
  homeTimezone: string;
  setHomeTimezone: (tz: string) => void;
}

export const useTimezoneStore = create<TimezoneStore>((set) => ({
  shipTime: "14:32",
  homeTime: "13:32",
  shipTimezone: "UTC+3 (EET)",
  homeTimezone: "UTC+2 (CET)",
  setHomeTimezone: (tz) => set({ homeTimezone: tz }),
}));

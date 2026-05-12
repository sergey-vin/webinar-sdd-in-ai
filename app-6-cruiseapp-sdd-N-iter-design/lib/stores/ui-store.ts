"use client";

import { create } from "zustand";

type TimezoneMode = "ship" | "home" | "local";

interface UIState {
  timezoneMode: TimezoneMode;
  setTimezoneMode: (mode: TimezoneMode) => void;
}

export const useUIStore = create<UIState>((set) => ({
  timezoneMode: "ship",
  setTimezoneMode: (mode) => set({ timezoneMode: mode }),
}));

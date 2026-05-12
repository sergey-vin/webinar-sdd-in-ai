"use client";

import { create } from "zustand";

interface TimeStore {
  shipUtcOffset: number;
  homeUtcOffset: number;
  shipTimezone: string;
  homeTimezone: string;
  showTimezoneNotice: boolean;
  setTimezone: (ship: number, home: number) => void;
  dismissNotice: () => void;
}

export const useTimeStore = create<TimeStore>((set) => ({
  shipUtcOffset: 3,
  homeUtcOffset: 3,
  shipTimezone: "Europe/Athens",
  homeTimezone: "Europe/Moscow",
  showTimezoneNotice: true,
  setTimezone: (ship, home) =>
    set({ shipUtcOffset: ship, homeUtcOffset: home, showTimezoneNotice: ship !== home }),
  dismissNotice: () => set({ showTimezoneNotice: false }),
}));

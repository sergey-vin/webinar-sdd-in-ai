"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ScheduleStore {
  myEventIds: string[];
  reminders: Record<string, boolean>;
  addEvent: (id: string) => void;
  removeEvent: (id: string) => void;
  isInMySchedule: (id: string) => boolean;
  toggleReminder: (id: string) => void;
  hasReminder: (id: string) => boolean;
}

export const useScheduleStore = create<ScheduleStore>()(
  persist(
    (set, get) => ({
      myEventIds: [],
      reminders: {},
      addEvent: (id) =>
        set((state) => ({
          myEventIds: [...state.myEventIds, id],
          reminders: { ...state.reminders, [id]: true },
        })),
      removeEvent: (id) =>
        set((state) => {
          const { [id]: _, ...rest } = state.reminders;
          return {
            myEventIds: state.myEventIds.filter((eventId) => eventId !== id),
            reminders: rest,
          };
        }),
      isInMySchedule: (id) => get().myEventIds.includes(id),
      toggleReminder: (id) =>
        set((state) => ({
          reminders: { ...state.reminders, [id]: !state.reminders[id] },
        })),
      hasReminder: (id) => !!get().reminders[id],
    }),
    { name: "cruise-my-schedule" }
  )
);

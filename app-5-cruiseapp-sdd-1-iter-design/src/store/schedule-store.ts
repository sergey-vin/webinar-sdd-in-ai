import { create } from "zustand";

interface ScheduleStore {
  mySchedule: Set<string>;
  toggleEvent: (eventId: string) => void;
  isInMySchedule: (eventId: string) => boolean;
}

export const useScheduleStore = create<ScheduleStore>((set, get) => ({
  mySchedule: new Set<string>(),
  toggleEvent: (eventId) =>
    set((state) => {
      const next = new Set(state.mySchedule);
      if (next.has(eventId)) {
        next.delete(eventId);
      } else {
        next.add(eventId);
      }
      return { mySchedule: next };
    }),
  isInMySchedule: (eventId) => get().mySchedule.has(eventId),
}));

"use client";

import { create } from "zustand";
import type { BookingRequest } from "@/lib/types";

interface BookingStore {
  booking: BookingRequest | null;
  selectCabin: (booking: Omit<BookingRequest, "status" | "guests">) => void;
  setGuests: (guests: number) => void;
  submitBooking: () => void;
  clearBooking: () => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
  booking: null,
  selectCabin: (data) =>
    set({
      booking: { ...data, guests: 2, status: "draft" },
    }),
  setGuests: (guests) =>
    set((state) =>
      state.booking ? { booking: { ...state.booking, guests } } : {}
    ),
  submitBooking: () =>
    set((state) =>
      state.booking
        ? { booking: { ...state.booking, status: "submitted" } }
        : {}
    ),
  clearBooking: () => set({ booking: null }),
}));

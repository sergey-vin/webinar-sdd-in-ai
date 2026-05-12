import { create } from "zustand";
import type { Cabin } from "@/lib/types";

interface BookingStore {
  selectedCabin: Cabin | null;
  isRequested: boolean;
  selectCabin: (cabin: Cabin) => void;
  clearSelection: () => void;
  submitRequest: () => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
  selectedCabin: null,
  isRequested: false,
  selectCabin: (cabin) => set({ selectedCabin: cabin, isRequested: false }),
  clearSelection: () => set({ selectedCabin: null, isRequested: false }),
  submitRequest: () => set({ isRequested: true }),
}));

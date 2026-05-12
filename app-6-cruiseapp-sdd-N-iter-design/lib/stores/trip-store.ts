"use client";

import { create } from "zustand";
import type { Trip, TripLegWithDetails } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";

interface TripState {
  trip: Trip | null;
  legs: TripLegWithDetails[];
  loading: boolean;
  fetchActiveTrip: (userId: string) => Promise<void>;
  clear: () => void;
}

export const useTripStore = create<TripState>((set) => ({
  trip: null,
  legs: [],
  loading: false,

  fetchActiveTrip: async (userId: string) => {
    set({ loading: true });
    const supabase = createClient();

    // Get active or upcoming trip
    const { data: trip } = await supabase
      .from("trips")
      .select("*")
      .eq("user_id", userId)
      .in("status", ["active", "upcoming"])
      .order("start_date", { ascending: true })
      .limit(1)
      .single();

    if (!trip) {
      set({ trip: null, legs: [], loading: false });
      return;
    }

    // Get legs with joined route, carrier, origin, destination, vessel
    const { data: legsRaw } = await supabase
      .from("trip_legs")
      .select(
        `
        *,
        route:routes (
          *,
          carrier:carriers (*),
          origin:locations!routes_origin_id_fkey (*),
          destination:locations!routes_destination_id_fkey (*),
          vessel:vessels (*)
        )
      `,
      )
      .eq("trip_id", trip.id)
      .order("leg_order", { ascending: true });

    set({
      trip: trip as Trip,
      legs: (legsRaw as unknown as TripLegWithDetails[]) ?? [],
      loading: false,
    });
  },

  clear: () => set({ trip: null, legs: [] }),
}));

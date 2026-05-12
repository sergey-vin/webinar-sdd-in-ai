"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { DaySelector } from "@/components/schedule/day-selector";
import { CategoryFilter } from "@/components/schedule/category-filter";
import { EventList } from "@/components/schedule/event-list";
import { CalendarDays } from "lucide-react";
import type { Database } from "@/lib/supabase/types";

type Event = Database["public"]["Tables"]["events"]["Row"];
type Cruise = Database["public"]["Tables"]["cruises"]["Row"];

export default function SchedulePage() {
  const [cruise, setCruise] = useState<Cruise | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const supabase = createClient();

  // Load cruise - check user booking first, fallback to first cruise
  useEffect(() => {
    async function loadCruise() {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id ?? null);

      let cruiseData: Cruise | null = null;

      if (user) {
        const { data: booking } = await supabase
          .from("bookings")
          .select("cruise_id")
          .eq("user_id", user.id)
          .eq("status", "confirmed")
          .limit(1)
          .single();

        if (booking) {
          const { data } = await supabase
            .from("cruises")
            .select("*")
            .eq("id", booking.cruise_id)
            .single();
          cruiseData = data;
        }
      }

      // Demo mode: use first cruise
      if (!cruiseData) {
        const { data } = await supabase
          .from("cruises")
          .select("*")
          .order("departure_date", { ascending: true })
          .limit(1)
          .single();
        cruiseData = data;
      }

      setCruise(cruiseData);
      setLoading(false);
    }
    loadCruise();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Load events when cruise or day changes
  useEffect(() => {
    if (!cruise) return;

    async function loadEvents() {
      const { data } = await supabase
        .from("events")
        .select("*")
        .eq("cruise_id", cruise!.id)
        .eq("day_number", selectedDay)
        .order("start_time", { ascending: true });

      setEvents(data || []);
    }
    loadEvents();
  }, [cruise, selectedDay]); // eslint-disable-line react-hooks/exhaustive-deps

  // Load favorites
  useEffect(() => {
    if (!userId || !cruise) return;

    async function loadFavorites() {
      const { data } = await supabase
        .from("user_event_favorites")
        .select("event_id")
        .eq("user_id", userId!);

      if (data) {
        setFavorites(new Set(data.map((f) => f.event_id)));
      }
    }
    loadFavorites();
  }, [userId, cruise]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleToggleFavorite = useCallback(
    async (eventId: string) => {
      if (!userId) return;

      const isFav = favorites.has(eventId);
      const next = new Set(favorites);

      if (isFav) {
        next.delete(eventId);
        setFavorites(next);
        await supabase
          .from("user_event_favorites")
          .delete()
          .eq("user_id", userId)
          .eq("event_id", eventId);
      } else {
        next.add(eventId);
        setFavorites(next);
        await supabase.from("user_event_favorites").insert({
          user_id: userId,
          event_id: eventId,
        });
      }
    },
    [userId, favorites, supabase]
  );

  const filteredEvents = selectedCategory
    ? events.filter((e) => e.category === selectedCategory)
    : events;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading schedule...</div>
      </div>
    );
  }

  if (!cruise) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center text-muted-foreground">
          <CalendarDays className="size-12 mx-auto mb-4 opacity-50" />
          <p>No cruises available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        <div>
          <h1 className="text-2xl font-bold">Schedule</h1>
          <p className="text-sm text-muted-foreground">{cruise.name}</p>
        </div>

        <DaySelector
          totalDays={cruise.duration_nights + 1}
          selectedDay={selectedDay}
          onDayChange={setSelectedDay}
          departureDate={cruise.departure_date}
        />

        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <EventList
          events={filteredEvents}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      </div>
    </div>
  );
}

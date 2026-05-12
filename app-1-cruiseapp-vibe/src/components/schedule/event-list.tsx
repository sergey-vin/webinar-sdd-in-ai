"use client";

import { EventCard } from "./event-card";
import type { Database } from "@/lib/supabase/types";

type Event = Database["public"]["Tables"]["events"]["Row"];

interface EventListProps {
  events: Event[];
  favorites: Set<string>;
  onToggleFavorite: (eventId: string) => void;
}

function getTimePeriod(startTime: string): "morning" | "afternoon" | "evening" {
  const hour = parseInt(startTime.split(":")[0], 10);
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}

const PERIOD_LABELS: Record<string, string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
};

export function EventList({ events, favorites, onToggleFavorite }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No events scheduled for this day.</p>
      </div>
    );
  }

  // Sort events by start_time
  const sorted = [...events].sort((a, b) =>
    a.start_time.localeCompare(b.start_time)
  );

  // Group by time period
  const groups: Record<string, Event[]> = {};
  for (const event of sorted) {
    const period = getTimePeriod(event.start_time);
    if (!groups[period]) groups[period] = [];
    groups[period].push(event);
  }

  const periods = ["morning", "afternoon", "evening"] as const;

  return (
    <div className="space-y-6">
      {periods.map((period) => {
        const periodEvents = groups[period];
        if (!periodEvents || periodEvents.length === 0) return null;
        return (
          <div key={period} className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              {PERIOD_LABELS[period]}
            </h3>
            <div className="space-y-2">
              {periodEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isFavorited={favorites.has(event.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

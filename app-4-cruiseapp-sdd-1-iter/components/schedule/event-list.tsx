"use client";

import { useState, useEffect } from "react";
import type { CruiseEvent, EventCategory } from "@/lib/types";
import { CategoryFilter } from "./category-filter";
import { EventCard } from "./event-card";
import { useT } from "@/lib/i18n";

interface EventListProps {
  day: "today" | "tomorrow";
}

export function EventList({ day }: EventListProps) {
  const [events, setEvents] = useState<CruiseEvent[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | "all">("all");
  const t = useT();

  useEffect(() => {
    fetch("/data/events.json")
      .then((res) => res.json())
      .then((data: CruiseEvent[]) => setEvents(data));
  }, []);

  const filtered = events
    .filter((e) => e.day === day)
    .filter((e) => selectedCategory === "all" || e.category === selectedCategory)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <div className="space-y-4">
      <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground text-sm py-8">
            {t("schedule.noEvents")}
          </p>
        ) : (
          filtered.map((event) => <EventCard key={event.id} event={event} />)
        )}
      </div>
    </div>
  );
}

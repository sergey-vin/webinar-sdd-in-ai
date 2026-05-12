"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { CategoryFilters } from "@/components/schedule/category-filters";
import { EventCard } from "@/components/schedule/event-card";
import { useScheduleStore } from "@/store/schedule-store";
import type { Event, EventCategory } from "@/lib/types";
import { CalendarCheck } from "lucide-react";

import eventsData from "../../../public/data/events.json";

const events = eventsData as Event[];

export default function SchedulePage() {
  const [category, setCategory] = useState<EventCategory | "all">("all");
  const { mySchedule } = useScheduleStore();

  const filtered =
    category === "all"
      ? events
      : events.filter((e) => e.category === category);

  return (
    <div>
      <Header title="Schedule" subtitle="Today · Ship time" />

      {/* My Schedule link */}
      {mySchedule.size > 0 && (
        <div className="mb-3 px-5">
          <Link
            href="/schedule/my"
            className="flex items-center justify-between rounded-radius-md border border-brand/20 bg-brand-soft/30 p-3"
          >
            <div className="flex items-center gap-2">
              <CalendarCheck className="h-4 w-4 text-brand" />
              <span className="text-sm font-medium text-brand">My Schedule</span>
            </div>
            <span className="text-xs font-semibold text-brand">
              {mySchedule.size} event{mySchedule.size !== 1 ? "s" : ""}
            </span>
          </Link>
        </div>
      )}

      <div className="mb-4">
        <CategoryFilters selected={category} onSelect={setCategory} />
      </div>

      <div className="px-5">
        {filtered.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}

        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-ink-4">
            No events in this category today.
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { Header } from "@/components/layout/header";
import { EventCard } from "@/components/schedule/event-card";
import { useScheduleStore } from "@/store/schedule-store";
import type { Event } from "@/lib/types";
import { CalendarDays, ArrowLeft } from "lucide-react";
import Link from "next/link";

import eventsData from "../../../../public/data/events.json";

const allEvents = eventsData as Event[];

export default function MySchedulePage() {
  const { mySchedule } = useScheduleStore();
  const myEvents = allEvents.filter((e) => mySchedule.has(e.id));

  return (
    <div>
      <Header title="My Schedule" subtitle="Your personal events" />

      <div className="px-5">
        <Link
          href="/schedule"
          className="mb-4 flex items-center gap-1.5 text-sm font-medium text-ink-3"
        >
          <ArrowLeft className="h-4 w-4" />
          All events
        </Link>

        {myEvents.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-sunk text-ink-4">
              <CalendarDays className="h-8 w-8" />
            </div>
            <h2 className="font-display text-xl">No events yet</h2>
            <p className="text-sm text-ink-3">
              Go to the{" "}
              <Link href="/schedule" className="font-medium text-brand underline">
                schedule
              </Link>{" "}
              and tap + to add events to your personal list.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-4">
              {myEvents.length} event{myEvents.length !== 1 ? "s" : ""} today
            </div>
            {myEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

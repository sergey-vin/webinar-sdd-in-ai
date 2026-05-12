"use client";

import { Clock } from "lucide-react";
import { TimelineCard } from "./timeline-card";
import { SavedEventPreview } from "./saved-event-preview";
import { tzShortLabel } from "@/lib/time";
import { useUIStore } from "@/lib/stores/ui-store";
import { useAuthStore } from "@/lib/stores/auth-store";
import type { TripLegWithDetails, EventItem } from "@/lib/types";

export function Timeline({
  legs,
  locale,
  savedEvents,
}: {
  legs: TripLegWithDetails[];
  locale: string;
  savedEvents?: EventItem[];
}) {
  const timezoneMode = useUIStore((s) => s.timezoneMode);
  const { profile } = useAuthStore();

  const homeTz = profile?.home_timezone ?? "Europe/Moscow";
  const currentLeg = legs.find(
    (l) => l.status === "in_transit" || l.status === "boarding",
  );
  const shipTz = currentLeg?.route.origin.timezone ?? homeTz;
  const tz =
    timezoneMode === "ship"
      ? shipTz
      : timezoneMode === "home"
        ? homeTz
        : Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Group saved events by leg (events during that leg's timeframe)
  function getEventsForLeg(leg: TripLegWithDetails): EventItem[] {
    if (!savedEvents || savedEvents.length === 0) return [];
    return savedEvents.filter((e) => {
      const eventStart = new Date(e.start_time).getTime();
      const legDep = new Date(leg.departure_time).getTime();
      const legArr = new Date(leg.arrival_time).getTime();
      return eventStart >= legDep && eventStart <= legArr;
    });
  }

  return (
    <div data-testid="trip-timeline" className="relative space-y-3 px-4 py-4">
      {/* Vertical spine */}
      <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-brand/10" />

      {legs.map((leg, i) => {
        const isActive = leg.status === "in_transit" || leg.status === "boarding";
        const legEvents = getEventsForLeg(leg);

        // Check if timezone changes from previous leg's destination
        const prevLeg = i > 0 ? legs[i - 1] : null;
        const prevDestTz = prevLeg?.route.destination.timezone;
        const currentOriginTz = leg.route.origin.timezone;
        const tzChanged = prevDestTz && prevDestTz !== currentOriginTz;

        return (
          <div key={leg.id}>
            {/* TZ change indicator between legs */}
            {tzChanged && (
              <div className="relative pl-6 mb-2">
                <div className="flex items-center gap-2 ml-1 px-3 py-1.5 rounded-full bg-warn/10 text-warn text-[11px] font-medium w-fit">
                  <Clock className="w-3 h-3" />
                  <span>
                    {tzShortLabel(leg.departure_time, prevDestTz!)} →{" "}
                    {tzShortLabel(leg.departure_time, currentOriginTz)}
                  </span>
                </div>
              </div>
            )}

            <div className="relative pl-6">
              {/* Timeline dot */}
              <div
                className={`absolute left-0 top-6 w-3 h-3 rounded-full border-2 z-10 ${
                  isActive
                    ? "bg-brand border-brand animate-pulse-dot"
                    : leg.status === "arrived"
                      ? "bg-good border-good"
                      : "bg-surface border-ink-5"
                }`}
              />
              <TimelineCard leg={leg} locale={locale} />
            </div>

            {/* Saved events during this leg */}
            {legEvents.length > 0 && (
              <div className="ml-2 mt-1">
                {legEvents.map((event) => (
                  <SavedEventPreview
                    key={event.id}
                    event={event}
                    locale={locale}
                    tz={tz}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

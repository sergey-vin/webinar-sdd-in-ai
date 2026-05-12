"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Bell, BellOff, X, MapPin } from "lucide-react";
import { formatInZone, tzShortLabel } from "@/lib/time";
import { useUIStore } from "@/lib/stores/ui-store";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useTripStore } from "@/lib/stores/trip-store";
import { createClient } from "@/lib/supabase/client";
import type { EventItem, Venue } from "@/lib/types";
import { DateTime } from "luxon";

export function VenueEventsCard({
  venue,
  vesselId,
  locale,
  onClose,
}: {
  venue: Venue;
  vesselId: string;
  locale: string;
  onClose: () => void;
}) {
  const t = useTranslations("trip");
  const tCat = useTranslations("categories");
  const { profile } = useAuthStore();
  const timezoneMode = useUIStore((s) => s.timezoneMode);
  const legs = useTripStore((s) => s.legs);

  const [events, setEvents] = useState<EventItem[]>([]);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const currentLeg = legs.find(
    (l) => l.status === "in_transit" || l.status === "boarding",
  );
  const shipTz = currentLeg?.route.origin.timezone ?? "Europe/Helsinki";
  const homeTz = profile?.home_timezone ?? "Europe/Moscow";
  const tz =
    timezoneMode === "ship"
      ? shipTz
      : timezoneMode === "home"
        ? homeTz
        : Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data } = await supabase
        .from("events")
        .select("*")
        .eq("venue_id", venue.id)
        .order("start_time", { ascending: true });

      setEvents((data as EventItem[]) ?? []);

      if (profile) {
        const { data: saved } = await supabase
          .from("user_events")
          .select("event_id")
          .eq("user_id", profile.id);
        setSavedIds(new Set((saved ?? []).map((s) => s.event_id)));
      }
      setLoading(false);
    }
    load();
  }, [venue.id, profile]);

  async function toggleSave(eventId: string) {
    if (!profile) return;
    const supabase = createClient();
    const isSaved = savedIds.has(eventId);

    if (isSaved) {
      await supabase
        .from("user_events")
        .delete()
        .eq("user_id", profile.id)
        .eq("event_id", eventId);
      setSavedIds((prev) => {
        const next = new Set(prev);
        next.delete(eventId);
        return next;
      });
    } else {
      await supabase
        .from("user_events")
        .insert({ user_id: profile.id, event_id: eventId });
      setSavedIds((prev) => new Set(prev).add(eventId));
    }
  }

  const venueName = locale === "ru" ? venue.name_ru : venue.name_en;

  return (
    <Card
      data-testid="venue-events-card"
      className="p-3 space-y-2 border-l-4"
      style={{
        borderLeftColor:
          venue.category === "restaurant"
            ? "#E8623A"
            : venue.category === "bar"
              ? "#9333EA"
              : "#0B3D5C",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-ink-3" />
          <h3 className="font-semibold text-sm text-ink">{venueName}</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-surface-sunk"
        >
          <X className="w-4 h-4 text-ink-4" />
        </button>
      </div>

      {loading ? (
        <div className="animate-pulse h-12 bg-surface-sunk rounded" />
      ) : events.length === 0 ? (
        <p className="text-xs text-ink-3 py-2">{t("noEventsAtVenue")}</p>
      ) : (
        <div className="space-y-1">
          {events.map((event) => {
            const title =
              locale === "ru" ? event.title_ru : event.title_en;
            const startTime = formatInZone(event.start_time, tz, "HH:mm");
            const endTime = formatInZone(event.end_time, tz, "HH:mm");
            const tzLabel = tzShortLabel(event.start_time, tz);
            const isSaved = savedIds.has(event.id);

            // Countdown
            const nowDt = DateTime.now();
            const startDt = DateTime.fromISO(event.start_time, {
              zone: "utc",
            });
            const endDt = DateTime.fromISO(event.end_time, {
              zone: "utc",
            });
            const diff = startDt.diff(nowDt, ["hours", "minutes"]);
            const diffMs = diff.toMillis();
            let startsIn = "";
            let isExpired = false;
            if (diffMs > 0 && diffMs < 24 * 60 * 60 * 1000) {
              const h = Math.floor(diff.hours);
              const m = Math.floor(diff.minutes);
              startsIn = h > 0 ? `in ${h}h ${m}m` : `in ${m}m`;
            } else if (diffMs <= 0 && nowDt < endDt) {
              startsIn = "now";
            } else if (nowDt >= endDt) {
              isExpired = true;
            }

            return (
              <div
                key={event.id}
                className={`flex items-start gap-2 py-2 border-t border-surface-sunk first:border-t-0${isExpired ? " opacity-50" : ""}`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-xs font-bold ${isExpired ? "text-ink-3 line-through" : "text-brand"}`}>
                      {startTime}–{endTime}
                    </span>
                    <span className="text-[9px] text-ink-4 font-mono">
                      {tzLabel}
                    </span>
                    {startsIn && (
                      <span className={`text-[10px] font-medium ${startsIn === "now" ? "text-accent" : "text-brand"}`}>
                        {startsIn}
                      </span>
                    )}
                    {isExpired && (
                      <span className="text-[10px] font-medium text-ink-4">
                        expired
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-ink mt-0.5 truncate">
                    {title}
                  </div>
                </div>
                <button
                  onClick={() => toggleSave(event.id)}
                  className="p-1 rounded-md hover:bg-surface-sunk shrink-0"
                >
                  {isSaved ? (
                    <Bell className="w-4 h-4 text-accent" />
                  ) : (
                    <BellOff className="w-4 h-4 text-ink-4" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}

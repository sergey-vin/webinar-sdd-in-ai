"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Music,
  Utensils,
  Anchor,
  Dumbbell,
  Sparkles,
  Baby,
  Theater,
  Tag,
  Clock,
  Bell,
  BellOff,
  MapPin,
} from "lucide-react";
import { formatInZone, tzShortLabel } from "@/lib/time";
import { DateTime } from "luxon";
import { useUIStore } from "@/lib/stores/ui-store";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useTripStore } from "@/lib/stores/trip-store";
import { createClient } from "@/lib/supabase/client";
import type { EventItem, EventCategory } from "@/lib/types";

const categoryIcons: Record<EventCategory, typeof Music> = {
  show: Theater,
  dining: Utensils,
  excursion: Anchor,
  sport: Dumbbell,
  wellness: Sparkles,
  kids: Baby,
  music: Music,
  other: Tag,
};

const categoryColors: Record<EventCategory, string> = {
  show: "bg-purple-100 text-purple-700",
  dining: "bg-amber-100 text-amber-700",
  excursion: "bg-emerald-100 text-emerald-700",
  sport: "bg-blue-100 text-blue-700",
  wellness: "bg-pink-100 text-pink-700",
  kids: "bg-orange-100 text-orange-700",
  music: "bg-indigo-100 text-indigo-700",
  other: "bg-gray-100 text-gray-700",
};

const ALL_CATEGORIES: EventCategory[] = [
  "show",
  "dining",
  "music",
  "wellness",
  "sport",
  "kids",
  "excursion",
  "other",
];

export function Schedule() {
  const t = useTranslations("schedule");
  const tCat = useTranslations("categories");
  const locale = useLocale();
  const { timezoneMode, setTimezoneMode } = useUIStore();
  const { user, profile } = useAuthStore();
  const { legs, fetchActiveTrip } = useTripStore();

  const [events, setEvents] = useState<EventItem[]>([]);
  const [savedEventIds, setSavedEventIds] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<
    EventCategory | "all"
  >("all");
  const [loading, setLoading] = useState(true);

  // Ensure trip data is loaded (handles direct navigation to /schedule)
  useEffect(() => {
    if (user && legs.length === 0) {
      fetchActiveTrip(user.id);
    }
  }, [user, legs.length, fetchActiveTrip]);

  // Find the in_transit or boarding leg to get the vessel
  const currentLeg = legs.find(
    (l) => l.status === "in_transit" || l.status === "boarding",
  );
  const vesselId = currentLeg?.route.vessel?.id;
  // Ship timezone = origin timezone of current leg
  const shipTz =
    currentLeg?.route.origin.timezone ?? "Europe/Helsinki";
  const homeTz = profile?.home_timezone ?? "Europe/Moscow";

  useEffect(() => {
    async function load() {
      if (!vesselId) {
        // Don't stop loading if legs haven't been fetched yet
        if (legs.length > 0) setLoading(false);
        return;
      }
      const supabase = createClient();

      const { data } = await supabase
        .from("events")
        .select("*, venue:venues(name_en, name_ru, deck:decks(deck_number, name_en, name_ru))")
        .eq("vessel_id", vesselId)
        .order("start_time", { ascending: true });

      setEvents((data as EventItem[]) ?? []);

      if (profile) {
        const { data: saved } = await supabase
          .from("user_events")
          .select("event_id")
          .eq("user_id", profile.id);

        setSavedEventIds(
          new Set((saved ?? []).map((s) => s.event_id)),
        );
      }

      setLoading(false);
    }
    load();
  }, [vesselId, profile, legs.length]);

  function getTimezone(): string {
    if (timezoneMode === "ship") return shipTz;
    if (timezoneMode === "home") return homeTz;
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  const tz = getTimezone();

  const filtered =
    activeCategory === "all"
      ? events
      : events.filter((e) => e.category === activeCategory);

  async function toggleSave(eventId: string) {
    if (!profile) return;
    const supabase = createClient();
    const isSaved = savedEventIds.has(eventId);

    if (isSaved) {
      await supabase
        .from("user_events")
        .delete()
        .eq("user_id", profile.id)
        .eq("event_id", eventId);
      setSavedEventIds((prev) => {
        const next = new Set(prev);
        next.delete(eventId);
        return next;
      });
    } else {
      await supabase
        .from("user_events")
        .insert({ user_id: profile.id, event_id: eventId });
      setSavedEventIds((prev) => new Set(prev).add(eventId));
    }
  }

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-3">
          <div className="h-8 bg-surface-sunk rounded w-1/3" />
          <div className="h-10 bg-surface-sunk rounded" />
          <div className="h-24 bg-surface-sunk rounded" />
          <div className="h-24 bg-surface-sunk rounded" />
        </div>
      </div>
    );
  }

  return (
    <div data-testid="schedule-page" className="p-4 space-y-4">
      <h1 className="font-display text-2xl text-ink">{t("title")}</h1>

      {/* Timezone toggle */}
      <div
        data-testid="tz-toggle"
        className="flex gap-1 bg-surface-sunk rounded-lg p-1"
      >
        {(["ship", "home", "local"] as const).map((mode) => (
          <button
            key={mode}
            data-testid={`tz-${mode}`}
            onClick={() => setTimezoneMode(mode)}
            className={`flex-1 flex items-center justify-center gap-1 text-xs py-2 rounded-md transition-colors ${
              timezoneMode === mode
                ? "bg-white text-ink font-semibold shadow-sm"
                : "text-ink-4"
            }`}
          >
            <Clock className="w-3 h-3" />
            {t(`${mode}Time`)}
          </button>
        ))}
      </div>

      {/* Category chips */}
      <div
        data-testid="category-chips"
        className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide"
      >
        <button
          data-testid="chip-all"
          onClick={() => setActiveCategory("all")}
          className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            activeCategory === "all"
              ? "bg-brand text-white"
              : "bg-surface-sunk text-ink-3"
          }`}
        >
          {t("allCategories")}
        </button>
        {ALL_CATEGORIES.map((cat) => {
          const Icon = categoryIcons[cat];
          return (
            <button
              key={cat}
              data-testid={`chip-${cat}`}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-brand text-white"
                  : "bg-surface-sunk text-ink-3"
              }`}
            >
              <Icon className="w-3 h-3" />
              {tCat(cat)}
            </button>
          );
        })}
      </div>

      {/* Events list */}
      {filtered.length === 0 ? (
        <p className="text-sm text-ink-3 text-center py-8">
          {t("noEvents")}
        </p>
      ) : (
        <div className="space-y-3" data-testid="events-list">
          {filtered.map((event) => {
            const Icon = categoryIcons[event.category];
            const isSaved = savedEventIds.has(event.id);
            const title =
              locale === "ru" ? event.title_ru : event.title_en;
            const desc =
              locale === "ru"
                ? event.description_ru
                : event.description_en;
            const startTime = formatInZone(event.start_time, tz, "HH:mm");
            const endTime = formatInZone(event.end_time, tz, "HH:mm");
            const isSameTime = event.start_time === event.end_time;
            const tzLabel = tzShortLabel(event.start_time, tz);

            // "in X h Y m" countdown
            const nowDt = DateTime.now();
            const startDt = DateTime.fromISO(event.start_time, { zone: "utc" });
            const endDt = DateTime.fromISO(event.end_time, { zone: "utc" });
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
              <Card
                key={event.id}
                data-testid={`event-card-${event.id}`}
                className={`p-3 flex gap-3${isExpired ? " opacity-50" : ""}`}
              >
                {/* Time column */}
                <div className="flex flex-col items-start min-w-[64px]">
                  <span className={`font-mono text-sm font-bold ${isExpired ? "text-ink-3 line-through" : "text-ink"}`}>
                    {startTime}{!isSameTime && `–${endTime}`}
                  </span>
                  <span className="font-mono text-[9px] text-ink-4">
                    {tzLabel}
                  </span>
                  {startsIn && (
                    <span className={`text-[10px] font-medium mt-0.5 ${startsIn === "now" ? "text-accent" : "text-brand"}`}>
                      {startsIn}
                    </span>
                  )}
                  {isExpired && (
                    <span className="text-[10px] font-medium mt-0.5 text-ink-4">
                      expired
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-ink leading-tight">
                        {title}
                      </div>
                      {desc && (
                        <p className="text-xs text-ink-3 mt-0.5 line-clamp-2">
                          {desc}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => toggleSave(event.id)}
                      data-testid={`save-event-${event.id}`}
                      className="p-1 rounded-md hover:bg-surface-sunk"
                    >
                      {isSaved ? (
                        <Bell className="w-4 h-4 text-accent" />
                      ) : (
                        <BellOff className="w-4 h-4 text-ink-4" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <Badge
                      className={`text-[10px] ${categoryColors[event.category]}`}
                    >
                      <Icon className="w-3 h-3 mr-1" />
                      {tCat(event.category)}
                    </Badge>
                    {event.venue && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-ink-4">
                        <MapPin className="w-3 h-3" />
                        {locale === "ru" ? event.venue.name_ru : event.venue.name_en}
                        {event.venue.deck && (
                          <span>
                            &middot; Deck {event.venue.deck.deck_number}
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

"use client";

import { Card } from "@/components/ui/card";
import {
  Music,
  Utensils,
  Anchor,
  Dumbbell,
  Sparkles,
  Baby,
  Theater,
  Tag,
  MapPin,
} from "lucide-react";
import { formatInZone, tzShortLabel } from "@/lib/time";
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

export function SavedEventPreview({
  event,
  locale,
  tz,
}: {
  event: EventItem;
  locale: string;
  tz: string;
}) {
  const Icon = categoryIcons[event.category];
  const title = locale === "ru" ? event.title_ru : event.title_en;
  const startTime = formatInZone(event.start_time, tz, "HH:mm");
  const endTime = formatInZone(event.end_time, tz, "HH:mm");
  const tzLabel = tzShortLabel(event.start_time, tz);

  const venueName = event.venue
    ? locale === "ru"
      ? event.venue.name_ru
      : event.venue.name_en
    : null;
  const deckNum = event.venue?.deck?.deck_number;

  return (
    <div className="relative pl-6 my-1.5" data-testid="saved-event-preview">
      {/* Timeline dot (smaller, accent) */}
      <div className="absolute left-0.5 top-3 w-2 h-2 rounded-full bg-accent border border-accent/30 z-10" />

      <Card className="p-2 bg-accent/5 border-l-2 border-accent">
        <div className="flex items-start gap-2">
          <Icon className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-ink truncate">
              {title}
            </div>
            <div className="flex items-center gap-1 text-[10px] text-ink-4 mt-0.5">
              <span className="font-mono">
                {startTime}–{endTime}
              </span>
              <span className="font-mono">{tzLabel}</span>
              {venueName && (
                <>
                  <span>·</span>
                  <MapPin className="w-2.5 h-2.5" />
                  <span className="truncate">{venueName}</span>
                  {deckNum && <span>· Dk {deckNum}</span>}
                </>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

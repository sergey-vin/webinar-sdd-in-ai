"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Database } from "@/lib/supabase/types";

type Event = Database["public"]["Tables"]["events"]["Row"];

interface EventCardProps {
  event: Event;
  isFavorited: boolean;
  onToggleFavorite: (eventId: string) => void;
}

function formatTime(time: string): string {
  const [hours, minutes] = time.split(":");
  const h = parseInt(hours, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${minutes} ${ampm}`;
}

const CATEGORY_COLORS: Record<string, string> = {
  show: "bg-red-100 text-red-700",
  music: "bg-purple-100 text-purple-700",
  dining: "bg-orange-100 text-orange-700",
  activity: "bg-blue-100 text-blue-700",
  fitness: "bg-green-100 text-green-700",
  kids: "bg-yellow-100 text-yellow-700",
  other: "bg-gray-100 text-gray-700",
};

export function EventCard({ event, isFavorited, onToggleFavorite }: EventCardProps) {
  const [expanded, setExpanded] = useState(false);
  const catColor = CATEGORY_COLORS[event.category] || CATEGORY_COLORS.other;

  return (
    <Card size="sm">
      <CardContent>
        <div className="flex items-start gap-3">
          <div className="text-right min-w-[70px] shrink-0">
            <p className="text-sm font-semibold">{formatTime(event.start_time)}</p>
            <p className="text-xs text-muted-foreground">{formatTime(event.end_time)}</p>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium text-sm leading-tight">{event.title}</h3>
              <button
                onClick={() => onToggleFavorite(event.id)}
                className="shrink-0 p-1 -mt-1"
              >
                <Heart
                  className={cn(
                    "size-4 transition-colors",
                    isFavorited
                      ? "fill-red-500 text-red-500"
                      : "text-muted-foreground"
                  )}
                />
              </button>
            </div>

            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <Badge
                variant="secondary"
                className={cn("text-[10px] px-1.5 py-0", catColor)}
              >
                {event.category}
              </Badge>
              {event.location_name && (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="size-3" />
                  {event.location_name}
                </span>
              )}
              {!event.is_free && (
                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                  $
                </Badge>
              )}
            </div>

            {event.description && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 text-xs text-primary mt-1.5"
              >
                {expanded ? "Less" : "More"}
                {expanded ? (
                  <ChevronUp className="size-3" />
                ) : (
                  <ChevronDown className="size-3" />
                )}
              </button>
            )}

            {expanded && event.description && (
              <p className="text-xs text-muted-foreground mt-1.5">
                {event.description}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { formatTime };

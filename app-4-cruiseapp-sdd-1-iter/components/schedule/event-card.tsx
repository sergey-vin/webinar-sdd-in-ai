"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Plus, Check } from "lucide-react";
import type { CruiseEvent, EventCategory } from "@/lib/types";
import { useScheduleStore } from "@/lib/stores/schedule-store";
import { useT } from "@/lib/i18n";

const categoryColors: Record<EventCategory, string> = {
  show: "bg-purple-100 text-purple-700",
  pool: "bg-blue-100 text-blue-700",
  restaurant: "bg-orange-100 text-orange-700",
  excursion: "bg-green-100 text-green-700",
  sport: "bg-red-100 text-red-700",
  kids: "bg-pink-100 text-pink-700",
  music: "bg-indigo-100 text-indigo-700",
};

interface EventCardProps {
  event: CruiseEvent;
}

export function EventCard({ event }: EventCardProps) {
  const { myEventIds, addEvent, removeEvent } = useScheduleStore();
  const isAdded = myEventIds.includes(event.id);
  const t = useT();

  const handleToggle = () => {
    if (isAdded) {
      removeEvent(event.id);
    } else {
      addEvent(event.id);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge
                variant="secondary"
                className={`text-[10px] px-1.5 py-0 ${categoryColors[event.category]}`}
              >
                {t(`category.${event.category}`)}
              </Badge>
            </div>
            <h3 className="text-sm font-semibold text-navy leading-tight">
              {event.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {event.description}
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {event.startTime} — {event.endTime}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {event.location}
              </span>
            </div>
          </div>
          <Button
            variant={isAdded ? "default" : "outline"}
            size="sm"
            onClick={handleToggle}
            className={`shrink-0 ${
              isAdded
                ? "bg-gold hover:bg-gold-light text-navy"
                : "border-ocean-dark hover:bg-ocean"
            }`}
          >
            {isAdded ? (
              <Check className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

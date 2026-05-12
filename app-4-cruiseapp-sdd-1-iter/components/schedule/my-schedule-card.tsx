"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Bell, BellOff, Trash2 } from "lucide-react";
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

interface MyScheduleCardProps {
  event: CruiseEvent;
}

export function MyScheduleCard({ event }: MyScheduleCardProps) {
  const { removeEvent, toggleReminder, reminders } = useScheduleStore();
  const hasReminder = !!reminders[event.id];
  const t = useT();

  const handleToggleReminder = () => {
    if (!hasReminder && "Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
    toggleReminder(event.id);
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
              <span className="text-[10px] text-muted-foreground">
                {event.day === "today" ? t("schedule.today") : t("schedule.tomorrow")}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-navy leading-tight">
              {event.title}
            </h3>
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
          <div className="flex flex-col gap-1 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleReminder}
              className={`h-8 w-8 p-0 ${
                hasReminder ? "text-gold" : "text-muted-foreground"
              }`}
              title={hasReminder ? t("reminder.on") : t("reminder.off")}
            >
              {hasReminder ? (
                <Bell className="w-4 h-4" />
              ) : (
                <BellOff className="w-4 h-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeEvent(event.id)}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
              title={t("reminder.remove")}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

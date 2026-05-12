"use client";

import type { Event } from "@/lib/types";
import {
  Music,
  UtensilsCrossed,
  Users,
  ShoppingBag,
  Waves,
  Theater,
  Star,
  Plus,
  Check,
} from "lucide-react";
import { useScheduleStore } from "@/store/schedule-store";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  music: Music,
  food: UtensilsCrossed,
  family: Users,
  shops: ShoppingBag,
  spa: Waves,
  show: Theater,
};

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const { mySchedule, toggleEvent } = useScheduleStore();
  const isAdded = mySchedule.has(event.id);
  const Icon = categoryIcons[event.category] || Music;

  return (
    <div className="flex gap-3">
      {/* Timeline dot */}
      <div className="flex flex-col items-center pt-1">
        <div className="h-2.5 w-2.5 rounded-full border-2 border-ink-5 bg-surface" />
        <div className="w-px flex-1 bg-hairline-strong" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-ink-3">{event.time}</span>
          <span className="text-[10px] text-ink-4">–</span>
          <span className="font-mono text-xs text-ink-4">{event.endTime}</span>
        </div>

        <div
          className={`mt-1.5 rounded-radius-md border p-3 ${
            event.isRecommended
              ? "border-accent/20 bg-accent-soft/30"
              : "border-hairline bg-surface"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-radius-sm ${
                  event.isRecommended
                    ? "bg-accent-soft text-accent"
                    : "bg-brand-soft text-brand"
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium text-ink">
                    {event.title}
                  </span>
                  {event.isRecommended && (
                    <Star className="h-3 w-3 fill-accent text-accent" />
                  )}
                </div>
                <div className="text-[11px] text-ink-4">{event.location}</div>
              </div>
            </div>

            <button
              onClick={() => toggleEvent(event.id)}
              className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                isAdded
                  ? "bg-good text-white"
                  : "border border-hairline bg-surface hover:bg-surface-2"
              }`}
            >
              {isAdded ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Plus className="h-3.5 w-3.5 text-ink-3" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

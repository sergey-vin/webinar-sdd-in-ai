"use client";

import { cn } from "@/lib/utils";

interface DaySelectorProps {
  totalDays: number;
  selectedDay: number;
  onDayChange: (day: number) => void;
  departureDate?: string;
}

export function DaySelector({
  totalDays,
  selectedDay,
  onDayChange,
  departureDate,
}: DaySelectorProps) {
  function getDateForDay(day: number): string | null {
    if (!departureDate) return null;
    const date = new Date(departureDate);
    date.setDate(date.getDate() + day - 1);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-2 min-w-max px-1">
        {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => {
          const dateLabel = getDateForDay(day);
          return (
            <button
              key={day}
              onClick={() => onDayChange(day)}
              className={cn(
                "flex flex-col items-center px-3 py-2 rounded-full text-sm font-medium transition-colors min-w-[56px]",
                day === selectedDay
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              <span>Day {day}</span>
              {dateLabel && (
                <span className="text-[10px] opacity-80">{dateLabel}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

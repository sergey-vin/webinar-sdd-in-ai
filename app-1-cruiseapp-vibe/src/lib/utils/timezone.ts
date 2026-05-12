import type { Database } from "@/lib/supabase/types";

type TimezoneScheduleRow = Database["public"]["Tables"]["timezone_schedule"]["Row"];

export function getShipTimezone(
  schedule: TimezoneScheduleRow[],
  cruiseDayNumber: number
): TimezoneScheduleRow | undefined {
  // Find the most recent timezone change that's <= current day
  const sorted = [...schedule].sort(
    (a, b) => b.effective_from_day - a.effective_from_day
  );
  return sorted.find((tz) => tz.effective_from_day <= cruiseDayNumber);
}

export function getShipTime(ianaTimezone: string): Date {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: ianaTimezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const parts = formatter.formatToParts(now);
  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "0";
  return new Date(
    `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}:${get("second")}`
  );
}

export function formatTimeDisplay(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

export function getCruiseDayNumber(
  departureDate: string,
  currentDate: Date = new Date()
): number {
  const departure = new Date(departureDate);
  const diffMs = currentDate.getTime() - departure.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
}

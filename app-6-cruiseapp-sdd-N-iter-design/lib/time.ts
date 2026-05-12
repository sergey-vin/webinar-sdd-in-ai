import { DateTime } from "luxon";

/**
 * Convert a UTC ISO string to a specific timezone and format it.
 */
export function formatInZone(
  isoUtc: string,
  timezone: string,
  format: string = "HH:mm",
): string {
  return DateTime.fromISO(isoUtc, { zone: "utc" })
    .setZone(timezone)
    .toFormat(format);
}

/**
 * Get the current ship time (the timezone of the vessel's current position).
 */
export function shipTimeNow(shipTimezone: string): DateTime {
  return DateTime.now().setZone(shipTimezone);
}

/**
 * Get the current home time for the user.
 */
export function homeTimeNow(homeTimezone: string): DateTime {
  return DateTime.now().setZone(homeTimezone);
}

/**
 * Format a duration in minutes to a human-readable string.
 * e.g. 135 → "2h 15m"
 */
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

/**
 * Get the UTC offset label for a timezone, e.g. "+03:00"
 */
export function utcOffsetLabel(timezone: string): string {
  return DateTime.now().setZone(timezone).toFormat("ZZ");
}

/**
 * Get a short timezone label for a given time + timezone.
 * Returns the IANA short name like "EET" or falls back to UTC offset like "UTC+3".
 */
export function tzShortLabel(isoUtc: string, timezone: string): string {
  const dt = DateTime.fromISO(isoUtc, { zone: "utc" }).setZone(timezone);
  const abbr = dt.toFormat("ZZZZ"); // e.g. "Eastern European Standard Time"
  const offset = dt.toFormat("ZZ");  // e.g. "+02:00"
  // Luxon's "z" gives short abbreviation like "EET" or "EEST"
  const short = dt.toFormat("z");    // e.g. "EET"
  // If short is a real abbreviation (2-5 uppercase chars), use it; otherwise use UTC offset
  if (/^[A-Z]{2,5}$/.test(short)) return short;
  const hrs = dt.offset / 60;
  return `UTC${hrs >= 0 ? "+" : ""}${hrs}`;
}

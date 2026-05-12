"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useUIStore } from "@/lib/stores/ui-store";
import { useTripStore } from "@/lib/stores/trip-store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DateTime } from "luxon";

export function Header() {
  const t = useTranslations("common");
  const tSchedule = useTranslations("schedule");
  const profile = useAuthStore((s) => s.profile);
  const timezoneMode = useUIStore((s) => s.timezoneMode);
  const legs = useTripStore((s) => s.legs);
  const [now, setNow] = useState<DateTime>(DateTime.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(DateTime.now()), 30000);
    return () => clearInterval(interval);
  }, []);

  const initials = profile
    ? profile.display_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "?";

  const homeTz = profile?.home_timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone;
  const currentLeg = legs.find((l) => l.status === "in_transit" || l.status === "boarding");
  const shipTz = currentLeg?.route.origin.timezone ?? homeTz;

  const activeTz = timezoneMode === "ship" ? shipTz
    : timezoneMode === "home" ? homeTz
    : Intl.DateTimeFormat().resolvedOptions().timeZone;
  const modeLabel = tSchedule(`${timezoneMode}Time`);

  const displayTime = now.setZone(activeTz).toFormat("HH:mm");
  const tzLabel = (() => {
    const short = now.setZone(activeTz).toFormat("z");
    if (/^[A-Z]{2,5}$/.test(short)) return short;
    const hrs = now.setZone(activeTz).offset / 60;
    return `UTC${hrs >= 0 ? "+" : ""}${hrs}`;
  })();

  return (
    <header
      data-testid="app-header"
      className="sticky top-0 z-40 bg-brand text-white px-4 py-3 flex items-center justify-between md:rounded-t-[32px]"
    >
      <div className="flex items-center gap-2">
        <span className="font-display text-xl tracking-tight">{t("appName")}</span>
      </div>

      {profile && (
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-sm text-white font-mono leading-none">
              {displayTime}
            </div>
            <div className="text-[9px] text-white/60 font-mono">
              {modeLabel} · {tzLabel}
            </div>
          </div>
          <Avatar className="w-8 h-8 border border-white/30">
            <AvatarFallback className="bg-accent text-white text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
      )}
    </header>
  );
}

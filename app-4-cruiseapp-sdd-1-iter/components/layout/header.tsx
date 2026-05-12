"use client";

import { Ship, Clock, Home } from "lucide-react";
import { useEffect, useState } from "react";
import type { ShipInfo } from "@/lib/types";
import { useTimeStore } from "@/lib/stores/time-store";
import { ThemeToggle } from "./theme-toggle";
import { LocaleToggle } from "./locale-toggle";
import { useT } from "@/lib/i18n";

export function Header() {
  const [shipInfo, setShipInfo] = useState<ShipInfo | null>(null);
  const [showBothTimes, setShowBothTimes] = useState(false);
  const { shipUtcOffset, homeUtcOffset } = useTimeStore();
  const t = useT();

  useEffect(() => {
    fetch("/data/ship-info.json")
      .then((res) => res.json())
      .then((data: ShipInfo & { timezone?: { shipUtcOffset: number; homeUtcOffset: number } }) => {
        setShipInfo(data);
        if (data.timezone) {
          useTimeStore.getState().setTimezone(
            data.timezone.shipUtcOffset,
            data.timezone.homeUtcOffset
          );
        }
      });
  }, []);

  const timeDiff = shipUtcOffset - homeUtcOffset;

  return (
    <header className="bg-navy text-white sticky top-0 z-50">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Ship className="w-5 h-5 text-gold" />
          <span className="font-heading text-lg font-semibold">
            {shipInfo?.name ?? "CruiseApp"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowBothTimes(!showBothTimes)}
            className="flex items-center gap-1.5 text-sm text-gold-light hover:text-gold transition-colors"
          >
            <Clock className="w-4 h-4" />
            <span>{shipInfo?.shipTime ?? "--:--"}</span>
          </button>
          <ThemeToggle />
          <LocaleToggle />
        </div>
      </div>

      {/* Expanded time panel */}
      {showBothTimes && shipInfo && (
        <div className="px-4 pb-3 flex gap-4 text-xs">
          <div className="flex items-center gap-1.5 bg-white/10 rounded-lg px-3 py-1.5">
            <Ship className="w-3.5 h-3.5 text-gold" />
            <div>
              <div className="text-[10px] text-white/60">{t("time.ship")}</div>
              <div className="font-semibold">{shipInfo.shipTime}</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 rounded-lg px-3 py-1.5">
            <Home className="w-3.5 h-3.5 text-gold-light" />
            <div>
              <div className="text-[10px] text-white/60">{t("time.home")}</div>
              <div className="font-semibold">{shipInfo.homeTime}</div>
            </div>
          </div>
          {timeDiff !== 0 && (
            <div className="flex items-center text-[10px] text-gold-light">
              {timeDiff > 0 ? `+${timeDiff}` : `${timeDiff}`}{t("time.diffFromHome")}
            </div>
          )}
        </div>
      )}
    </header>
  );
}

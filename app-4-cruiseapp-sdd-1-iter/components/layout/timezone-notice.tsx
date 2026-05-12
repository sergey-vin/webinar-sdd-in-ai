"use client";

import { Clock, X } from "lucide-react";
import { useTimeStore } from "@/lib/stores/time-store";
import { useT } from "@/lib/i18n";

export function TimezoneNotice() {
  const { shipUtcOffset, homeUtcOffset, showTimezoneNotice, dismissNotice } =
    useTimeStore();

  const t = useT();

  if (!showTimezoneNotice || shipUtcOffset === homeUtcOffset) return null;

  const diff = shipUtcOffset - homeUtcOffset;
  const diffText =
    diff > 0 ? `+${diff} ${t("time.diffFromHome")}` : `${diff} ${t("time.diffFromHome")}`;

  return (
    <div className="bg-gold/20 border-b border-gold/30 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2 text-xs text-navy">
        <Clock className="w-3.5 h-3.5 text-gold" />
        <span>
          {t("time.notice")} <strong>{diffText}</strong>
        </span>
      </div>
      <button
        onClick={dismissNotice}
        className="text-navy/50 hover:text-navy transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

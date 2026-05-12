"use client";

import { useState, useEffect } from "react";
import { getShipTime, formatTimeDisplay } from "@/lib/utils/timezone";

interface ShipClockProps {
  ianaTimezone: string;
  label: string;
  size?: "lg" | "sm";
}

export function ShipClock({ ianaTimezone, label, size = "lg" }: ShipClockProps) {
  const [time, setTime] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    function update() {
      const shipTime = getShipTime(ianaTimezone);
      setTime(formatTimeDisplay(shipTime));
    }

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [ianaTimezone]);

  if (!mounted) {
    return (
      <div className="flex flex-col items-center gap-1">
        <div className={size === "lg" ? "text-5xl font-mono font-bold" : "text-3xl font-mono font-bold"}>
          --:--:-- --
        </div>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={
          size === "lg"
            ? "text-5xl sm:text-6xl font-mono font-bold tabular-nums"
            : "text-3xl sm:text-4xl font-mono font-bold tabular-nums"
        }
      >
        {time}
      </div>
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-xs text-muted-foreground/70">{ianaTimezone}</span>
    </div>
  );
}

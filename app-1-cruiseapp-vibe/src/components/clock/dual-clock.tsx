"use client";

import { useState, useEffect } from "react";
import { ShipClock } from "./ship-clock";
import { getShipTime } from "@/lib/utils/timezone";

interface DualClockProps {
  shipTimezone: string;
  homeTimezone: string;
}

export function DualClock({ shipTimezone, homeTimezone }: DualClockProps) {
  const [timeDiff, setTimeDiff] = useState<string>("");

  useEffect(() => {
    function calcDiff() {
      const shipTime = getShipTime(shipTimezone);
      const homeTime = getShipTime(homeTimezone);
      const diffMs = shipTime.getTime() - homeTime.getTime();
      const diffHours = Math.round(diffMs / (1000 * 60 * 60));

      if (diffHours === 0) {
        setTimeDiff("Same time");
      } else if (diffHours > 0) {
        setTimeDiff(`Ship is ${diffHours}h ahead`);
      } else {
        setTimeDiff(`Ship is ${Math.abs(diffHours)}h behind`);
      }
    }

    calcDiff();
    const interval = setInterval(calcDiff, 60000);
    return () => clearInterval(interval);
  }, [shipTimezone, homeTimezone]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col items-center p-6 rounded-xl bg-muted/30 border">
          <ShipClock ianaTimezone={shipTimezone} label="Ship Time" size="lg" />
        </div>
        <div className="flex flex-col items-center p-6 rounded-xl bg-muted/30 border">
          <ShipClock ianaTimezone={homeTimezone} label="Home Time" size="sm" />
        </div>
      </div>
      {timeDiff && (
        <p className="text-center text-sm text-muted-foreground">{timeDiff}</p>
      )}
    </div>
  );
}

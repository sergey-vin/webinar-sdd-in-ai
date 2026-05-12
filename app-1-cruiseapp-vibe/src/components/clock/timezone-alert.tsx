"use client";

import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

interface TimezoneAlertProps {
  direction: "forward" | "backward";
  minutesChange: number;
  effectiveTime: string;
}

export function TimezoneAlert({
  direction,
  minutesChange,
  effectiveTime,
}: TimezoneAlertProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-700 p-4">
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-2 right-2 p-1 text-amber-600 hover:text-amber-800"
      >
        <X className="size-4" />
      </button>
      <div className="flex items-start gap-3 pr-6">
        <AlertTriangle className="size-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
          Clocks move {direction} {minutesChange} minutes tonight at {effectiveTime}
        </p>
      </div>
    </div>
  );
}

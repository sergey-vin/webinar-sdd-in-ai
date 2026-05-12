"use client";

import { Bell, Clock } from "lucide-react";
import { useTimezoneStore } from "@/store/timezone-store";

interface HeaderProps {
  title: string;
  subtitle?: string;
  showNotification?: boolean;
  showTimezone?: boolean;
}

export function Header({ title, subtitle, showNotification = false, showTimezone = false }: HeaderProps) {
  const { shipTime, homeTime, homeTimezone } = useTimezoneStore();

  return (
    <div className="px-5 pb-3 pt-2">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-[28px] leading-none tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-sm text-ink-3">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {showNotification && (
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-surface text-ink-2 hover:bg-surface-2">
              <Bell className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
      {showTimezone && (
        <div className="mt-2 flex items-center gap-3 rounded-radius-sm bg-surface-sunk px-3 py-1.5">
          <Clock className="h-3.5 w-3.5 text-ink-4" />
          <div className="flex items-center gap-3 text-xs">
            <span>
              <span className="font-semibold text-ink">🚢 {shipTime}</span>
              <span className="ml-1 text-ink-4">ship</span>
            </span>
            <span className="text-ink-5">|</span>
            <span>
              <span className="font-medium text-ink-2">🏠 {homeTime}</span>
              <span className="ml-1 text-ink-4">{homeTimezone}</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

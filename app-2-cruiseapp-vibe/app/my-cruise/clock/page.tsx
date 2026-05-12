"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cruises, activeBooking } from "@/lib/mock-data";

export default function ClockPage() {
  const cruise = cruises.find((c) => c.id === activeBooking.cruiseId)!;
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Mock: ship is currently at UTC+2 (Mediterranean), simulating day 2
  const shipUtcOffset = 2;
  const shipTime = new Date(now.getTime() + (shipUtcOffset - (-now.getTimezoneOffset() / 60)) * 3600000);
  const homeOffset = -now.getTimezoneOffset() / 60;

  // Next time change: when moving from UTC+2 to UTC+1 area (mock)
  const nextTimeChange = {
    day: 6,
    direction: "back" as const,
    hours: 1,
    fromZone: "CET (UTC+2)",
    toZone: "WET (UTC+1)",
    note: "Clocks go back 1 hour tonight at 02:00. You gain an extra hour of sleep!",
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-1">Ship Clock</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Time zones & clock changes
      </p>

      {/* Ship Time - main clock */}
      <Card className="mb-4 bg-gradient-to-br from-primary to-accent text-primary-foreground">
        <CardContent className="p-6 text-center">
          <p className="text-sm opacity-80 mb-1">Ship Time (UTC+{shipUtcOffset})</p>
          <p className="text-5xl font-mono font-bold tracking-wider mb-1">
            {formatTime(shipTime)}
          </p>
          <p className="text-sm opacity-80">{formatDate(shipTime)}</p>
          <Badge className="mt-3 bg-white/20 text-white border-0">
            MS Ocean Dream
          </Badge>
        </CardContent>
      </Card>

      {/* Home Time */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Your Home Time (UTC{homeOffset >= 0 ? "+" : ""}
                {homeOffset})
              </p>
              <p className="text-2xl font-mono font-bold">{formatTime(now)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">Difference</p>
              <p className="text-lg font-bold">
                {shipUtcOffset - homeOffset > 0 ? "+" : ""}
                {shipUtcOffset - homeOffset}h
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time change alert */}
      <Card className="mb-4 border-amber-300 bg-amber-50">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <span className="text-2xl">⏰</span>
            <div>
              <h3 className="font-semibold text-sm mb-1">
                Upcoming Clock Change — Day {nextTimeChange.day}
              </h3>
              <p className="text-sm text-muted-foreground">
                {nextTimeChange.note}
              </p>
              <div className="flex items-center gap-2 mt-2 text-xs">
                <Badge variant="outline">{nextTimeChange.fromZone}</Badge>
                <span>→</span>
                <Badge variant="outline">{nextTimeChange.toZone}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator className="my-4" />

      {/* Port time zones */}
      <h2 className="font-semibold mb-3">Time Zones by Port</h2>
      <div className="space-y-2">
        {cruise.ports.map((port) => {
          const isCurrent = port.day <= 2; // mock: day 2
          const portTime = new Date(
            now.getTime() +
              (port.utcOffset - (-now.getTimezoneOffset() / 60)) * 3600000
          );

          return (
            <Card
              key={port.id}
              className={isCurrent ? "" : "opacity-60"}
            >
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        port.day === 2
                          ? "bg-green-500 animate-pulse"
                          : port.day < 2
                          ? "bg-green-500"
                          : "bg-muted-foreground/30"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-medium">
                        Day {port.day}: {port.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {port.timezone} (UTC
                        {port.utcOffset >= 0 ? "+" : ""}
                        {port.utcOffset})
                      </p>
                    </div>
                  </div>
                  <p className="font-mono text-sm">{formatTime(portTime)}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tips */}
      <Card className="mt-4">
        <CardContent className="p-4">
          <h3 className="font-semibold text-sm mb-2">Time Zone Tips</h3>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>
              • All onboard schedules use <strong>ship time</strong>
            </li>
            <li>• Your phone may auto-update when near ports</li>
            <li>• Check the daily newsletter for clock change notices</li>
            <li>• Set a manual alarm for important events</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

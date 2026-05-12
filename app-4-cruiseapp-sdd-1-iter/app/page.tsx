"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sun,
  CloudSun,
  Cloud,
  Anchor,
  CalendarDays,
  Ship,
  Map,
  Truck,
} from "lucide-react";
import Link from "next/link";
import type { ShipInfo, CruiseEvent } from "@/lib/types";
import { useT } from "@/lib/i18n";

const weatherIcons: Record<string, React.ReactNode> = {
  sun: <Sun className="w-8 h-8 text-gold" />,
  "cloud-sun": <CloudSun className="w-8 h-8 text-gold" />,
  cloud: <Cloud className="w-8 h-8 text-muted-foreground" />,
};

const quickLinks = [
  { href: "/schedule", labelKey: "nav.schedule", icon: CalendarDays, color: "bg-blue-50 text-blue-600" },
  { href: "/booking", labelKey: "nav.booking", icon: Ship, color: "bg-amber-50 text-amber-600" },
  { href: "/map", labelKey: "nav.map", icon: Map, color: "bg-green-50 text-green-600" },
  { href: "/logistics", labelKey: "nav.logistics", icon: Truck, color: "bg-purple-50 text-purple-600" },
];

export default function HomePage() {
  const [shipInfo, setShipInfo] = useState<ShipInfo | null>(null);
  const [nextEvent, setNextEvent] = useState<CruiseEvent | null>(null);
  const t = useT();

  useEffect(() => {
    fetch("/data/ship-info.json")
      .then((res) => res.json())
      .then(setShipInfo);

    fetch("/data/events.json")
      .then((res) => res.json())
      .then((events: CruiseEvent[]) => {
        const todayEvents = events
          .filter((e) => e.day === "today")
          .sort((a, b) => a.startTime.localeCompare(b.startTime));
        setNextEvent(todayEvents[0] ?? null);
      });
  }, []);

  return (
    <div className="px-4 py-6 max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-navy">
          {t("home.welcome")}
        </h1>
        <p className="text-muted-foreground mt-1">{t("home.subtitle")}</p>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-4 space-y-4">
          <h2 className="font-heading text-lg font-semibold text-navy flex items-center gap-2">
            <Anchor className="w-5 h-5 text-gold" />
            {t("home.onboard")}
          </h2>

          {shipInfo && (
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                {weatherIcons[shipInfo.weather.icon] ?? weatherIcons.sun}
                <div>
                  <div className="text-xl font-semibold">{shipInfo.weather.temp}°C</div>
                  <div className="text-xs text-muted-foreground">{shipInfo.weather.condition}</div>
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">{t("home.currentPort")}</div>
                <div className="text-sm font-medium">{shipInfo.currentPort}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {t("home.next")}: {shipInfo.nextPort}
                </div>
              </div>
            </div>
          )}

          {nextEvent && (
            <div className="bg-ocean rounded-xl p-3">
              <div className="text-xs text-muted-foreground">{t("home.nextEvent")}</div>
              <div className="text-sm font-medium mt-0.5">{nextEvent.title}</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {nextEvent.startTime} — {nextEvent.location}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div>
        <h2 className="font-heading text-lg font-semibold text-navy mb-3">
          {t("home.quickAccess")}
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.href} href={link.href}>
                <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${link.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium">{t(link.labelKey)}</span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

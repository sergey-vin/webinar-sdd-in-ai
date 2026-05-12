"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Ship,
  Plane,
  Train,
  Bus,
  MapPin,
  Plus,
  X,
  Clock,
  ArrowDown,
  Route as RouteIcon,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { formatDuration } from "@/lib/time";
import type { TransportMode } from "@/lib/types";

const modeIcons: Record<TransportMode, typeof Ship> = {
  ferry: Ship,
  flight: Plane,
  train: Train,
  bus: Bus,
  metro: Train,
};

interface RouteLeg {
  id: string;
  route_code: string;
  mode: TransportMode;
  duration_min: number;
  base_price_eur: number | null;
  carrier: { name_en: string; name_ru: string; color: string | null };
  origin: { city_en: string; city_ru: string; name_en: string; name_ru: string };
  destination: { city_en: string; city_ru: string; name_en: string; name_ru: string };
}

interface Waypoint {
  id: string;
  value: string;
}

export function RoutePlanner() {
  const t = useTranslations("route");
  const tSearch = useTranslations("search");
  const locale = useLocale();
  const [waypoints, setWaypoints] = useState<Waypoint[]>([
    { id: "origin", value: "" },
    { id: "dest", value: "" },
  ]);
  const [legs, setLegs] = useState<RouteLeg[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  function addWaypoint() {
    const newId = `wp-${Date.now()}`;
    const newWps = [...waypoints];
    newWps.splice(newWps.length - 1, 0, { id: newId, value: "" });
    setWaypoints(newWps);
  }

  function removeWaypoint(id: string) {
    if (waypoints.length <= 2) return;
    setWaypoints(waypoints.filter((w) => w.id !== id));
  }

  function updateWaypoint(id: string, value: string) {
    setWaypoints(waypoints.map((w) => (w.id === id ? { ...w, value } : w)));
  }

  async function planRoute() {
    setLoading(true);
    setSearched(true);
    const supabase = createClient();
    const foundLegs: RouteLeg[] = [];

    // For each consecutive pair of waypoints, find best route
    for (let i = 0; i < waypoints.length - 1; i++) {
      const from = waypoints[i].value.trim().toLowerCase();
      const to = waypoints[i + 1].value.trim().toLowerCase();

      if (!from || !to) continue;

      const { data } = await supabase
        .from("routes")
        .select(
          `
          id, route_code, mode, duration_min, base_price_eur,
          carrier:carriers (name_en, name_ru, color),
          origin:locations!routes_origin_id_fkey (city_en, city_ru, name_en, name_ru),
          destination:locations!routes_destination_id_fkey (city_en, city_ru, name_en, name_ru)
        `,
        )
        .order("duration_min", { ascending: true });

      const allRoutes = (data as unknown as RouteLeg[]) ?? [];

      // Find routes matching from→to by city name
      const matching = allRoutes.filter(
        (r) =>
          (r.origin.city_en.toLowerCase().includes(from) ||
            r.origin.city_ru.toLowerCase().includes(from)) &&
          (r.destination.city_en.toLowerCase().includes(to) ||
            r.destination.city_ru.toLowerCase().includes(to)),
      );

      if (matching.length > 0) {
        // Pick cheapest available
        const best = matching.sort(
          (a, b) => (a.base_price_eur ?? 999) - (b.base_price_eur ?? 999),
        )[0];
        foundLegs.push(best);
      }
    }

    setLegs(foundLegs);
    setLoading(false);
  }

  const totalDuration = legs.reduce((acc, l) => acc + l.duration_min, 0);
  const totalPrice = legs.reduce(
    (acc, l) => acc + (l.base_price_eur ?? 0),
    0,
  );

  return (
    <div data-testid="route-page" className="p-4 space-y-4">
      <h1 className="font-display text-2xl text-ink">{t("title")}</h1>
      <p className="text-xs text-ink-3">{t("doorToDoor")}</p>

      {/* Waypoints */}
      <Card className="p-4 bg-white space-y-2" data-testid="route-form">
        {waypoints.map((wp, i) => (
          <div key={wp.id} className="flex items-center gap-2">
            <div className="w-6 flex justify-center">
              {i === 0 ? (
                <div className="w-3 h-3 rounded-full border-2 border-brand" />
              ) : i === waypoints.length - 1 ? (
                <div className="w-3 h-3 rounded-full bg-accent" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-ink-4" />
              )}
            </div>
            <input
              data-testid={`waypoint-${i}`}
              type="text"
              value={wp.value}
              onChange={(e) => updateWaypoint(wp.id, e.target.value)}
              placeholder={
                i === 0
                  ? tSearch("from")
                  : i === waypoints.length - 1
                    ? tSearch("to")
                    : `Stop ${i}`
              }
              className="flex-1 px-3 py-2 rounded-lg border border-ink-5 bg-background text-sm text-ink placeholder:text-ink-4 focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
            {i > 0 && i < waypoints.length - 1 && (
              <button
                onClick={() => removeWaypoint(wp.id)}
                className="p-1 rounded-md hover:bg-surface-sunk"
              >
                <X className="w-4 h-4 text-ink-4" />
              </button>
            )}
          </div>
        ))}

        <button
          data-testid="add-waypoint"
          onClick={addWaypoint}
          className="flex items-center gap-2 text-sm text-brand ml-8"
        >
          <Plus className="w-4 h-4" />
          Add stop
        </button>

        <Button
          data-testid="plan-route-btn"
          onClick={planRoute}
          disabled={loading}
          className="w-full bg-brand text-white hover:bg-brand-light mt-2"
        >
          <RouteIcon className="w-4 h-4 mr-2" />
          {t("title")}
        </Button>
      </Card>

      {/* Route result */}
      {searched && legs.length > 0 && (
        <div data-testid="route-result" className="space-y-3">
          {/* Summary */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-sm text-ink-3">
              <Clock className="w-4 h-4" />
              <span>
                {t("totalTime")}: {formatDuration(totalDuration)}
              </span>
            </div>
            <span className="font-semibold text-ink">
              €{totalPrice.toFixed(0)}
            </span>
          </div>

          {/* Leg cards */}
          {legs.map((leg, i) => {
            const Icon = modeIcons[leg.mode];
            const carrierName =
              locale === "ru" ? leg.carrier.name_ru : leg.carrier.name_en;
            const originCity =
              locale === "ru" ? leg.origin.city_ru : leg.origin.city_en;
            const destCity =
              locale === "ru"
                ? leg.destination.city_ru
                : leg.destination.city_en;

            return (
              <div key={leg.id}>
                <Card className="p-3 bg-white">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0"
                      style={{
                        backgroundColor: leg.carrier.color ?? "#0B3D5C",
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-ink">
                        {originCity} → {destCity}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-ink-3">
                        <span>{carrierName}</span>
                        <span>·</span>
                        <span>{formatDuration(leg.duration_min)}</span>
                        {leg.base_price_eur != null && (
                          <>
                            <span>·</span>
                            <span>€{leg.base_price_eur.toFixed(0)}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
                {i < legs.length - 1 && (
                  <div className="flex justify-center py-1">
                    <ArrowDown className="w-4 h-4 text-ink-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {searched && legs.length === 0 && !loading && (
        <p className="text-sm text-ink-3 text-center py-8">
          {tSearch("noResults")}
        </p>
      )}
    </div>
  );
}

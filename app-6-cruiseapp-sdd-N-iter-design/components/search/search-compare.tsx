"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Ship,
  Plane,
  Train,
  Bus,
  Search,
  ArrowRight,
  Clock,
  ArrowUpDown,
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

const modeColors: Record<TransportMode, string> = {
  ferry: "bg-blue-100 text-blue-700",
  flight: "bg-purple-100 text-purple-700",
  train: "bg-green-100 text-green-700",
  bus: "bg-amber-100 text-amber-700",
  metro: "bg-cyan-100 text-cyan-700",
};

interface RouteResult {
  id: string;
  route_code: string;
  mode: TransportMode;
  duration_min: number;
  base_price_eur: number | null;
  co2_kg: number | null;
  frequency: string | null;
  carrier: { code: string; name_en: string; name_ru: string; color: string | null };
  origin: { code: string; city_en: string; city_ru: string; name_en: string; name_ru: string };
  destination: { code: string; city_en: string; city_ru: string; name_en: string; name_ru: string };
  vessel: { name: string } | null;
}

type SortMode = "cheapest" | "fastest" | "greenest";

export function SearchCompare() {
  const t = useTranslations("search");
  const locale = useLocale();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [results, setResults] = useState<RouteResult[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>("cheapest");
  const [modeFilter, setModeFilter] = useState<TransportMode | "all">("all");

  async function handleSearch() {
    setLoading(true);
    setSearched(true);
    const supabase = createClient();

    let query = supabase
      .from("routes")
      .select(
        `
        id, route_code, mode, duration_min, base_price_eur, co2_kg, frequency,
        carrier:carriers (code, name_en, name_ru, color),
        origin:locations!routes_origin_id_fkey (code, city_en, city_ru, name_en, name_ru),
        destination:locations!routes_destination_id_fkey (code, city_en, city_ru, name_en, name_ru),
        vessel:vessels (name)
      `,
      );

    // If search terms provided, filter by city name (case-insensitive partial match)
    // Otherwise show all routes
    if (from.trim()) {
      query = query.or(
        `city_en.ilike.%${from.trim()}%,city_ru.ilike.%${from.trim()}%`,
        { referencedTable: "locations" as unknown as "locations!routes_origin_id_fkey" },
      );
    }

    const { data } = await query.order("base_price_eur", {
      ascending: true,
    });

    let filtered = (data as unknown as RouteResult[]) ?? [];

    // Client-side filter by destination if specified
    if (to.trim()) {
      const toLower = to.trim().toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.destination.city_en.toLowerCase().includes(toLower) ||
          r.destination.city_ru.toLowerCase().includes(toLower),
      );
    }

    // Client-side filter by origin if the Supabase filter didn't work
    if (from.trim()) {
      const fromLower = from.trim().toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.origin.city_en.toLowerCase().includes(fromLower) ||
          r.origin.city_ru.toLowerCase().includes(fromLower),
      );
    }

    setResults(filtered);
    setLoading(false);
  }

  const filteredResults =
    modeFilter === "all"
      ? results
      : results.filter((r) => r.mode === modeFilter);

  const sortedResults = [...filteredResults].sort((a, b) => {
    if (sortMode === "cheapest") {
      return (a.base_price_eur ?? 999) - (b.base_price_eur ?? 999);
    }
    if (sortMode === "greenest") {
      return (a.co2_kg ?? 999) - (b.co2_kg ?? 999);
    }
    return a.duration_min - b.duration_min;
  });

  const availableModes = [...new Set(results.map((r) => r.mode))];

  return (
    <div data-testid="search-page" className="p-4 space-y-4">
      <h1 className="font-display text-2xl text-ink">{t("title")}</h1>

      {/* Search form */}
      <Card className="p-4 bg-white space-y-3" data-testid="search-form">
        <div>
          <label className="text-xs text-ink-4 uppercase tracking-wider">
            {t("from")}
          </label>
          <input
            data-testid="search-from"
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Helsinki"
            className="w-full mt-1 px-3 py-2 rounded-lg border border-ink-5 bg-background text-sm text-ink placeholder:text-ink-4 focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </div>
        <div>
          <label className="text-xs text-ink-4 uppercase tracking-wider">
            {t("to")}
          </label>
          <input
            data-testid="search-to"
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Tallinn"
            className="w-full mt-1 px-3 py-2 rounded-lg border border-ink-5 bg-background text-sm text-ink placeholder:text-ink-4 focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </div>
        <Button
          data-testid="search-btn"
          onClick={handleSearch}
          disabled={loading}
          className="w-full bg-brand text-white hover:bg-brand-light"
        >
          <Search className="w-4 h-4 mr-2" />
          {t("searchBtn")}
        </Button>
      </Card>

      {/* Results */}
      {searched && (
        <>
          {/* Sort + filter bar */}
          {results.length > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-ink-3">
                {t("results", { count: filteredResults.length })}
              </span>
              <div className="flex gap-1">
                <button
                  data-testid="sort-cheapest"
                  onClick={() => setSortMode("cheapest")}
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    sortMode === "cheapest"
                      ? "bg-brand text-white"
                      : "bg-surface-sunk text-ink-3"
                  }`}
                >
                  {t("cheapest")}
                </button>
                <button
                  data-testid="sort-fastest"
                  onClick={() => setSortMode("fastest")}
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    sortMode === "fastest"
                      ? "bg-brand text-white"
                      : "bg-surface-sunk text-ink-3"
                  }`}
                >
                  {t("fastest")}
                </button>
                <button
                  data-testid="sort-greenest"
                  onClick={() => setSortMode("greenest")}
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    sortMode === "greenest"
                      ? "bg-green-600 text-white"
                      : "bg-surface-sunk text-ink-3"
                  }`}
                >
                  {t("greenest")}
                </button>
              </div>
            </div>
          )}

          {/* Mode filter chips */}
          {availableModes.length > 1 && (
            <div className="flex gap-2" data-testid="mode-filter">
              <button
                onClick={() => setModeFilter("all")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                  modeFilter === "all"
                    ? "bg-brand text-white"
                    : "bg-surface-sunk text-ink-3"
                }`}
              >
                All
              </button>
              {availableModes.map((mode) => {
                const Icon = modeIcons[mode];
                return (
                  <button
                    key={mode}
                    onClick={() => setModeFilter(mode)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium ${
                      modeFilter === mode
                        ? "bg-brand text-white"
                        : "bg-surface-sunk text-ink-3"
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    {mode}
                  </button>
                );
              })}
            </div>
          )}

          {/* Results list */}
          {sortedResults.length === 0 ? (
            <p className="text-sm text-ink-3 text-center py-8">
              {t("noResults")}
            </p>
          ) : (
            <div className="space-y-3" data-testid="search-results">
              {sortedResults.map((route) => {
                const Icon = modeIcons[route.mode];
                const carrierName =
                  locale === "ru"
                    ? route.carrier.name_ru
                    : route.carrier.name_en;
                const originCity =
                  locale === "ru"
                    ? route.origin.city_ru
                    : route.origin.city_en;
                const destCity =
                  locale === "ru"
                    ? route.destination.city_ru
                    : route.destination.city_en;

                return (
                  <Card
                    key={route.id}
                    data-testid={`route-result-${route.id}`}
                    className="p-3 bg-white"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                          style={{
                            backgroundColor:
                              route.carrier.color ?? "#0B3D5C",
                          }}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-ink">
                            {carrierName}
                          </div>
                          <div className="text-xs text-ink-3 font-mono">
                            {route.route_code}
                          </div>
                        </div>
                      </div>
                      <Badge className={modeColors[route.mode]}>
                        {route.mode}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-ink font-medium">
                        {originCity}
                      </span>
                      <ArrowRight className="w-3 h-3 text-ink-4" />
                      <span className="text-sm text-ink font-medium">
                        {destCity}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-ink-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDuration(route.duration_min)}
                      </span>
                      {route.base_price_eur != null && (
                        <span className="font-semibold text-ink text-sm">
                          €{route.base_price_eur.toFixed(0)}
                        </span>
                      )}
                      {route.co2_kg != null && (
                        <span className="text-green-600">
                          {route.co2_kg}kg CO₂
                        </span>
                      )}
                      {route.vessel && (
                        <span>{route.vessel.name}</span>
                      )}
                    </div>

                    {route.frequency && (
                      <div className="text-[10px] text-ink-4 mt-1">
                        {route.frequency}
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

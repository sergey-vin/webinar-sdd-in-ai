"use client";

import { useTranslations, useLocale } from "next-intl";
import { Card } from "@/components/ui/card";
import { Ship, Plane, Train, Bus } from "lucide-react";
import { LegStatusPill } from "./leg-status-pill";
import { formatInZone, formatDuration, tzShortLabel } from "@/lib/time";
import type { TripLegWithDetails, TransportMode } from "@/lib/types";
import Link from "next/link";

const modeIcons: Record<TransportMode, typeof Ship> = {
  ferry: Ship,
  flight: Plane,
  train: Train,
  bus: Bus,
  metro: Train,
};

export function TimelineCard({
  leg,
  locale,
}: {
  leg: TripLegWithDetails;
  locale: string;
}) {
  const t = useTranslations("trip");
  const tModes = useTranslations("modes");
  const currentLocale = useLocale();

  const Icon = modeIcons[leg.route.mode] ?? Ship;
  const origin = currentLocale === "ru" ? leg.route.origin.city_ru : leg.route.origin.city_en;
  const dest = currentLocale === "ru" ? leg.route.destination.city_ru : leg.route.destination.city_en;
  const carrierName = currentLocale === "ru" ? leg.route.carrier.name_ru : leg.route.carrier.name_en;
  const isActive = leg.status === "in_transit" || leg.status === "boarding";
  const isDone = leg.status === "arrived";

  return (
    <Link href={`/${locale}/trip/${leg.id}`} data-testid={`leg-card-${leg.leg_order}`}>
      <Card
        className={`p-4 transition-all ${
          isActive
            ? "border-brand shadow-md bg-white"
            : isDone
              ? "opacity-60 bg-surface-2"
              : "bg-white hover:shadow-sm"
        }`}
      >
        <div className="flex items-start gap-3">
          {/* Mode icon */}
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 ${
              isActive ? "bg-brand text-white" : "bg-surface-sunk text-ink-3"
            }`}
          >
            <Icon className="w-5 h-5" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold text-ink truncate">
                {origin} → {dest}
              </span>
              <LegStatusPill status={leg.status} />
            </div>

            <div className="flex items-center gap-2 text-xs text-ink-3 mb-1">
              <span>{carrierName}</span>
              <span>·</span>
              <span>{tModes(leg.route.mode)}</span>
              {leg.route.vessel && (
                <>
                  <span>·</span>
                  <span>{leg.route.vessel.name}</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-4 mt-2">
              <div className="text-center">
                <div className="text-xs text-ink-4 uppercase">{t("departureShort")}</div>
                <div className="font-mono text-sm font-semibold text-ink">
                  {formatInZone(leg.departure_time, leg.route.origin.timezone)}
                </div>
                <div className="text-[10px] font-mono text-ink-4">
                  {tzShortLabel(leg.departure_time, leg.route.origin.timezone)}
                </div>
              </div>

              <div className="flex-1 flex items-center">
                <div className="h-px flex-1 bg-ink-5" />
                <span className="px-2 text-[10px] text-ink-4 font-mono">
                  {formatDuration(leg.route.duration_min)}
                </span>
                <div className="h-px flex-1 bg-ink-5" />
              </div>

              <div className="text-center">
                <div className="text-xs text-ink-4 uppercase">{t("arrivalShort")}</div>
                <div className="font-mono text-sm font-semibold text-ink">
                  {formatInZone(leg.arrival_time, leg.route.destination.timezone)}
                </div>
                <div className="text-[10px] font-mono text-ink-4">
                  {tzShortLabel(leg.arrival_time, leg.route.destination.timezone)}
                </div>
              </div>
            </div>

            {leg.seat_info && (
              <div className="mt-2 text-xs font-mono text-ink-3">
                {leg.seat_info} · {leg.booking_ref}
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}

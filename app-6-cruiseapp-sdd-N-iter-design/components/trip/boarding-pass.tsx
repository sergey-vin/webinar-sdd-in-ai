"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import QRCode from "qrcode";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ship, Plane, Train, Bus, ArrowLeft, MapPin, CalendarDays, Clock } from "lucide-react";
import { formatInZone, formatDuration, tzShortLabel } from "@/lib/time";
import { DateTime } from "luxon";
import type { TripLegWithDetails, TransportMode } from "@/lib/types";
import { LegStatusPill } from "./leg-status-pill";
import Link from "next/link";

const modeIcons: Record<TransportMode, typeof Ship> = {
  ferry: Ship,
  flight: Plane,
  train: Train,
  bus: Bus,
  metro: Train,
};

export function BoardingPass({
  leg,
  locale,
}: {
  leg: TripLegWithDetails;
  locale: string;
}) {
  const t = useTranslations("trip");
  const tCommon = useTranslations("common");
  const tModes = useTranslations("modes");
  const currentLocale = useLocale();
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    if (leg.qr_data) {
      QRCode.toDataURL(leg.qr_data, {
        width: 160,
        margin: 2,
        color: { dark: "#0E1A2B", light: "#FFFFFF" },
      }).then(setQrDataUrl);
    }
  }, [leg.qr_data]);

  // Time-left countdown for active legs
  useEffect(() => {
    if (leg.status !== "in_transit" && leg.status !== "boarding") return;
    function update() {
      const now = DateTime.now();
      const arr = DateTime.fromISO(leg.arrival_time, { zone: "utc" });
      const diff = arr.diff(now, ["hours", "minutes"]);
      if (diff.toMillis() <= 0) {
        setTimeLeft("");
        return;
      }
      const h = Math.floor(diff.hours);
      const m = Math.floor(diff.minutes);
      setTimeLeft(h > 0 ? `${h}h ${m}m` : `${m}m`);
    }
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, [leg.status, leg.arrival_time]);

  const Icon = modeIcons[leg.route.mode] ?? Ship;
  const originName = currentLocale === "ru" ? leg.route.origin.name_ru : leg.route.origin.name_en;
  const destName = currentLocale === "ru" ? leg.route.destination.name_ru : leg.route.destination.name_en;
  const originCity = currentLocale === "ru" ? leg.route.origin.city_ru : leg.route.origin.city_en;
  const destCity = currentLocale === "ru" ? leg.route.destination.city_ru : leg.route.destination.city_en;
  const carrierName = currentLocale === "ru" ? leg.route.carrier.name_ru : leg.route.carrier.name_en;
  const depDate = formatInZone(leg.departure_time, leg.route.origin.timezone, "dd MMM yyyy");
  const depTime = formatInZone(leg.departure_time, leg.route.origin.timezone, "HH:mm");
  const arrTime = formatInZone(leg.arrival_time, leg.route.destination.timezone, "HH:mm");
  const depTz = tzShortLabel(leg.departure_time, leg.route.origin.timezone);
  const arrTz = tzShortLabel(leg.arrival_time, leg.route.destination.timezone);

  return (
    <div data-testid="boarding-pass" className="p-4 space-y-4">
      {/* Back button */}
      <Link
        href={`/${locale}/trip`}
        className="inline-flex items-center gap-1 text-sm text-brand hover:text-brand-light"
        data-testid="back-to-trip"
      >
        <ArrowLeft className="w-4 h-4" />
        {tCommon("back")}
      </Link>

      <h1 className="font-display text-2xl text-ink">{t("boarding")}</h1>

      {/* Main pass card */}
      <Card className="overflow-hidden bg-white">
        {/* Header strip */}
        <div
          className="px-4 py-3 flex items-center justify-between"
          style={{ backgroundColor: leg.route.carrier.color ?? "#0B3D5C" }}
        >
          <div className="flex items-center gap-2 text-white">
            <Icon className="w-5 h-5" />
            <span className="font-semibold text-sm">{carrierName}</span>
          </div>
          <LegStatusPill status={leg.status} />
        </div>

        {/* Route */}
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="font-mono text-2xl font-bold text-ink">{depTime}</div>
              <div className="text-[10px] font-mono text-ink-4">{depTz}</div>
              <div className="text-sm font-semibold text-ink mt-0.5">{originCity}</div>
              <div className="text-xs text-ink-3">{originName}</div>
            </div>

            <div className="flex-1 flex flex-col items-center px-4">
              <div className="text-[10px] text-ink-4 font-mono mb-1">
                {formatDuration(leg.route.duration_min)}
              </div>
              <div className="w-full flex items-center">
                <div className="w-2 h-2 rounded-full border-2 border-brand" />
                <div className="h-px flex-1 bg-brand/30 border-t border-dashed border-brand/40" />
                <Icon className="w-4 h-4 text-brand mx-1" />
                <div className="h-px flex-1 bg-brand/30 border-t border-dashed border-brand/40" />
                <div className="w-2 h-2 rounded-full bg-brand" />
              </div>
              <div className="text-[10px] text-ink-4 mt-1">{depDate}</div>
            </div>

            <div className="text-center">
              <div className="font-mono text-2xl font-bold text-ink">{arrTime}</div>
              <div className="text-[10px] font-mono text-ink-4">{arrTz}</div>
              <div className="text-sm font-semibold text-ink mt-0.5">{destCity}</div>
              <div className="text-xs text-ink-3">{destName}</div>
            </div>
          </div>
        </div>

        {/* Time left banner for active legs */}
        {timeLeft && (
          <div data-testid="time-left" className="mx-4 mb-2 flex items-center gap-2 px-3 py-2 rounded-lg bg-brand/5 text-brand text-sm font-medium">
            <Clock className="w-4 h-4" />
            <span>{timeLeft} {t("remaining")}</span>
          </div>
        )}

        {/* Dashed divider */}
        <div className="relative mx-4 my-2">
          <div className="border-t border-dashed border-ink-5" />
          <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-background" />
          <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-background" />
        </div>

        {/* Passenger info grid */}
        <div className="px-4 py-3 grid grid-cols-2 gap-3">
          <InfoField label="Passenger" value={leg.booking_ref ? "Elena Volkova" : "—"} />
          <InfoField label="Booking" value={leg.booking_ref ?? "—"} mono />
          <InfoField label={tModes(leg.route.mode)} value={leg.route.route_code} mono />
          <InfoField label="Seat / Cabin" value={leg.seat_info ?? "—"} mono />
          {leg.route.vessel && (
            <InfoField label="Vessel" value={leg.route.vessel.name} />
          )}
        </div>

        {/* QR Code */}
        {qrDataUrl && (
          <div className="px-4 py-4 flex flex-col items-center border-t border-surface-sunk">
            <img
              src={qrDataUrl}
              alt="Boarding pass QR code"
              className="w-40 h-40"
              data-testid="qr-code"
            />
            <span className="text-xs font-mono text-ink-4 mt-2">
              {leg.booking_ref}
            </span>
          </div>
        )}
      </Card>

      {/* Vessel links (deck map + onboard schedule) */}
      {leg.route.vessel && (
        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/${locale}/trip/${leg.id}/deck`}
            data-testid="deck-map-link"
            className="flex items-center gap-2 justify-center py-3 px-4 bg-brand/5 rounded-xl text-brand text-sm font-medium hover:bg-brand/10 transition-colors"
          >
            <MapPin className="w-4 h-4" />
            {t("deckMap")}
          </Link>
          <Link
            href={`/${locale}/schedule`}
            data-testid="schedule-link"
            className="flex items-center gap-2 justify-center py-3 px-4 bg-accent/5 rounded-xl text-accent text-sm font-medium hover:bg-accent/10 transition-colors"
          >
            <CalendarDays className="w-4 h-4" />
            {t("schedule")}
          </Link>
        </div>
      )}
    </div>
  );
}

function InfoField({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <div className="text-[10px] text-ink-4 uppercase tracking-wider">{label}</div>
      <div className={`text-sm text-ink font-semibold ${mono ? "font-mono" : ""}`}>
        {value}
      </div>
    </div>
  );
}

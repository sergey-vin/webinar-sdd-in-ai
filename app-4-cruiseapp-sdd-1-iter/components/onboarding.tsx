"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ship, Globe, ChevronRight } from "lucide-react";
import { usePreferencesStore } from "@/lib/stores/preferences-store";
import { useTimeStore } from "@/lib/stores/time-store";
import { useT } from "@/lib/i18n";

const timezones = [
  { label: "Москва (UTC+3)", value: "Europe/Moscow", offset: 3 },
  { label: "Калининград (UTC+2)", value: "Europe/Kaliningrad", offset: 2 },
  { label: "Самара (UTC+4)", value: "Europe/Samara", offset: 4 },
  { label: "Екатеринбург (UTC+5)", value: "Asia/Yekaterinburg", offset: 5 },
  { label: "Лондон (UTC+0)", value: "Europe/London", offset: 0 },
  { label: "Берлин (UTC+1)", value: "Europe/Berlin", offset: 1 },
  { label: "Стамбул (UTC+3)", value: "Europe/Istanbul", offset: 3 },
  { label: "Дубай (UTC+4)", value: "Asia/Dubai", offset: 4 },
  { label: "Нью-Йорк (UTC-5)", value: "America/New_York", offset: -5 },
];

export function Onboarding() {
  const { onboardingComplete, completeOnboarding } = usePreferencesStore();
  const [selectedTz, setSelectedTz] = useState("Europe/Moscow");
  const { setTimezone, shipUtcOffset } = useTimeStore();
  const t = useT();

  if (onboardingComplete) return null;

  const handleComplete = () => {
    const tz = timezones.find((t) => t.value === selectedTz);
    if (tz) {
      completeOnboarding(selectedTz);
      setTimezone(shipUtcOffset, tz.offset);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-navy/90 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm shadow-2xl">
        <CardContent className="p-6 space-y-6">
          <div className="text-center">
            <Ship className="w-12 h-12 text-gold mx-auto mb-3" />
            <h2 className="font-heading text-xl font-bold text-navy">
              {t("onboarding.welcome")}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {t("onboarding.subtitle")}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-navy flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-gold" />
              {t("onboarding.timezone")}
            </label>
            <select
              value={selectedTz}
              onChange={(e) => setSelectedTz(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-ocean-dark bg-white text-sm text-navy focus:outline-none focus:ring-2 focus:ring-gold/50"
            >
              {timezones.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>

          <Button
            className="w-full bg-gold hover:bg-gold-light text-navy font-semibold"
            onClick={handleComplete}
          >
            {t("onboarding.start")}
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

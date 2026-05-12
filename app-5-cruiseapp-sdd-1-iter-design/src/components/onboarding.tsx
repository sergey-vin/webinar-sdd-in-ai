"use client";

import { useState, useEffect } from "react";
import { Globe, ChevronRight, Anchor } from "lucide-react";
import { useTimezoneStore } from "@/store/timezone-store";

const timezones = [
  { label: "UTC+1 (CET)", value: "UTC+1 (CET)", city: "Berlin, Paris, Rome" },
  { label: "UTC+2 (EET)", value: "UTC+2 (EET)", city: "Helsinki, Tallinn, Riga" },
  { label: "UTC+3 (MSK)", value: "UTC+3 (MSK)", city: "Moscow, St. Petersburg" },
  { label: "UTC+0 (GMT)", value: "UTC+0 (GMT)", city: "London, Lisbon" },
  { label: "UTC-5 (EST)", value: "UTC-5 (EST)", city: "New York, Miami" },
];

export function Onboarding() {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState("UTC+2 (CET)");
  const { setHomeTimezone } = useTimezoneStore();

  useEffect(() => {
    const done = localStorage.getItem("cruiseapp-onboarded");
    if (!done) setShow(true);
  }, []);

  if (!show) return null;

  const finish = () => {
    setHomeTimezone(selected);
    localStorage.setItem("cruiseapp-onboarded", "true");
    setShow(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end bg-ink/60 backdrop-blur-sm">
      <div className="w-full rounded-t-[28px] bg-bg px-5 pb-8 pt-6">
        {/* Header */}
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white">
            <Anchor className="h-7 w-7" />
          </div>
          <h2 className="font-display text-2xl">Welcome aboard!</h2>
          <p className="text-sm text-ink-3">
            Set your home timezone so we can show you both ship time and your local time.
          </p>
        </div>

        {/* Timezone picker */}
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-4">
            <Globe className="h-3.5 w-3.5" />
            Your home timezone
          </div>
          <div className="space-y-1.5">
            {timezones.map((tz) => (
              <button
                key={tz.value}
                onClick={() => setSelected(tz.value)}
                className={`flex w-full items-center justify-between rounded-radius-md border p-3 text-left transition-colors ${
                  selected === tz.value
                    ? "border-brand bg-brand-soft/40"
                    : "border-hairline bg-surface"
                }`}
              >
                <div>
                  <div className="text-sm font-medium text-ink">{tz.label}</div>
                  <div className="text-[11px] text-ink-4">{tz.city}</div>
                </div>
                {selected === tz.value && (
                  <div className="h-2.5 w-2.5 rounded-full bg-brand" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={finish}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-brand py-3.5 text-sm font-semibold text-white"
        >
          Continue
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

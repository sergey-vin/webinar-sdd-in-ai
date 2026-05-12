"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import {
  Car,
  Footprints,
  TramFront,
  MapPin,
  Clock,
  ChevronRight,
  Info,
  CheckCircle,
  ArrowRightLeft,
} from "lucide-react";

import terminalData from "../../../public/data/terminal.json";

type Direction = "departure" | "arrival";

const modeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  car: Car,
  taxi: Car,
  transit: TramFront,
  walk: Footprints,
};

interface RouteOption {
  id: string;
  mode: string;
  title: string;
  duration: string;
  cost: string;
  detail: string;
  steps: { instruction: string; distance: string }[];
}

export default function LogisticsPage() {
  const [direction, setDirection] = useState<Direction>("departure");
  const [expandedRoute, setExpandedRoute] = useState<string | null>(null);

  const data = terminalData[direction];

  return (
    <div>
      <Header title="Logistics" subtitle="Terminal routes & info" />

      <div className="px-5">
        {/* Direction toggle */}
        <div className="mb-5 flex gap-2 rounded-full border border-hairline bg-surface p-1">
          <button
            onClick={() => { setDirection("departure"); setExpandedRoute(null); }}
            className={`flex-1 rounded-full py-2 text-sm font-medium transition-colors ${
              direction === "departure"
                ? "bg-ink text-white"
                : "text-ink-3"
            }`}
          >
            To Terminal
          </button>
          <button
            onClick={() => { setDirection("arrival"); setExpandedRoute(null); }}
            className={`flex-1 rounded-full py-2 text-sm font-medium transition-colors ${
              direction === "arrival"
                ? "bg-ink text-white"
                : "text-ink-3"
            }`}
          >
            From Terminal
          </button>
        </div>

        {/* Terminal info card */}
        <div className="mb-5 rounded-radius-lg border border-hairline bg-surface p-4">
          <div className="mb-2 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-brand" />
            <span className="text-sm font-semibold text-ink">{data.terminal}</span>
          </div>
          <div className="mb-3 text-xs text-ink-3">{data.address}</div>

          {direction === "departure" && "checkinOpens" in data && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <Clock className="h-3.5 w-3.5 text-ink-4" />
                <span className="text-ink-3">
                  Check-in: {data.checkinOpens} – {data.checkinCloses}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <ArrowRightLeft className="h-3.5 w-3.5 text-ink-4" />
                <span className="text-ink-3">
                  Boarding starts: {data.boardingStarts}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* What to bring / Rules (departure only) */}
        {direction === "departure" && "whatToBring" in data && (
          <>
            <div className="mb-4">
              <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-ink">
                <CheckCircle className="h-4 w-4 text-good" />
                What to bring
              </h3>
              <ul className="space-y-1.5 pl-6">
                {data.whatToBring.map((item: string) => (
                  <li key={item} className="text-xs text-ink-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-5">
              <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-ink">
                <Info className="h-4 w-4 text-warn" />
                Rules
              </h3>
              <ul className="space-y-1.5 pl-6">
                {data.rules.map((rule: string) => (
                  <li key={rule} className="text-xs text-ink-3">
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* Route options */}
        <h2 className="mb-3 font-display text-lg">Route options</h2>
        <div className="space-y-3">
          {data.routeOptions.map((route: RouteOption) => {
            const Icon = modeIcons[route.mode] || Car;
            const isExpanded = expandedRoute === route.id;

            return (
              <div
                key={route.id}
                className="rounded-radius-md border border-hairline bg-surface"
              >
                <button
                  onClick={() =>
                    setExpandedRoute(isExpanded ? null : route.id)
                  }
                  className="flex w-full items-center justify-between p-3 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-brand">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-ink">
                        {route.title}
                      </div>
                      <div className="text-[11px] text-ink-4">
                        {route.detail}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="text-xs font-semibold text-ink">
                        {route.duration}
                      </div>
                      <div className="text-[11px] text-ink-4">{route.cost}</div>
                    </div>
                    <ChevronRight
                      className={`h-4 w-4 text-ink-4 transition-transform ${
                        isExpanded ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-hairline px-4 py-3">
                    <div className="space-y-2.5">
                      {route.steps.map((step, i) => (
                        <div key={i} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className="h-2 w-2 rounded-full border-2 border-brand bg-brand" />
                            {i < route.steps.length - 1 && (
                              <div className="w-px flex-1 bg-hairline-strong" />
                            )}
                          </div>
                          <div className="flex-1 pb-1">
                            <div className="text-xs text-ink">
                              {step.instruction}
                            </div>
                            {step.distance && (
                              <div className="text-[10px] text-ink-4">
                                {step.distance}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

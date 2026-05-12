import type { JourneyLeg } from "@/lib/types";
import {
  Plane,
  Ship,
  TramFront,
  Footprints,
  BedDouble,
  Bus,
  Car,
} from "lucide-react";

const modeIcons: Record<JourneyLeg["mode"], React.ComponentType<{ className?: string }>> = {
  plane: Plane,
  ship: Ship,
  tram: TramFront,
  walk: Footprints,
  bed: BedDouble,
  bus: Bus,
  taxi: Car,
};

interface JourneyTimelineProps {
  legs: JourneyLeg[];
}

export function JourneyTimeline({ legs }: JourneyTimelineProps) {
  return (
    <div className="space-y-0">
      {legs.map((leg, i) => {
        const Icon = modeIcons[leg.mode];
        const isLast = i === legs.length - 1;

        return (
          <div key={leg.id} className="flex gap-3">
            {/* Timeline spine */}
            <div className="flex flex-col items-center">
              <div
                className={`h-3 w-3 rounded-full border-2 ${
                  leg.status === "active"
                    ? "border-accent bg-accent"
                    : leg.status === "done"
                      ? "border-ink-5 bg-ink-5"
                      : "border-ink-5 bg-surface"
                }`}
              />
              {!isLast && (
                <div
                  className={`w-px flex-1 ${
                    leg.status === "done" ? "bg-ink-5" : "bg-hairline-strong"
                  }`}
                />
              )}
            </div>

            {/* Content */}
            <div
              className={`flex-1 pb-5 ${
                leg.status === "done" ? "opacity-50" : ""
              }`}
            >
              <div className="flex items-start gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-ink-3">
                    {leg.time}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-ink-4">
                    {leg.timezone}
                  </span>
                </div>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <Icon className="h-4 w-4 text-ink-3" />
                <span
                  className={`text-sm font-medium ${
                    leg.status === "active" ? "text-accent" : "text-ink"
                  }`}
                >
                  {leg.title}
                </span>
              </div>
              <div className="mt-0.5 text-xs text-ink-4">{leg.detail}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

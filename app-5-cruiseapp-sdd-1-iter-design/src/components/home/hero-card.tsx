import type { ShipStatus } from "@/lib/types";
import { Anchor, Clock, Gauge, Wind, Waves } from "lucide-react";

interface HeroCardProps {
  status: ShipStatus;
}

export function HeroCard({ status }: HeroCardProps) {
  return (
    <div className="relative overflow-hidden rounded-radius-xl bg-gradient-to-br from-brand to-brand-2 p-5 text-white">
      {/* Wave decoration */}
      <svg
        className="absolute bottom-0 left-0 right-0 opacity-10"
        viewBox="0 0 400 60"
        preserveAspectRatio="none"
      >
        <path
          d="M0 30 Q50 10 100 30 T200 30 T300 30 T400 30 V60 H0Z"
          fill="currentColor"
        />
      </svg>

      {/* Status pill */}
      <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide">
        <span className="h-1.5 w-1.5 animate-[pulse-dot_1.6s_ease-in-out_infinite] rounded-full bg-green-400" />
        {status.currentLocation}
      </div>

      {/* Timezone */}
      <div className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-white/60">
        Ship time · {status.timezone}
      </div>

      {/* Route */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wide text-white/60">
            {status.departurePort}
          </div>
          <div className="font-mono text-2xl font-medium tracking-tight">
            {status.departureTime}
          </div>
        </div>
        <div className="flex flex-1 items-center px-4">
          <div className="h-px flex-1 bg-white/30" />
          <Anchor className="mx-2 h-4 w-4 text-white/60" />
          <div className="h-px flex-1 bg-white/30" />
        </div>
        <div className="text-right">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-white/60">
            {status.arrivalPort}
          </div>
          <div className="font-mono text-2xl font-medium tracking-tight">
            {status.arrivalTime}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative mb-5 h-1.5 rounded-full bg-white/20">
        <div
          className="h-full rounded-full bg-accent transition-all"
          style={{ width: `${status.progress}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 text-sm"
          style={{ left: `${status.progress}%`, transform: `translateX(-50%) translateY(-50%)` }}
        >
          🚢
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        <Stat icon={<Clock className="h-3.5 w-3.5" />} label="ETA" value={status.eta} />
        <Stat icon={<Gauge className="h-3.5 w-3.5" />} label="Speed" value={status.speed} />
        <Stat icon={<Wind className="h-3.5 w-3.5" />} label="Wind" value={status.wind} />
        <Stat icon={<Waves className="h-3.5 w-3.5" />} label="Sea" value={status.seaState} />
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-radius-sm bg-white/10 px-2 py-2 text-center">
      <div className="text-white/60">{icon}</div>
      <div className="text-[10px] font-semibold uppercase tracking-wide text-white/50">
        {label}
      </div>
      <div className="text-xs font-semibold">{value}</div>
    </div>
  );
}

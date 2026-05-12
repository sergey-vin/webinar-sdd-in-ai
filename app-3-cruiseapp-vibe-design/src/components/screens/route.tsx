"use client";

import { useState } from "react";
import { MoreHorizontal, Footprints, TramFront, Bus, Car, BedDouble, ChevronRight, Plus, MapPin, Navigation } from "lucide-react";
import { TopBar, IconButton } from "@/components/shell/top-bar";
import { routeSteps, routeAlternatives } from "@/lib/mock-data";

const modeIcons: Record<string, typeof Footprints> = {
  walk: Footprints,
  tram: TramFront,
  bus: Bus,
  taxi: Car,
  bed: BedDouble,
};

export function RouteScreen() {
  const [activeAlt, setActiveAlt] = useState<number | null>(null);
  const [navStarted, setNavStarted] = useState(false);

  return (
    <>
      <TopBar title="To Telegraaf Hotel" subtitle="Door-to-door · 14:00 arrival" right={
        <IconButton label="More"><MoreHorizontal size={18} /></IconButton>
      } />

      <div className="flex-1 overflow-y-auto px-5 pb-24 no-scrollbar">
        {/* Map preview */}
        <div className="h-[180px] bg-[#E6EDE5] rounded-lg relative overflow-hidden mb-3.5">
          <svg viewBox="0 0 360 180" className="w-full h-full">
            <defs>
              <pattern id="water" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M0 10 Q5 6 10 10 T20 10" stroke="#B8D4E0" strokeWidth="0.8" fill="none" />
              </pattern>
            </defs>
            <rect width="360" height="80" fill="url(#water)" />
            <rect y="80" width="360" height="100" fill="#EEF2EA" />
            <path d="M0 80 Q60 75 120 82 T240 78 T360 80 L360 100 L0 100 Z" fill="#D8E2D2" />
            {/* Streets */}
            <path d="M40 110 L320 110" stroke="#fff" strokeWidth="3" />
            <path d="M120 80 L130 180" stroke="#fff" strokeWidth="2.5" />
            <path d="M220 80 L230 180" stroke="#fff" strokeWidth="2.5" />
            <path d="M40 140 L320 145" stroke="#fff" strokeWidth="2.5" />
            {/* Route path */}
            <path d="M50 50 Q100 60 150 90 L160 100 L185 110 L210 130" stroke="#0B3D5C" strokeWidth="3" strokeLinecap="round" fill="none">
              {navStarted && (
                <animate attributeName="stroke-dasharray" values="0 1000;1000 0" dur="3s" repeatCount="indefinite" />
              )}
            </path>
            <path d="M210 130 L260 142" stroke="#E8623A" strokeWidth="3" strokeLinecap="round" fill="none" strokeDasharray="4 4" />
            {/* Markers */}
            <circle cx="50" cy="50" r="6" fill="#0B3D5C" stroke="#fff" strokeWidth="2" />
            <text x="50" y="38" fontSize="9" fill="#0B3D5C" fontWeight="600" textAnchor="middle">Ship</text>
            <circle cx="160" cy="100" r="5" fill="#fff" stroke="#0B3D5C" strokeWidth="2" />
            <circle cx="210" cy="130" r="5" fill="#fff" stroke="#0B3D5C" strokeWidth="2" />
            <circle cx="260" cy="142" r="7" fill="#E8623A" stroke="#fff" strokeWidth="2" />
            <text x="260" y="160" fontSize="9" fill="#E8623A" fontWeight="600" textAnchor="middle">Hotel</text>
          </svg>
          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5">
            <button className="w-8 h-8 rounded-full bg-surface border border-hairline flex items-center justify-center shadow-sm"><Plus size={14} /></button>
            <button className="w-8 h-8 rounded-full bg-surface border border-hairline flex items-center justify-center shadow-sm"><MapPin size={14} /></button>
          </div>
        </div>

        {/* Summary card */}
        <div className="bg-surface border border-hairline rounded-lg mb-3.5 flex items-center gap-3.5 p-3.5">
          <div>
            <div className="font-mono text-[28px] font-semibold leading-none">26<span className="text-sm text-ink-3 font-medium"> min</span></div>
            <div className="text-[11px] text-ink-3 mt-1">arrives 12:56</div>
          </div>
          <div className="w-px h-9 bg-hairline" />
          <div className="flex gap-1.5 items-center flex-wrap">
            <ModePill icon={<Footprints size={12} />} label="6 min" />
            <ChevronRight size={10} className="text-ink-4" />
            <ModePill icon={<TramFront size={12} />} label="Tram 2 · 12 min" brand />
            <ChevronRight size={10} className="text-ink-4" />
            <ModePill icon={<Footprints size={12} />} label="8 min" />
          </div>
        </div>

        {/* Step-by-step */}
        <div className="flex items-baseline justify-between px-1 pb-2.5">
          <h2 className="font-display font-normal text-xl tracking-tight m-0">Steps</h2>
        </div>
        <div className="relative pl-1">
          <div className="absolute left-[13px] top-[18px] bottom-[18px] w-0.5 bg-hairline-strong" />
          {routeSteps.map((step, i) => {
            const Icon = modeIcons[step.mode] || Footprints;
            return (
              <div key={i} className={`flex gap-3.5 relative ${step.last ? "" : "pb-3.5"}`}>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 relative z-[1] ${
                    step.brand ? "bg-brand text-white" : step.final ? "bg-accent text-white" : "bg-surface border-2 border-ink-5 text-ink-3"
                  }`}
                >
                  <Icon size={14} />
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-xs text-ink-3">{step.time}</span>
                    <span className="text-sm font-semibold">{step.title}</span>
                  </div>
                  <div className="text-xs text-ink-3 mt-0.5" dangerouslySetInnerHTML={{ __html: step.sub }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Alternatives */}
        <div className="flex items-baseline justify-between px-1 pb-2.5 mt-[18px]">
          <h2 className="font-display font-normal text-xl tracking-tight m-0">Alternatives</h2>
        </div>
        <div className="grid gap-2.5">
          {routeAlternatives.map((alt, i) => {
            const isActive = activeAlt === i;
            return (
              <div
                key={i}
                className={`bg-surface border rounded-lg p-3 flex items-center gap-3 cursor-pointer transition-all duration-200 ${
                  isActive ? "border-brand shadow-sm" : "border-hairline hover:border-ink-5"
                }`}
                onClick={() => setActiveAlt(isActive ? null : i)}
              >
                <div className="flex gap-1 text-ink-3">
                  {alt.icons.map((icon, k) => {
                    const I = modeIcons[icon] || Footprints;
                    return <I key={k} size={12} />;
                  })}
                </div>
                <div className="flex-1 text-[13px] font-medium">{alt.label}</div>
                <div className="text-right">
                  <div className="font-mono text-[13px] font-semibold">{alt.dur}</div>
                  <div className="text-[11px] text-ink-3">{alt.cost}</div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => setNavStarted(!navStarted)}
          className={`w-full mt-4 py-3.5 rounded-full text-[15px] font-semibold transition-all duration-300 active:scale-[0.98] ${
            navStarted
              ? "bg-accent text-white"
              : "bg-brand text-white"
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <Navigation size={16} className={navStarted ? "animate-pulse" : ""} />
            {navStarted ? "Navigating…" : "Start navigation"}
          </span>
        </button>
      </div>
    </>
  );
}

function ModePill({ icon, label, brand }: { icon: React.ReactNode; label: string; brand?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-[5px] px-2.5 py-1 rounded-full text-[11px] font-semibold ${
      brand ? "bg-brand text-white" : "bg-surface-sunk text-ink-2"
    }`}>
      {icon}{label}
    </span>
  );
}

"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  QrCode,
  Map,
  Clock,
  CreditCard,
  Plane,
  Ship,
  TramFront,
  Footprints,
  BedDouble,
  Bus,
  MapPin,
  Utensils,
  Sparkles,
  Music,
  Download,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { IconButton } from "@/components/shell/top-bar";
import { tripTimeline, onboardActivities } from "@/lib/mock-data";
import type { TimelineEvent } from "@/lib/types";

const modeIcons: Record<string, typeof Plane> = {
  plane: Plane,
  ship: Ship,
  tram: TramFront,
  walk: Footprints,
  bed: BedDouble,
  bus: Bus,
  pin: MapPin,
};

const activityIcons: Record<string, typeof Utensils> = {
  utensils: Utensils,
  sparkles: Sparkles,
  music: Music,
};

// Simulate live progress: departure 10:30, arrival 12:30, total 120 min
function useShipProgress() {
  const [progress, setProgress] = useState(62);
  const [eta, setEta] = useState(49);
  const [speed, setSpeed] = useState(22.4);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + 0.15;
        return next > 98 ? 62 : next; // loop back for demo
      });
      setEta((e) => {
        const next = e - 0.18;
        return next < 1 ? 49 : next;
      });
      setSpeed((s) => {
        // Fluctuate ±0.3
        const delta = (Math.random() - 0.5) * 0.6;
        return Math.max(18, Math.min(26, s + delta));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return { progress, eta: Math.round(eta), speed: speed.toFixed(1) };
}

function useShipClock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const shipTime = new Date(now.getTime() + (3 * 60 + now.getTimezoneOffset()) * 60000);
      setTime(shipTime.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);
  return time;
}

export function TripTimeline({ onNavigate }: { onNavigate?: (screen: string) => void }) {
  const { progress, eta, speed } = useShipProgress();
  const shipClock = useShipClock();
  const [windDir, setWindDir] = useState("SW");
  const [windSpeed, setWindSpeed] = useState("6");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setWindDir(["SW", "S", "SSW", "W"][Math.floor(Math.random() * 4)]);
    setWindSpeed((5 + Math.random() * 4).toFixed(0));
  }, []);

  return (
    <>
      <div className="flex items-center justify-between px-5 pt-2 pb-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <Avatar persona="solo" size={36} />
          <div>
            <div className="text-[11px] text-ink-4 uppercase tracking-[0.06em] font-semibold">
              Trip · Day 2 of 5
            </div>
            <div className="text-[15px] font-semibold mt-0.5">Berlin → Tallinn</div>
          </div>
        </div>
        <IconButton label="Notifications">
          <Bell size={18} />
        </IconButton>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-24 no-scrollbar">
        {/* LIVE HERO */}
        <div className="relative overflow-hidden rounded-xl p-5 pb-[18px] mb-4 text-white"
          style={{ background: "linear-gradient(155deg, var(--brand) 0%, #07293F 100%)" }}>
          {/* Wave decoration */}
          <svg viewBox="0 0 400 200" className="absolute inset-0 w-full h-full opacity-18" preserveAspectRatio="none">
            <path d="M0 140 Q100 120 200 140 T400 140 V200 H0 Z" fill="#DCE7EE" />
            <path d="M0 160 Q100 145 200 160 T400 160 V200 H0 Z" fill="#fff" opacity="0.4" />
          </svg>

          <div className="flex items-center justify-between relative">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full bg-white/[0.18] text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5DDFB0] inline-block animate-[pulse-dot_1.6s_ease-in-out_infinite]" />
              At sea · Gulf of Finland
            </span>
            <span className="font-mono text-[11px] opacity-70 font-medium tabular-nums">{shipClock}</span>
          </div>

          <div className="mt-5 relative">
            <div className="flex items-start justify-between mb-2">
              <div className="min-w-0 flex-1">
                <div className="text-[11px] opacity-70 font-medium truncate">Helsinki · Länsisatama</div>
                <div className="text-xl font-semibold mt-0.5">10:30</div>
              </div>
              <div className="text-right min-w-0 flex-1">
                <div className="text-[11px] opacity-70 font-medium truncate">Tallinn · D-Terminal</div>
                <div className="text-xl font-semibold mt-0.5">12:30</div>
              </div>
            </div>

            {/* Progress bar — live animated */}
            <div className="relative pt-5 mt-1">
              <div
                className="absolute top-0 -translate-x-1/2 flex flex-col items-center transition-all duration-1000 ease-linear"
                style={{ left: `${progress}%` }}
              >
                <span className="flex items-center gap-1 bg-accent text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  <Ship size={10} strokeWidth={2} /> NOW
                </span>
              </div>
              <div className="h-0.5 bg-white/20 rounded-full relative">
                <div
                  className="absolute left-0 top-0 h-full bg-white rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${progress}%` }}
                />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/40" />
              </div>
            </div>
          </div>

          <div className="mt-[18px] pt-3.5 border-t border-white/[0.14] flex justify-between relative">
            <Stat label="ETA" value={`${eta} min`} accent />
            <Stat label="Speed" value={`${speed} kn`} />
            <Stat label="Wind" value={`${windDir} · ${windSpeed} m/s`} />
            <Stat label="Sea" value="Calm" />
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid grid-cols-4 gap-2 mb-1">
          <QuickAction icon={<QrCode size={20} />} label="Boarding" onClick={() => onNavigate?.("pass")} />
          <QuickAction icon={<Map size={20} />} label="Ship map" onClick={() => onNavigate?.("map")} />
          <QuickAction icon={<Clock size={20} />} label="Schedule" onClick={() => onNavigate?.("schedule")} />
          <QuickAction icon={<CreditCard size={20} />} label="Club" />
        </div>

        {/* TIMELINE */}
        <div className="flex items-baseline justify-between px-1 pb-2.5 mt-[18px]">
          <h2 className="font-display font-normal text-xl tracking-tight m-0">Your journey</h2>
          <span className="text-xs text-ink-3 font-medium cursor-pointer">Edit</span>
        </div>

        <div className="relative pl-1">
          <div className="absolute left-[13px] top-[18px] bottom-[18px] w-0.5 bg-hairline-strong rounded-sm z-0" />
          {tripTimeline.map((event, i) => (
            <TimelineRow key={i} {...event} />
          ))}
        </div>

        {/* WHILE ABOARD */}
        <div className="flex items-baseline justify-between px-1 pb-2.5 mt-[18px]">
          <h2 className="font-display font-normal text-xl tracking-tight m-0">While you&apos;re aboard</h2>
        </div>

        <div className="flex gap-2.5 overflow-x-auto -mx-5 px-5 pb-1.5 no-scrollbar">
          {onboardActivities.map((a, i) => {
            const Icon = activityIcons[a.icon] || Utensils;
            return (
              <div key={i} className="shrink-0 w-[150px] bg-surface border border-hairline rounded-md p-3 cursor-pointer hover:border-brand/30 transition-colors active:scale-[0.97]">
                <div
                  className={`w-8 h-8 rounded-[10px] flex items-center justify-center mb-2.5 ${
                    a.accent ? "bg-accent-soft text-accent" : "bg-brand-soft text-brand"
                  }`}
                >
                  <Icon size={18} />
                </div>
                <div className="text-[13px] font-semibold">{a.title}</div>
                <div className="text-[11px] text-ink-3 mt-0.5">{a.sub}</div>
                {a.badge && (
                  <div
                    className={`text-[10px] font-semibold mt-2 px-2 py-0.5 rounded-full inline-block ${
                      a.accent ? "bg-accent-soft text-accent" : "bg-surface-sunk text-ink-2"
                    }`}
                  >
                    {a.badge}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* OFFLINE PACK */}
        <div className="bg-surface border border-hairline rounded-lg mt-[18px] flex items-center gap-3.5 p-4">
          <div className="w-10 h-10 rounded-xl bg-brand-soft text-brand flex items-center justify-center shrink-0">
            <Download size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold">Offline pack ready</div>
            <div className="text-xs text-ink-3 mt-0.5">Tickets, ship map, Tallinn Old Town · 14.2 MB</div>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full bg-[color-mix(in_oklab,var(--good)_14%,transparent)] text-good">
            <span className="w-1.5 h-1.5 rounded-full bg-good inline-block animate-[pulse-dot_1.6s_ease-in-out_infinite]" />
            Synced
          </span>
        </div>
      </div>
    </>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <div className="text-[10px] opacity-65 font-medium uppercase tracking-[0.08em]">{label}</div>
      <div className={`text-sm font-semibold mt-0.5 tabular-nums transition-all duration-700 ${accent ? "text-[#FFB59A]" : "text-white"}`}>{value}</div>
    </div>
  );
}

function QuickAction({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-surface border border-hairline rounded-md py-3.5 px-1.5 flex flex-col items-center gap-1.5 cursor-pointer font-inherit text-ink-2 hover:bg-surface-2 transition-colors active:scale-95"
    >
      <span className="text-brand">{icon}</span>
      <span className="text-[11px] font-semibold text-ink-2">{label}</span>
    </button>
  );
}

function TimelineRow({ done, active, time, zone, mode, title, detail, last }: TimelineEvent) {
  const ModeIcon = modeIcons[mode] || MapPin;
  const dotBg = active ? "bg-accent" : done ? "bg-ink-3" : "bg-surface";
  const ringBg = active ? "bg-accent-soft" : "bg-transparent";
  const border = !done && !active ? "border-2 border-ink-5" : "";

  return (
    <div className={`flex gap-3.5 relative z-[1] ${last ? "" : "pb-3.5"}`}>
      <div className="w-7 relative shrink-0 pt-0.5">
        <div className={`w-7 h-7 rounded-full ${ringBg} flex items-center justify-center relative`}>
          {active && (
            <div className="absolute inset-0 rounded-full bg-accent/20 animate-[pulse-dot_2s_ease-in-out_infinite]" />
          )}
          <div className={`w-3.5 h-3.5 rounded-full ${dotBg} ${border} flex items-center justify-center text-white`}>
            {(done || active) && <ModeIcon size={8} strokeWidth={2.5} />}
          </div>
        </div>
      </div>
      <div className={`flex-1 min-w-0 ${done ? "opacity-55" : ""}`}>
        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
          <span className="font-mono text-[11px] text-ink-3 font-medium">{time}</span>
          <span className="text-[10px] text-ink-4 font-semibold uppercase tracking-[0.08em]">{zone}</span>
          {active && (
            <span className="ml-auto text-[11px] font-semibold px-2.5 py-1 rounded-full bg-accent-soft text-accent">
              In progress
            </span>
          )}
        </div>
        <div className="text-sm font-semibold leading-tight">{title}</div>
        <div className="text-xs text-ink-3 mt-0.5">{detail}</div>
      </div>
    </div>
  );
}

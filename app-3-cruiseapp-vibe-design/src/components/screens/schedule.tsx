"use client";

import { useState } from "react";
import { Filter, Globe, Music, Utensils, Bell, Anchor, Clock, Sparkles, ShoppingBag, Baby, ChevronDown, ChevronUp } from "lucide-react";
import { TopBar, IconButton } from "@/components/shell/top-bar";
import { scheduleEvents, tzLabels, tzOffsets, chipFilterMap } from "@/lib/mock-data";
import type { TimezoneMode } from "@/lib/types";

const eventIcons: Record<string, typeof Music> = {
  music: Music,
  utensils: Utensils,
  bell: Bell,
  anchor: Anchor,
  sparkles: Sparkles,
  "shopping-bag": ShoppingBag,
  baby: Baby,
};

const chipFilters = ["All", "Music", "Food & bars", "Family", "Shops", "Spa"];

export function Schedule() {
  const [tz, setTz] = useState<TimezoneMode>("ship");
  const [activeChip, setActiveChip] = useState("All");
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);

  const shift = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    const h2 = (h + tzOffsets[tz] + 24) % 24;
    return `${String(h2).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

  const filteredEvents = scheduleEvents.filter((e) => {
    if (activeChip === "All") return true;
    const types = chipFilterMap[activeChip] || [];
    return types.includes(e.type);
  });

  const eventCount = (chip: string) => {
    if (chip === "All") return scheduleEvents.length;
    const types = chipFilterMap[chip] || [];
    return scheduleEvents.filter((e) => types.includes(e.type)).length;
  };

  return (
    <>
      <TopBar title="What's on board" subtitle="Today · Thursday" right={
        <IconButton label="Filter"><Filter size={18} /></IconButton>
      } />

      <div className="flex-1 overflow-y-auto px-5 pb-24 no-scrollbar">
        {/* TZ Switcher */}
        <div className="bg-surface border border-hairline rounded-lg p-3 mb-3.5">
          <div className="flex items-center gap-2 mb-2.5">
            <Globe size={14} />
            <span className="text-xs font-semibold">Showing times in</span>
            <span className="ml-auto text-[11px] font-semibold px-2.5 py-1 rounded-full bg-surface-sunk text-ink-2 transition-all">
              {tzLabels[tz]}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1 bg-surface-sunk rounded-full p-[3px]">
            {(["ship", "local", "home"] as const).map((k) => {
              const labels = { ship: "Ship", local: "Tallinn", home: "Berlin" };
              return (
                <button
                  key={k}
                  onClick={() => setTz(k)}
                  className={`py-[7px] px-2.5 rounded-full border-0 text-xs font-semibold cursor-pointer transition-all duration-200 ${
                    tz === k ? "bg-ink text-white shadow-sm" : "bg-transparent text-ink-2 hover:text-ink"
                  }`}
                >
                  {labels[k]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Day chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 no-scrollbar">
          {chipFilters.map((c) => (
            <button
              key={c}
              onClick={() => setActiveChip(c)}
              className={`shrink-0 px-3.5 py-2 rounded-full text-[13px] font-medium cursor-pointer border whitespace-nowrap transition-all duration-200 ${
                activeChip === c
                  ? "bg-ink text-white border-ink"
                  : "bg-surface text-ink-2 border-hairline hover:border-ink-5"
              }`}
            >
              {c} · {eventCount(c)}
            </button>
          ))}
        </div>

        {/* Events */}
        <div className="mt-4 relative pl-1">
          <div className="absolute left-[49px] top-[18px] bottom-[18px] w-px bg-hairline-strong" />
          {filteredEvents.length === 0 ? (
            <div className="py-8 text-center text-ink-4 text-sm">No events in this category</div>
          ) : (
            filteredEvents.map((e, i) => {
              const Icon = eventIcons[e.icon] || Bell;
              const isExpanded = expandedEvent === i;
              return (
                <div
                  key={`${activeChip}-${i}`}
                  className={`flex gap-3.5 pb-3.5 cursor-pointer transition-all duration-200 ${isExpanded ? "bg-surface-2 -mx-2 px-2 py-2 rounded-lg" : ""}`}
                  onClick={() => setExpandedEvent(isExpanded ? null : i)}
                >
                  <div className={`font-mono w-11 text-[13px] font-semibold pt-0.5 transition-colors ${e.highlight ? "text-accent" : "text-ink-2"}`}>
                    {shift(e.time)}
                  </div>
                  <div
                    className={`w-3.5 h-3.5 rounded-full shrink-0 mt-1 relative z-[1] transition-all ${
                      e.highlight ? "bg-accent" : e.anchor ? "bg-brand" : "bg-surface border-2 border-ink-5"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-ink-3"><Icon size={16} /></span>
                      <span className="text-sm font-semibold">{e.title}</span>
                      <span className="ml-auto text-ink-4">
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </span>
                    </div>
                    <div className="text-xs text-ink-3">{e.loc} · {e.dur}</div>
                    {e.highlight && (
                      <div className="mt-1.5 text-[11px] text-accent font-semibold">★ Recommended for you</div>
                    )}
                    {isExpanded && (
                      <div className="mt-2 pt-2 border-t border-hairline text-xs text-ink-3 space-y-1.5 animate-[fadeIn_0.15s_ease]">
                        <div>📍 {e.loc}</div>
                        <div>⏱ Duration: {e.dur}</div>
                        {!e.anchor && (
                          <button className="mt-1 px-3 py-1.5 bg-brand text-white rounded-full text-[11px] font-semibold">
                            Add to my schedule
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* TZ helper banner */}
        <div className="mt-2 p-3 bg-brand-soft text-brand rounded-md flex gap-2.5 items-start text-xs">
          <Clock size={16} className="shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            Ship clock advances 1 hour at <b>{shift("11:00")}</b> as we cross into Estonian time. Onboard times stay on ship clock; your phone will switch automatically when you disembark.
          </div>
        </div>
      </div>
    </>
  );
}

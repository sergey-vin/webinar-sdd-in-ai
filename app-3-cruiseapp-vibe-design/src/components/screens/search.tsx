"use client";

import { useState } from "react";
import { Filter, Ship, Plane, ArrowUpDown, ChevronDown, Leaf } from "lucide-react";
import { TopBar, IconButton } from "@/components/shell/top-bar";
import { searchResults } from "@/lib/mock-data";
import type { SearchResult } from "@/lib/mock-data";

type FilterTab = "all" | "ferry" | "plane";
type SortMode = "best" | "price" | "fastest";

export function SearchScreen() {
  const [tab, setTab] = useState<FilterTab>("all");
  const [sort, setSort] = useState<SortMode>("best");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const filtered = tab === "all" ? searchResults : searchResults.filter((r) => r.mode === tab);

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "price") return a.price - b.price;
    if (sort === "fastest") {
      const durMinutes = (d: string) => {
        const match = d.match(/(\d+)h\s*(\d+)/);
        return match ? parseInt(match[1]) * 60 + parseInt(match[2]) : 999;
      };
      return durMinutes(a.dur) - durMinutes(b.dur);
    }
    return 0; // "best" keeps original order
  });

  const tabs: { key: FilterTab; label: string }[] = [
    { key: "all", label: `All · ${searchResults.length}` },
    { key: "ferry", label: `Ferry · ${searchResults.filter((r) => r.mode === "ferry").length}` },
    { key: "plane", label: `Flight · ${searchResults.filter((r) => r.mode === "plane").length}` },
  ];

  return (
    <>
      <TopBar title="Helsinki → Tallinn" subtitle="Aggregator · 12 carriers" right={
        <IconButton label="Filter"><Filter size={18} /></IconButton>
      } />

      <div className="flex-1 overflow-y-auto px-5 pb-24 no-scrollbar">
        {/* Search summary */}
        <div className="bg-surface border border-hairline rounded-lg p-3.5 mb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex-1">
              <div className="text-[11px] text-ink-4 uppercase tracking-[0.06em] font-semibold">From</div>
              <div className="text-sm font-semibold mt-0.5">Helsinki <span className="text-ink-3 font-normal">· any port</span></div>
            </div>
            <button className="w-8 h-8 rounded-full bg-surface border border-hairline flex items-center justify-center text-ink-3 hover:bg-surface-2 transition-colors active:scale-95">
              <ArrowUpDown size={14} />
            </button>
            <div className="flex-1 text-right">
              <div className="text-[11px] text-ink-4 uppercase tracking-[0.06em] font-semibold">To</div>
              <div className="text-sm font-semibold mt-0.5">Tallinn <span className="text-ink-3 font-normal">· city</span></div>
            </div>
          </div>
          <div className="h-px bg-hairline my-3" />
          <div className="flex items-center gap-3.5 text-[13px]">
            <span className="font-semibold">Thu 14 Mar</span>
            <span className="text-ink-3">·</span>
            <span>1 adult</span>
            <span className="text-ink-3">·</span>
            <span>One way</span>
          </div>
        </div>

        {/* Mode tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar mb-2.5">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => { setTab(key); setSelectedIdx(null); }}
              className={`shrink-0 px-3.5 py-2 rounded-full text-[13px] font-medium cursor-pointer border whitespace-nowrap transition-all duration-200 ${
                tab === key
                  ? "bg-ink text-white border-ink"
                  : "bg-surface text-ink-2 border-hairline hover:border-ink-5"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex justify-between items-center px-1 pb-2.5 text-xs">
          <span className="text-ink-3">{sorted.length} options · door-to-door</span>
          <button
            className="font-semibold flex items-center gap-1"
            onClick={() => setSort(sort === "best" ? "price" : sort === "price" ? "fastest" : "best")}
          >
            Sort: {sort === "best" ? "Best" : sort === "price" ? "Price ↑" : "Fastest"} <ChevronDown size={12} />
          </button>
        </div>

        {/* Results */}
        <div className="flex flex-col gap-2.5">
          {sorted.map((r, i) => (
            <ResultCard
              key={`${tab}-${sort}-${i}`}
              {...r}
              selected={selectedIdx === i}
              onSelect={() => setSelectedIdx(selectedIdx === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function ResultCard({ mode, carrier, dep, arr, dur, price, badge, co2, from, to, selected, onSelect }: SearchResult & { selected: boolean; onSelect: () => void }) {
  const ModeIcon = mode === "ferry" ? Ship : Plane;
  return (
    <div
      className={`bg-surface border rounded-lg p-3.5 cursor-pointer transition-all duration-200 ${
        selected ? "border-brand shadow-md scale-[1.01]" : "border-hairline hover:border-ink-5"
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-2 mb-2.5">
        <div className="w-[26px] h-[26px] rounded-lg bg-brand-soft text-brand flex items-center justify-center shrink-0">
          <ModeIcon size={15} />
        </div>
        <span className="text-[13px] font-semibold">{carrier}</span>
        {badge && (
          <span className="ml-auto text-[11px] font-semibold px-2.5 py-1 rounded-full bg-accent-soft text-accent">
            {badge}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2.5">
        <div>
          <div className="font-mono text-lg font-semibold">{dep}</div>
          <div className="text-[10px] text-ink-4 font-semibold uppercase tracking-[0.06em]">{from}</div>
        </div>
        <div className="flex-1 relative text-center">
          <div className="text-[10px] text-ink-3 font-semibold mb-1">{dur}</div>
          <div className="h-px bg-hairline-strong relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full bg-ink-3" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full bg-ink-3" />
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-lg font-semibold">{arr}</div>
          <div className="text-[10px] text-ink-4 font-semibold uppercase tracking-[0.06em]">{to}</div>
        </div>
      </div>

      <div className="h-px bg-hairline my-3" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] text-ink-3">
          <Leaf size={12} /> CO₂ {co2}
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-[11px] text-ink-3">from</span>
          <span className="text-xl font-semibold">€{price}</span>
        </div>
      </div>

      {selected && (
        <div className="mt-3 pt-3 border-t border-hairline animate-[fadeIn_0.15s_ease]">
          <button className="w-full py-3 bg-brand text-white rounded-full text-sm font-semibold active:scale-[0.98] transition-transform">
            Book this trip
          </button>
        </div>
      )}
    </div>
  );
}

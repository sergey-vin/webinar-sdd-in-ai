"use client";

import { useState } from "react";
import { Share2, Anchor } from "lucide-react";
import { TopBar, IconButton } from "@/components/shell/top-bar";
import { Avatar } from "@/components/ui/avatar";
import { clubPerks, clubActivities } from "@/lib/mock-data";

export function ClubCardScreen() {
  const [showAllActivity, setShowAllActivity] = useState(false);
  const visibleActivities = showAllActivity ? clubActivities : clubActivities.slice(0, 3);

  return (
    <>
      <TopBar title="Club card" subtitle="Loyalty" right={
        <IconButton label="Share"><Share2 size={18} /></IconButton>
      } />

      <div className="flex-1 overflow-y-auto px-5 pb-24 no-scrollbar">
        {/* Loyalty card */}
        <div
          className="rounded-[22px] text-white p-5 relative overflow-hidden shadow-lg"
          style={{
            aspectRatio: "1.586",
            background: "linear-gradient(135deg, #0E1A2B 0%, #1B5A82 60%, #2C7AAB 100%)",
          }}
        >
          {/* Embossed wave */}
          <svg viewBox="0 0 400 250" className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
            <path d="M0 120 C100 80, 200 180, 400 100 L400 250 L0 250 Z" fill="rgba(255,255,255,0.15)" />
            <path d="M0 160 C100 130, 200 210, 400 150 L400 250 L0 250 Z" fill="rgba(255,255,255,0.08)" />
          </svg>

          <div className="flex justify-between items-start relative">
            <div>
              <div className="text-[11px] opacity-70 font-semibold tracking-[0.1em]">CUTHERE</div>
              <div className="font-display text-2xl mt-1">Captain</div>
            </div>
            <Anchor size={28} />
          </div>

          <div className="absolute bottom-[18px] left-5 right-5">
            <div className="font-mono text-[15px] tracking-[0.18em] opacity-90">4421 ·· 8870 ·· 1102</div>
            <div className="flex justify-between items-end mt-2">
              <div>
                <div className="text-[9px] opacity-60 font-semibold tracking-[0.1em]">MEMBER SINCE</div>
                <div className="text-[13px] font-semibold mt-0.5">2021</div>
              </div>
              <div className="text-right">
                <div className="text-[9px] opacity-60 font-semibold tracking-[0.1em]">ANNA LINDQVIST</div>
                <div className="text-[13px] font-semibold mt-0.5">Tier valid · Dec 2026</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tier progress */}
        <div className="bg-surface border border-hairline rounded-lg p-4 mt-4">
          <div className="flex justify-between mb-2.5">
            <div>
              <div className="text-sm font-semibold">Captain → Admiral</div>
              <div className="text-xs text-ink-3 mt-0.5">2 trips to next tier</div>
            </div>
            <div className="text-right">
              <div className="font-mono text-lg font-semibold">8/10</div>
              <div className="text-[11px] text-ink-3">this year</div>
            </div>
          </div>
          <div className="h-1.5 bg-surface-sunk rounded-full overflow-hidden">
            <div className="h-full bg-accent rounded-full transition-all duration-1000" style={{ width: "80%" }} />
          </div>
        </div>

        {/* Active perks */}
        <div className="flex items-baseline justify-between px-1 pb-2.5 mt-[18px]">
          <h2 className="font-display font-normal text-xl tracking-tight m-0">Active perks</h2>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {clubPerks.map((perk, i) => (
            <div
              key={i}
              className={`p-3.5 rounded-md border cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                perk.accent
                  ? "bg-accent-soft border-accent/20"
                  : "bg-surface border-hairline"
              }`}
            >
              <div className={`text-[13px] font-semibold ${perk.accent ? "text-accent" : "text-ink"}`}>{perk.title}</div>
              <div className="text-[11px] text-ink-3 mt-0.5">{perk.sub}</div>
            </div>
          ))}
        </div>

        {/* Recent activity */}
        <div className="flex items-baseline justify-between px-1 pb-2.5 mt-[18px]">
          <h2 className="font-display font-normal text-xl tracking-tight m-0">Recent activity</h2>
          <button
            className="text-xs text-ink-3 font-medium cursor-pointer"
            onClick={() => setShowAllActivity(!showAllActivity)}
          >
            {showAllActivity ? "Show less" : "Show all"}
          </button>
        </div>
        <div className="bg-surface border border-hairline rounded-lg overflow-hidden">
          {visibleActivities.map((a, i) => (
            <div key={i}>
              {i > 0 && <div className="h-px bg-hairline" />}
              <div className="px-4 py-3 flex items-center gap-3">
                <div className="font-mono text-[11px] text-ink-3 w-7">{a.date}</div>
                <div className="flex-1 text-[13px] font-medium">{a.title}</div>
                <div className="font-mono text-[13px] font-semibold text-good">{a.pts}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Total points */}
        <div className="bg-surface border border-hairline rounded-lg p-4 mt-3 flex items-center justify-between">
          <div>
            <div className="text-xs text-ink-3">Total points balance</div>
            <div className="font-mono text-2xl font-semibold mt-0.5">4,280</div>
          </div>
          <button className="px-4 py-2 bg-brand text-white rounded-full text-sm font-semibold active:scale-95 transition-transform">
            Redeem
          </button>
        </div>
      </div>
    </>
  );
}

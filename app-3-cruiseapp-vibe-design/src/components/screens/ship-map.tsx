"use client";

import { useState } from "react";
import { Search, Utensils, Sparkles, BedDouble, Ticket, Music, ChevronRight } from "lucide-react";
import { TopBar, IconButton } from "@/components/shell/top-bar";
import { deckLayouts } from "@/lib/mock-data";
import type { DeckRoom } from "@/lib/types";

const destIcons: Record<string, typeof Utensils> = {
  utensils: Utensils,
  sparkles: Sparkles,
  "bed-double": BedDouble,
  music: Music,
};

const decks = [10, 9, 8, 7, 6, 5, 4];

export function ShipMap() {
  const [deck, setDeck] = useState(7);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const deckData = deckLayouts[deck];
  const youPos = deckData.youAreHerePos;

  return (
    <>
      <TopBar
        title="Ship map"
        subtitle={`MS Megastar · Deck ${deck}`}
        right={
          <IconButton label="Search"><Search size={18} /></IconButton>
        }
      />

      <div className="flex-1 overflow-y-auto px-5 pb-24 no-scrollbar">
        {/* Deck switcher */}
        <div className="flex gap-1.5 mb-3.5">
          {decks.map((d) => (
            <button
              key={d}
              onClick={() => { setDeck(d); setSelectedRoom(null); }}
              className={`flex-1 py-2.5 rounded-[10px] text-xs font-semibold cursor-pointer transition-all duration-200 border ${
                d === deck
                  ? "bg-ink text-white border-ink scale-105"
                  : "bg-surface text-ink-3 border-hairline hover:border-ink-5"
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Ship plan */}
        <div className="bg-[#EAF1F4] rounded-lg p-4 relative h-[280px] overflow-hidden transition-all duration-300">
          <svg viewBox="0 0 360 240" className="w-full h-full">
            <defs>
              <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(11,61,92,0.08)" strokeWidth="2" />
              </pattern>
            </defs>

            {/* Hull */}
            <path
              d="M30 60 Q40 30 80 28 H290 Q330 30 340 60 V180 Q330 210 290 212 H80 Q40 210 30 180 Z"
              fill="#fff"
              stroke="#0B3D5C"
              strokeWidth="1.5"
            />

            {/* Corridor */}
            <path d="M30 120 H340" stroke="#C4CBD3" strokeWidth="1" strokeDasharray="3 3" />

            {/* Rooms — interactive */}
            {deckData.rooms.map((room, i) => (
              <RoomBlock
                key={`${deck}-${i}`}
                {...room}
                selected={selectedRoom === room.label}
                onTap={() => setSelectedRoom(selectedRoom === room.label ? null : room.label)}
              />
            ))}

            {/* You are here pulse — only on deck 7 */}
            {youPos && (
              <>
                <circle cx={youPos.cx} cy={youPos.cy} r="14" fill="rgba(232,98,58,0.15)">
                  <animate attributeName="r" values="10;18;10" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0;0.6" dur="2.4s" repeatCount="indefinite" />
                </circle>
                <circle cx={youPos.cx} cy={youPos.cy} r="6" fill="#E8623A" stroke="#fff" strokeWidth="2" />
              </>
            )}

            {/* Bow label */}
            <text x="175" y="20" fontSize="10" fill="#5A6776" textAnchor="middle" fontWeight="600" letterSpacing="2">
              BOW →
            </text>
          </svg>
        </div>

        {/* Selected room detail */}
        {selectedRoom && (
          <div className="mt-3 bg-accent-soft border border-accent/20 rounded-lg p-3 flex items-center gap-3 animate-[fadeIn_0.2s_ease]">
            <div className="w-9 h-9 rounded-[10px] bg-accent text-white flex items-center justify-center shrink-0">
              <Search size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-accent">{selectedRoom}</div>
              <div className="text-xs text-ink-3 mt-0.5">Deck {deck} · Tap for directions</div>
            </div>
            <ChevronRight size={16} className="text-accent" />
          </div>
        )}

        {/* Get me to... */}
        <div className="flex items-baseline justify-between px-1 pb-2.5 mt-[18px]">
          <h2 className="font-display font-normal text-xl tracking-tight m-0">Get me to…</h2>
        </div>
        <div className="grid gap-2">
          {deckData.destinations.map((d, i) => {
            const Icon = destIcons[d.icon] || Utensils;
            return (
              <div key={`${deck}-${i}`} className="bg-surface border border-hairline rounded-lg flex items-center gap-3 p-3 cursor-pointer hover:border-brand/30 transition-colors active:scale-[0.98]">
                <div className="w-9 h-9 rounded-[10px] bg-brand-soft text-brand flex items-center justify-center shrink-0">
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold">{d.title}</div>
                  <div className="text-xs text-ink-3 mt-0.5">{d.sub}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm font-semibold">{d.eta}</div>
                  <div className="text-[10px] text-ink-4 uppercase tracking-[0.06em] font-semibold">walk</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* On this deck */}
        <div className="flex items-baseline justify-between px-1 pb-2.5 mt-[18px]">
          <h2 className="font-display font-normal text-xl tracking-tight m-0">On this deck</h2>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-surface border border-hairline rounded-lg p-3.5">
            <div className="text-brand mb-2"><Utensils size={20} /></div>
            <div className="text-sm font-semibold">{deckData.stats.venues} venues</div>
            <div className="text-[11px] text-ink-3 mt-0.5">{deckData.stats.venueLabel}</div>
          </div>
          <div className="bg-surface border border-hairline rounded-lg p-3.5">
            <div className="text-brand mb-2"><Ticket size={20} /></div>
            <div className="text-sm font-semibold">{deckData.stats.shops} shops</div>
            <div className="text-[11px] text-ink-3 mt-0.5">{deckData.stats.shopLabel}</div>
          </div>
        </div>
      </div>
    </>
  );
}

function RoomBlock({ x, y, w, h, label, sub, highlighted, youAreHere, small, selected, onTap }: DeckRoom & { selected?: boolean; onTap?: () => void }) {
  const isActive = selected || highlighted;
  const fill = selected ? "#E8623A" : highlighted ? "#FCE5DC" : youAreHere ? "#DCE7EE" : "#F4F1EB";
  const stroke = selected ? "#E8623A" : highlighted ? "#E8623A" : youAreHere ? "#0B3D5C" : "#C4CBD3";
  const strokeW = isActive || youAreHere ? 1.5 : 1;
  const textFill = selected ? "#fff" : "#0E1A2B";

  return (
    <g onClick={onTap} style={{ cursor: "pointer" }}>
      <rect
        x={x} y={y} width={w} height={h} rx="4"
        fill={fill} stroke={stroke} strokeWidth={strokeW}
        className="transition-all duration-200"
      />
      <text
        x={x + w / 2}
        y={y + h / 2 - (sub ? 4 : 0)}
        fontSize={small ? 9 : 11}
        fill={textFill}
        textAnchor="middle"
        dominantBaseline="middle"
        fontWeight="600"
      >
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 10} fontSize="8" fill={selected ? "#ffffffcc" : "#5A6776"} textAnchor="middle">
          {sub}
        </text>
      )}
    </g>
  );
}

"use client";

import type { DeckZone, ZoneType } from "@/lib/types";

const zoneColors: Record<ZoneType, { fill: string; stroke: string }> = {
  restaurant: { fill: "#fef3c7", stroke: "#f59e0b" },
  bar: { fill: "#ede9fe", stroke: "#8b5cf6" },
  pool: { fill: "#dbeafe", stroke: "#3b82f6" },
  theater: { fill: "#fce7f3", stroke: "#ec4899" },
  sport: { fill: "#fee2e2", stroke: "#ef4444" },
  kids: { fill: "#fce7f3", stroke: "#f472b6" },
  spa: { fill: "#d1fae5", stroke: "#10b981" },
  shop: { fill: "#e0e7ff", stroke: "#6366f1" },
  cabin: { fill: "#f1f5f9", stroke: "#94a3b8" },
  lobby: { fill: "#f0f7ff", stroke: "#1a365d" },
};

interface DeckMapProps {
  zones: DeckZone[];
  highlightZoneId?: string | null;
  onZoneClick: (zone: DeckZone) => void;
}

export function DeckMap({ zones, highlightZoneId, onZoneClick }: DeckMapProps) {
  return (
    <div className="bg-white rounded-xl border border-ocean-dark overflow-hidden">
      <svg viewBox="0 0 400 130" className="w-full h-auto">
        {/* Ship outline */}
        <path
          d="M 10 10 L 360 10 Q 395 10 395 40 L 395 90 Q 395 120 360 120 L 10 120 Q 5 120 5 90 L 5 40 Q 5 10 10 10 Z"
          fill="#f8fafc"
          stroke="#cbd5e1"
          strokeWidth="1.5"
          rx="8"
        />
        {/* Bow */}
        <path
          d="M 360 10 Q 395 10 395 40 L 395 90 Q 395 120 360 120"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="1"
          strokeDasharray="4 2"
        />

        {/* Zones */}
        {zones.map((zone) => {
          const colors = zoneColors[zone.type];
          const isHighlighted = zone.id === highlightZoneId;
          return (
            <g
              key={zone.id}
              onClick={() => onZoneClick(zone)}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
            >
              <rect
                x={zone.x}
                y={zone.y}
                width={zone.width}
                height={zone.height}
                rx={4}
                fill={isHighlighted ? colors.stroke : colors.fill}
                stroke={colors.stroke}
                strokeWidth={isHighlighted ? 2.5 : 1.5}
                className="transition-all duration-200 hover:opacity-80"
              />
              <text
                x={zone.x + zone.width / 2}
                y={zone.y + zone.height / 2}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={zone.width < 80 ? 6 : 7}
                fill={isHighlighted ? "#ffffff" : "#1a365d"}
                className="pointer-events-none select-none"
                fontWeight={500}
              >
                {zone.name.length > 20 ? zone.name.slice(0, 18) + "…" : zone.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

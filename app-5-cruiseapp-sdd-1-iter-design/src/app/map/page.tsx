"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/layout/header";
import { Search, Navigation } from "lucide-react";

import deckMapsData from "../../../public/data/deck-maps.json";

interface Zone {
  id: string;
  label: string;
  type: string;
  x: number;
  y: number;
  w: number;
  h: number;
  highlight?: boolean;
  youAreHere?: boolean;
}

interface DeckMap {
  deckNumber: number;
  name: string;
  zones: Zone[];
}

const deckMaps = deckMapsData as DeckMap[];

const zoneColors: Record<string, { bg: string; border: string }> = {
  restaurant: { bg: "#FCE5DC", border: "#E8623A" },
  bar: { bg: "#FCE5DC", border: "#E8623A" },
  cafe: { bg: "#FEF3C7", border: "#C68B12" },
  entertainment: { bg: "#DBEAFE", border: "#3B82F6" },
  shop: { bg: "#F3E8FF", border: "#8B5CF6" },
  spa: { bg: "#D1FAE5", border: "#2F7A5B" },
  pool: { bg: "#CFFAFE", border: "#0891B2" },
  fitness: { bg: "#D1FAE5", border: "#2F7A5B" },
  lounge: { bg: "#DCE7EE", border: "#0B3D5C" },
  cabin: { bg: "#F4F1EB", border: "#C4CBD3" },
  stairs: { bg: "#EFEBE2", border: "#8A95A3" },
  service: { bg: "#EFEBE2", border: "#8A95A3" },
  family: { bg: "#FEF3C7", border: "#C68B12" },
  outdoor: { bg: "#CFFAFE", border: "#0891B2" },
};

export default function MapPage() {
  const [selectedDeck, setSelectedDeck] = useState(6);
  const [search, setSearch] = useState("");
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);

  const deck = deckMaps.find((d) => d.deckNumber === selectedDeck)!;

  const allZones = useMemo(
    () => deckMaps.flatMap((d) => d.zones.map((z) => ({ ...z, deckNumber: d.deckNumber }))),
    []
  );

  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return allZones.filter(
      (z) => z.label.toLowerCase().includes(q) && z.type !== "stairs"
    );
  }, [search, allZones]);

  const quickDestinations = [
    { label: "Buffet Marina", deck: 7, eta: "3 min" },
    { label: "Spa Atlantis", deck: 8, eta: "5 min" },
    { label: "Cabin 8217", deck: 8, eta: "4 min" },
  ];

  return (
    <div>
      <Header title="Ship Map" subtitle={`Deck ${deck.deckNumber} · ${deck.name}`} />

      <div className="px-5">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-4" />
          <input
            type="text"
            placeholder="Search venues, restaurants, bars..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-hairline bg-surface py-2.5 pl-9 pr-4 text-sm text-ink placeholder:text-ink-4 focus:border-brand focus:outline-none"
          />
          {searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-48 overflow-y-auto rounded-radius-md border border-hairline bg-surface shadow-lg">
              {searchResults.map((z) => (
                <button
                  key={z.id}
                  onClick={() => {
                    setSelectedDeck(z.deckNumber);
                    setSearch("");
                    setSelectedZone(z);
                  }}
                  className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-surface-2"
                >
                  <span className="font-medium text-ink">{z.label}</span>
                  <span className="text-xs text-ink-4">Deck {z.deckNumber}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Deck selector */}
        <div className="no-scrollbar mb-4 flex gap-1.5 overflow-x-auto">
          {deckMaps.map((d) => (
            <button
              key={d.deckNumber}
              onClick={() => { setSelectedDeck(d.deckNumber); setSelectedZone(null); }}
              className={`flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedDeck === d.deckNumber
                  ? "bg-ink text-white"
                  : "border border-hairline bg-surface text-ink-2"
              }`}
            >
              {d.deckNumber}
            </button>
          ))}
        </div>

        {/* SVG Ship plan */}
        <div className="mb-4 overflow-hidden rounded-radius-lg border border-hairline bg-[#EAF1F4]">
          <svg viewBox="0 0 380 120" className="w-full">
            {/* Hull outline */}
            <path
              d="M15 55 Q15 15 50 15 L330 15 Q365 15 365 55 Q365 95 330 105 L50 105 Q15 95 15 55Z"
              fill="none"
              stroke="#0B3D5C"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              opacity={0.3}
            />
            {/* BOW label */}
            <text x="360" y="60" textAnchor="end" fontSize="8" fill="#8A95A3" fontWeight="600">
              BOW →
            </text>

            {/* Zones */}
            {deck.zones.map((zone) => {
              const colors = zoneColors[zone.type] || zoneColors.service;
              const isSelected = selectedZone?.id === zone.id;
              return (
                <g key={zone.id} onClick={() => setSelectedZone(zone)} className="cursor-pointer">
                  <rect
                    x={zone.x}
                    y={zone.y}
                    width={zone.w}
                    height={zone.h}
                    rx={4}
                    fill={zone.highlight ? "#FCE5DC" : colors.bg}
                    stroke={isSelected ? "#0B3D5C" : zone.highlight ? "#E8623A" : colors.border}
                    strokeWidth={isSelected ? 2 : 1}
                    opacity={0.9}
                  />
                  <text
                    x={zone.x + zone.w / 2}
                    y={zone.y + zone.h / 2}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={zone.w < 50 ? 5 : 7}
                    fill="#2C3A4E"
                    fontWeight="500"
                  >
                    {zone.label}
                  </text>
                  {zone.youAreHere && (
                    <>
                      <circle
                        cx={zone.x + zone.w / 2}
                        cy={zone.y + zone.h + 8}
                        r={4}
                        fill="#0B3D5C"
                      >
                        <animate
                          attributeName="r"
                          values="4;7;4"
                          dur="2.4s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="1;0.3;1"
                          dur="2.4s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle cx={zone.x + zone.w / 2} cy={zone.y + zone.h + 8} r={3} fill="#0B3D5C" />
                    </>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected zone info */}
        {selectedZone && (
          <div className="mb-4 rounded-radius-md border border-brand/20 bg-brand-soft/30 p-3">
            <div className="text-sm font-medium text-ink">{selectedZone.label}</div>
            <div className="text-xs text-ink-3 capitalize">{selectedZone.type}</div>
          </div>
        )}

        {/* Quick destinations */}
        <div className="mb-3 flex items-baseline justify-between px-1">
          <h2 className="font-display text-lg">Get me to</h2>
        </div>
        <div className="space-y-2">
          {quickDestinations.map((dest) => (
            <button
              key={dest.label}
              onClick={() => setSelectedDeck(dest.deck)}
              className="flex w-full items-center justify-between rounded-radius-md border border-hairline bg-surface p-3 text-left hover:bg-surface-2"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-soft text-brand">
                  <Navigation className="h-3.5 w-3.5" />
                </div>
                <div>
                  <div className="text-sm font-medium text-ink">{dest.label}</div>
                  <div className="text-[11px] text-ink-4">Deck {dest.deck}</div>
                </div>
              </div>
              <span className="text-xs font-medium text-ink-3">~{dest.eta}</span>
            </button>
          ))}
        </div>

        {/* Deck stats */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 rounded-radius-md border border-hairline bg-surface p-3">
            <span className="text-lg font-semibold text-brand">
              {deck.zones.filter((z) => !["cabin", "stairs"].includes(z.type)).length}
            </span>
            <span className="text-xs text-ink-3">venues</span>
          </div>
          <div className="flex items-center gap-2 rounded-radius-md border border-hairline bg-surface p-3">
            <span className="text-lg font-semibold text-brand">
              {deck.zones.filter((z) => z.type === "shop" || z.type === "cafe").length}
            </span>
            <span className="text-xs text-ink-3">shops</span>
          </div>
        </div>
      </div>
    </div>
  );
}

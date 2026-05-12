"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { deckVenues } from "@/lib/mock-data";
import type { DeckVenue } from "@/lib/types";

const DECKS = [4, 7, 9];
const DECK_NAMES: Record<number, string> = {
  4: "Main & Entertainment",
  7: "Cabins & Dining",
  9: "Pool & Recreation",
};

const TYPE_COLORS: Record<string, string> = {
  restaurant: "bg-orange-400",
  bar: "bg-purple-400",
  pool: "bg-cyan-400",
  theater: "bg-red-400",
  spa: "bg-pink-400",
  gym: "bg-green-400",
  shop: "bg-yellow-400",
  cabin: "bg-slate-300",
  kids: "bg-amber-400",
  lounge: "bg-indigo-400",
};

const TYPE_LABELS: Record<string, string> = {
  restaurant: "Restaurant",
  bar: "Bar",
  pool: "Pool",
  theater: "Theater",
  spa: "Spa",
  gym: "Gym",
  shop: "Shop",
  cabin: "Cabins",
  kids: "Kids",
  lounge: "Lounge",
};

export default function ShipMapPage() {
  const [activeDeck, setActiveDeck] = useState(9);
  const [selectedVenue, setSelectedVenue] = useState<DeckVenue | null>(null);
  const [search, setSearch] = useState("");

  const venues = deckVenues.filter((v) => v.deck === activeDeck);
  const searchResults = search
    ? deckVenues.filter((v) =>
        v.name.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-1">Ship Map</h1>
      <p className="text-sm text-muted-foreground mb-4">
        MS Ocean Dream — Tap a venue for details
      </p>

      {/* Search */}
      <Input
        placeholder="Search venues..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />

      {search && searchResults.length > 0 && (
        <div className="mb-4 space-y-2">
          {searchResults.map((v) => (
            <button
              key={v.id}
              className="w-full text-left p-2 rounded border hover:bg-muted text-sm"
              onClick={() => {
                setActiveDeck(v.deck);
                setSelectedVenue(v);
                setSearch("");
              }}
            >
              <span className="font-medium">{v.name}</span>
              <span className="text-muted-foreground"> — Deck {v.deck}</span>
            </button>
          ))}
        </div>
      )}

      {/* Deck selector */}
      <div className="flex gap-2 mb-4">
        {DECKS.map((deck) => (
          <button
            key={deck}
            onClick={() => {
              setActiveDeck(deck);
              setSelectedVenue(null);
            }}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              activeDeck === deck
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Deck {deck}
          </button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mb-2">
        {DECK_NAMES[activeDeck]}
      </p>

      {/* Ship SVG map */}
      <Card className="mb-4">
        <CardContent className="p-2">
          <svg
            viewBox="0 0 100 100"
            className="w-full"
            style={{ aspectRatio: "2/1" }}
          >
            {/* Ship outline */}
            <path
              d="M 5 50 Q 5 15 15 10 L 85 10 Q 95 15 98 50 Q 95 85 85 90 L 15 90 Q 5 85 5 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-muted-foreground/30"
            />
            {/* Bow indicator */}
            <text x="97" y="52" fontSize="3" className="fill-muted-foreground" textAnchor="end">
              BOW
            </text>
            <text x="8" y="52" fontSize="3" className="fill-muted-foreground">
              STERN
            </text>

            {/* Venues */}
            {venues.map((venue) => (
              <g key={venue.id} onClick={() => setSelectedVenue(venue)} className="cursor-pointer">
                <rect
                  x={venue.x}
                  y={venue.y}
                  width={venue.width}
                  height={venue.height}
                  rx="1"
                  className={`${
                    selectedVenue?.id === venue.id
                      ? "fill-primary/40 stroke-primary"
                      : "fill-muted/60 stroke-muted-foreground/30 hover:fill-primary/20"
                  } transition-colors`}
                  strokeWidth="0.5"
                />
                <text
                  x={venue.x + venue.width / 2}
                  y={venue.y + venue.height / 2}
                  fontSize="2.5"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-foreground pointer-events-none"
                >
                  {venue.name.length > 15
                    ? venue.name.slice(0, 13) + "..."
                    : venue.name}
                </text>
              </g>
            ))}

            {/* "You are here" marker (mock position: near cabin B-742) */}
            {activeDeck === 7 && (
              <g>
                <circle cx="45" cy="12" r="2" className="fill-red-500 animate-pulse" />
                <text x="45" y="8" fontSize="2" textAnchor="middle" className="fill-red-500 font-bold">
                  YOU
                </text>
              </g>
            )}
          </svg>
        </CardContent>
      </Card>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(TYPE_LABELS).map(([type, label]) => (
          <div key={type} className="flex items-center gap-1 text-xs">
            <div className={`w-2 h-2 rounded-full ${TYPE_COLORS[type]}`} />
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Selected venue details */}
      {selectedVenue && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold">{selectedVenue.name}</h3>
              <Badge variant="outline">Deck {selectedVenue.deck}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              {selectedVenue.description}
            </p>
            {selectedVenue.openHours && (
              <p className="text-sm">
                <span className="text-muted-foreground">Hours:</span>{" "}
                {selectedVenue.openHours}
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Venue list */}
      {!selectedVenue && (
        <div className="space-y-2">
          <h3 className="font-semibold text-sm">All venues on Deck {activeDeck}</h3>
          {venues.map((v) => (
            <button
              key={v.id}
              className="w-full text-left p-3 rounded-lg border hover:bg-muted transition-colors"
              onClick={() => setSelectedVenue(v)}
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${TYPE_COLORS[v.type]}`} />
                <span className="text-sm font-medium">{v.name}</span>
              </div>
              {v.openHours && (
                <p className="text-xs text-muted-foreground ml-4">
                  {v.openHours}
                </p>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

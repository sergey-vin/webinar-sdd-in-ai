"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Card } from "@/components/ui/card";
import {
  Utensils,
  Wine,
  Waves,
  Theater,
  Sparkles,
  ShoppingBag,
  Dumbbell,
  Sofa,
  Bed,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { parseCabinInfo } from "@/lib/cabin";
import { VenueEventsCard } from "./venue-events-card";
import type { Deck, Venue, VenueCategory } from "@/lib/types";

const categoryIcons: Record<VenueCategory, typeof Utensils> = {
  restaurant: Utensils,
  bar: Wine,
  pool: Waves,
  theater: Theater,
  spa: Sparkles,
  shop: ShoppingBag,
  gym: Dumbbell,
  lounge: Sofa,
  cabin_area: Bed,
  other: MoreHorizontal,
};

const categoryColors: Record<VenueCategory, string> = {
  restaurant: "#E8623A",
  bar: "#9333EA",
  pool: "#0EA5E9",
  theater: "#EC4899",
  spa: "#F472B6",
  shop: "#F59E0B",
  gym: "#22C55E",
  lounge: "#6366F1",
  cabin_area: "#94A3B8",
  other: "#6B7280",
};

const categoryEmoji: Record<VenueCategory, string> = {
  restaurant: "\u{1F37D}",
  bar: "\u{1F377}",
  pool: "\u{1F3CA}",
  theater: "\u{1F3AD}",
  spa: "\u2728",
  shop: "\u{1F6CD}",
  gym: "\u{1F4AA}",
  lounge: "\u{1F6CB}",
  cabin_area: "\u{1F6CF}",
  other: "\u{1F4CD}",
};

interface DeckWithVenues extends Deck {
  venues: Venue[];
}

export function DeckMap({
  vesselId,
  seatInfo,
}: {
  vesselId: string;
  seatInfo?: string | null;
}) {
  const t = useTranslations("trip");
  const locale = useLocale();
  const [decks, setDecks] = useState<DeckWithVenues[]>([]);
  const [activeDeck, setActiveDeck] = useState<number>(0);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);

  const cabin = parseCabinInfo(seatInfo);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: decksData } = await supabase
        .from("decks")
        .select("*")
        .eq("vessel_id", vesselId)
        .order("deck_number", { ascending: true });

      if (!decksData || decksData.length === 0) {
        setLoading(false);
        return;
      }

      const deckIds = decksData.map((d) => d.id);
      const { data: venuesData } = await supabase
        .from("venues")
        .select("*")
        .in("deck_id", deckIds);

      const decksWithVenues: DeckWithVenues[] = decksData.map((deck) => ({
        ...(deck as Deck),
        venues: ((venuesData ?? []) as Venue[]).filter(
          (v) => v.deck_id === deck.id,
        ),
      }));

      setDecks(decksWithVenues);
      // Default to cabin's deck if available, else first deck with venues
      if (cabin) {
        const cabinIdx = decksWithVenues.findIndex(
          (d) => d.deck_number === cabin.deckNumber,
        );
        if (cabinIdx >= 0) {
          setActiveDeck(cabinIdx);
          setLoading(false);
          return;
        }
      }
      const firstWithVenues = decksWithVenues.findIndex(
        (d) => d.venues.length > 0,
      );
      setActiveDeck(firstWithVenues >= 0 ? firstWithVenues : 0);
      setLoading(false);
    }
    load();
  }, [vesselId, cabin?.deckNumber]);

  if (loading) {
    return (
      <div className="p-4 animate-pulse space-y-3">
        <div className="h-8 bg-surface-sunk rounded w-1/3" />
        <div className="h-48 bg-surface-sunk rounded" />
      </div>
    );
  }

  if (decks.length === 0) {
    return (
      <div className="p-4 text-center text-ink-3 text-sm">
        No deck data available
      </div>
    );
  }

  const currentDeck = decks[activeDeck];
  const deckName =
    locale === "ru" ? currentDeck.name_ru : currentDeck.name_en;
  const showCabin = cabin && currentDeck.deck_number === cabin.deckNumber;

  return (
    <div data-testid="deck-map" className="space-y-4">
      {/* Deck tabs */}
      <div
        data-testid="deck-tabs"
        className="flex items-center gap-1 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide"
      >
        {decks.map((deck, i) => {
          const isCabinDeck = cabin && deck.deck_number === cabin.deckNumber;
          return (
            <button
              key={deck.id}
              data-testid={`deck-tab-${deck.deck_number}`}
              onClick={() => {
                setActiveDeck(i);
                setSelectedVenue(null);
              }}
              className={`whitespace-nowrap px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                i === activeDeck
                  ? "bg-brand text-white"
                  : isCabinDeck
                    ? "bg-teal-50 text-teal-700 border border-teal-200"
                    : "bg-surface-sunk text-ink-3"
              }`}
            >
              {deck.deck_number}
              {isCabinDeck && " \u{1F6CF}"}
            </button>
          );
        })}
      </div>

      {/* Deck name + nav */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-sm text-ink">{deckName}</h2>
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              setActiveDeck(Math.max(0, activeDeck - 1));
              setSelectedVenue(null);
            }}
            disabled={activeDeck === 0}
            className="p-1 rounded-md disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4 text-ink-3" />
          </button>
          <button
            onClick={() => {
              setActiveDeck(Math.min(decks.length - 1, activeDeck + 1));
              setSelectedVenue(null);
            }}
            disabled={activeDeck === decks.length - 1}
            className="p-1 rounded-md disabled:opacity-30"
          >
            <ChevronRight className="w-4 h-4 text-ink-3" />
          </button>
        </div>
      </div>

      {/* SVG Deck layout */}
      <Card className="p-2 bg-white overflow-hidden">
        <svg
          viewBox="0 0 500 280"
          className="w-full h-auto"
          data-testid="deck-svg"
        >
          {/* Ship outline */}
          <path
            d="M 40 50 Q 40 25 70 25 L 420 25 Q 470 25 485 70 L 490 140 L 485 210 Q 470 255 420 255 L 70 255 Q 40 255 40 230 Z"
            fill="#F8F6F1"
            stroke="#D1CBC0"
            strokeWidth="1.5"
          />
          {/* Bow curve */}
          <path
            d="M 420 25 Q 500 140 420 255"
            fill="none"
            stroke="#D1CBC0"
            strokeWidth="1.5"
          />

          {/* Central corridor */}
          <rect
            x="60"
            y="125"
            width="380"
            height="30"
            rx="4"
            fill="#EFEBE2"
            stroke="#E5E0D8"
            strokeWidth="0.5"
          />
          <line
            x1="70"
            y1="140"
            x2="430"
            y2="140"
            stroke="#D1CBC0"
            strokeWidth="0.5"
            strokeDasharray="3 3"
          />

          {/* Cabin zones (port + starboard) */}
          <rect
            x="60"
            y="40"
            width="160"
            height="75"
            rx="4"
            fill="none"
            stroke="#D1CBC0"
            strokeWidth="0.5"
            strokeDasharray="4 2"
          />
          <text x="140" y="57" textAnchor="middle" fontSize="8" fill="#C4CBD3">
            {locale === "ru" ? "Каюты (лев.)" : "Cabins (port)"}
          </text>
          <rect
            x="60"
            y="165"
            width="160"
            height="75"
            rx="4"
            fill="none"
            stroke="#D1CBC0"
            strokeWidth="0.5"
            strokeDasharray="4 2"
          />
          <text x="140" y="232" textAnchor="middle" fontSize="8" fill="#C4CBD3">
            {locale === "ru" ? "Каюты (прав.)" : "Cabins (stbd)"}
          </text>

          {/* Venue zone rectangles */}
          {currentDeck.venues.map((venue) => {
            const vx = venue.x ?? 200;
            const vy = venue.y ?? 140;
            const color = categoryColors[venue.category];
            const isSelected = selectedVenue?.id === venue.id;
            const name = locale === "ru" ? venue.name_ru : venue.name_en;
            const shortName =
              name.length > 16 ? name.slice(0, 14) + "\u2026" : name;

            return (
              <g key={venue.id + "-zone"}>
                <rect
                  x={vx - 45}
                  y={vy - 28}
                  width="90"
                  height="56"
                  rx="6"
                  fill={isSelected ? color + "20" : color + "08"}
                  stroke={isSelected ? color : color + "40"}
                  strokeWidth={isSelected ? "1.5" : "0.5"}
                />
                <text
                  x={vx}
                  y={vy + 20}
                  textAnchor="middle"
                  fontSize="7"
                  fill={color}
                  fontWeight="500"
                >
                  {shortName}
                </text>
              </g>
            );
          })}

          {/* Venue hotspots */}
          {currentDeck.venues.map((venue) => {
            const vx = venue.x ?? 200;
            const vy = venue.y ?? 140;
            const color = categoryColors[venue.category];
            const isSelected = selectedVenue?.id === venue.id;

            return (
              <g
                key={venue.id}
                data-testid={`venue-${venue.id}`}
                onClick={() =>
                  setSelectedVenue(isSelected ? null : venue)
                }
                className="cursor-pointer"
              >
                {isSelected && (
                  <circle
                    cx={vx}
                    cy={vy}
                    r="22"
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    opacity="0.5"
                  />
                )}
                <circle cx={vx} cy={vy} r="14" fill={color} />
                <text
                  x={vx}
                  y={vy + 5}
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                >
                  {categoryEmoji[venue.category]}
                </text>
              </g>
            );
          })}

          {/* Cabin marker */}
          {showCabin && (
            <g data-testid="cabin-marker">
              <circle
                cx={cabin.x}
                cy={cabin.y}
                r="18"
                fill="#14B8A6"
                fillOpacity="0.15"
              >
                <animate
                  attributeName="r"
                  values="16;22;16"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={cabin.x} cy={cabin.y} r="14" fill="#14B8A6" />
              <text
                x={cabin.x}
                y={cabin.y + 5}
                textAnchor="middle"
                fill="white"
                fontSize="13"
              >
                {"\u{1F6CF}"}
              </text>
              <text
                x={cabin.x}
                y={cabin.y + 28}
                textAnchor="middle"
                fontSize="8"
                fill="#14B8A6"
                fontWeight="600"
              >
                {locale === "ru" ? "Ваша каюта" : "Your Cabin"}
              </text>
            </g>
          )}

          {/* Bow / Stern labels */}
          <text
            x="455"
            y="145"
            textAnchor="middle"
            fontSize="8"
            fill="#C4CBD3"
            fontWeight="500"
          >
            {locale === "ru" ? "Нос" : "Bow"}
          </text>
          <text
            x="52"
            y="145"
            textAnchor="middle"
            fontSize="8"
            fill="#C4CBD3"
            fontWeight="500"
          >
            {locale === "ru" ? "Корма" : "Stern"}
          </text>
        </svg>
      </Card>

      {/* Venue events card (when selected) */}
      {selectedVenue && (
        <VenueEventsCard
          venue={selectedVenue}
          vesselId={vesselId}
          locale={locale}
          onClose={() => setSelectedVenue(null)}
        />
      )}

      {/* Venue list */}
      {currentDeck.venues.length > 0 && (
        <div className="space-y-1" data-testid="venue-list">
          {currentDeck.venues.map((venue) => {
            const Icon = categoryIcons[venue.category];
            const isSelected = selectedVenue?.id === venue.id;
            return (
              <button
                key={venue.id}
                onClick={() => setSelectedVenue(isSelected ? null : venue)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors ${
                  isSelected
                    ? "bg-brand/5 border border-brand/20"
                    : "hover:bg-surface-sunk"
                }`}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: categoryColors[venue.category] + "20",
                  }}
                >
                  <Icon
                    className="w-3.5 h-3.5"
                    style={{ color: categoryColors[venue.category] }}
                  />
                </div>
                <span className="text-sm text-ink">
                  {locale === "ru" ? venue.name_ru : venue.name_en}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

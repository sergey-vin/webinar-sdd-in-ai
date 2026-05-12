"use client";

import { useState, useEffect, useMemo } from "react";
import { DeckMap } from "@/components/map/deck-map";
import { ZonePopup } from "@/components/map/zone-popup";
import { DeckSearch } from "@/components/map/deck-search";
import type { DeckMapData, DeckZone } from "@/lib/types";
import { useT } from "@/lib/i18n";

export default function MapPage() {
  const [deckMaps, setDeckMaps] = useState<DeckMapData[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<number | null>(null);
  const [selectedZone, setSelectedZone] = useState<DeckZone | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const t = useT();

  useEffect(() => {
    fetch("/data/deck-maps.json")
      .then((res) => res.json())
      .then((data: DeckMapData[]) => {
        setDeckMaps(data);
        if (data.length > 0) setSelectedDeck(data[0].deck);
      });
  }, []);

  const allZones = useMemo(
    () => deckMaps.flatMap((d) => d.zones),
    [deckMaps]
  );

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return allZones.filter(
      (z) =>
        z.name.toLowerCase().includes(q) ||
        z.type.toLowerCase().includes(q) ||
        z.description.toLowerCase().includes(q)
    );
  }, [searchQuery, allZones]);

  const currentDeckMap = deckMaps.find((d) => d.deck === selectedDeck);

  const handleSearchResultClick = (zone: DeckZone) => {
    setSelectedDeck(zone.deck);
    setSelectedZone(zone);
    setSearchQuery("");
  };

  return (
    <div className="px-4 py-6 max-w-lg mx-auto space-y-4">
      <h1 className="font-heading text-2xl font-bold text-navy">
        {t("map.title")}
      </h1>

      <DeckSearch
        query={searchQuery}
        onQueryChange={setSearchQuery}
        results={searchResults}
        onResultClick={handleSearchResultClick}
      />

      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {deckMaps.map((dm) => (
          <button
            key={dm.deck}
            onClick={() => {
              setSelectedDeck(dm.deck);
              setSelectedZone(null);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors duration-200 ${
              selectedDeck === dm.deck
                ? "bg-navy text-white"
                : "bg-white text-navy border border-ocean-dark hover:bg-ocean"
            }`}
          >
            {dm.deck}
          </button>
        ))}
      </div>

      {currentDeckMap && (
        <p className="text-sm text-muted-foreground">
          {t("map.deck")} {currentDeckMap.deck} — {currentDeckMap.name}
        </p>
      )}

      {currentDeckMap && (
        <DeckMap
          zones={currentDeckMap.zones}
          highlightZoneId={selectedZone?.id}
          onZoneClick={setSelectedZone}
        />
      )}

      {selectedZone && (
        <ZonePopup
          zone={selectedZone}
          onClose={() => setSelectedZone(null)}
        />
      )}
    </div>
  );
}

"use client";

import { Search } from "lucide-react";
import type { DeckZone } from "@/lib/types";
import { useT } from "@/lib/i18n";

interface DeckSearchProps {
  query: string;
  onQueryChange: (query: string) => void;
  results: DeckZone[];
  onResultClick: (zone: DeckZone) => void;
}

export function DeckSearch({ query, onQueryChange, results, onResultClick }: DeckSearchProps) {
  const t = useT();

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={t("map.search")}
          className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-ocean-dark bg-white text-sm text-navy placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
        />
      </div>
      {query.length > 0 && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-ocean-dark rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
          {results.map((zone) => (
            <button
              key={zone.id}
              onClick={() => onResultClick(zone)}
              className="w-full text-left px-3 py-2 text-sm hover:bg-ocean transition-colors border-b border-ocean-dark last:border-0"
            >
              <span className="font-medium text-navy">{zone.name}</span>
              <span className="text-xs text-muted-foreground ml-2">
                {t("map.deck")} {zone.deck}
              </span>
            </button>
          ))}
        </div>
      )}
      {query.length > 0 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-ocean-dark rounded-lg shadow-lg z-10 px-3 py-3 text-sm text-muted-foreground text-center">
          {t("map.notFound")}
        </div>
      )}
    </div>
  );
}

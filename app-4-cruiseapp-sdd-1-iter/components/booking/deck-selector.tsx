"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Layers } from "lucide-react";
import type { Deck } from "@/lib/types";
import { useT } from "@/lib/i18n";

interface DeckSelectorProps {
  decks: Deck[];
  selectedDeck: number | null;
  onSelect: (deck: number) => void;
}

export function DeckSelector({ decks, selectedDeck, onSelect }: DeckSelectorProps) {
  const t = useT();

  return (
    <div className="space-y-2">
      <h2 className="font-heading text-lg font-semibold text-navy flex items-center gap-2">
        <Layers className="w-5 h-5 text-gold" />
        {t("booking.selectDeck")}
      </h2>
      <div className="grid grid-cols-2 gap-2">
        {decks.map((deck) => (
          <button
            key={deck.number}
            onClick={() => onSelect(deck.number)}
            className="text-left"
          >
            <Card
              className={`shadow-sm transition-all duration-200 cursor-pointer ${
                selectedDeck === deck.number
                  ? "ring-2 ring-gold bg-ocean"
                  : "hover:shadow-md"
              }`}
            >
              <CardContent className="p-3">
                <div className="text-sm font-semibold text-navy">
                  {t("booking.deck")} {deck.number}
                </div>
                <div className="text-xs text-muted-foreground">{deck.name}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {deck.cabinCount} {t("booking.cabins")}
                </div>
              </CardContent>
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
}

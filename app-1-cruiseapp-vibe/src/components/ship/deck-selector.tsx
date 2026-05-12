"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface DeckInfo {
  deck_number: number;
  name: string;
}

interface DeckSelectorProps {
  shipSlug: string;
  decks: DeckInfo[];
  currentDeck: number;
}

export function DeckSelector({ shipSlug, decks, currentDeck }: DeckSelectorProps) {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-1 min-w-max px-1">
        {decks.map((deck) => (
          <Link
            key={deck.deck_number}
            href={`/ship/${shipSlug}/deck/${deck.deck_number}`}
            className={cn(
              "flex flex-col items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
              deck.deck_number === currentDeck
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            <span className="text-xs">Deck {deck.deck_number}</span>
            <span className="text-[11px] opacity-80">{deck.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

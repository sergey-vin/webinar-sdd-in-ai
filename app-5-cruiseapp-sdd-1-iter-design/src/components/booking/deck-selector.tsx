"use client";

import type { Deck } from "@/lib/types";

interface DeckSelectorProps {
  decks: Deck[];
  selectedDeckId: string | null;
  onSelect: (deckId: string) => void;
}

export function DeckSelector({ decks, selectedDeckId, onSelect }: DeckSelectorProps) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-1">
      {decks.map((deck) => (
        <button
          key={deck.id}
          onClick={() => onSelect(deck.id)}
          className={`flex-shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${
            selectedDeckId === deck.id
              ? "bg-ink text-white"
              : "border border-hairline bg-surface text-ink-2 hover:bg-surface-2"
          }`}
        >
          Deck {deck.number} · {deck.name}
        </button>
      ))}
    </div>
  );
}

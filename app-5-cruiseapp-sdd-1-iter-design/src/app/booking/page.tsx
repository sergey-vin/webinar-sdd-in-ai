"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { DeckSelector } from "@/components/booking/deck-selector";
import { CabinTypeCard } from "@/components/booking/cabin-type-card";
import { BookingSummary } from "@/components/booking/booking-summary";
import { useBookingStore } from "@/store/booking-store";
import type { Deck, Cabin, CabinType } from "@/lib/types";

import decksData from "../../../public/data/decks.json";

const decks = decksData as Deck[];

export default function BookingPage() {
  const [selectedDeckId, setSelectedDeckId] = useState<string>(decks[0].id);
  const { selectedCabin, selectCabin, clearSelection } = useBookingStore();

  const selectedDeck = decks.find((d) => d.id === selectedDeckId)!;

  // If a cabin is selected, show summary
  if (selectedCabin) {
    return (
      <div>
        <Header title="Booking" subtitle="Review your selection" />
        <BookingSummary
          cabin={selectedCabin}
          deckName={`Deck ${selectedDeck.number} · ${selectedDeck.name}`}
          onBack={() => clearSelection()}
        />
      </div>
    );
  }

  // Compute cabin type stats for the selected deck
  const typeStats = (["internal", "window", "balcony", "suite"] as CabinType[]).map(
    (type) => {
      const cabins = selectedDeck.cabins.filter((c) => c.type === type);
      const available = cabins.filter((c) => c.available).length;
      const priceFrom = cabins.length
        ? Math.min(...cabins.map((c) => c.price))
        : 0;
      return { type, available, priceFrom };
    }
  );

  return (
    <div>
      <Header title="Booking" subtitle="Select your cabin" />

      <div className="mb-5">
        <DeckSelector
          decks={decks}
          selectedDeckId={selectedDeckId}
          onSelect={setSelectedDeckId}
        />
      </div>

      {/* Cabin type overview */}
      <div className="mb-6 grid grid-cols-2 gap-3 px-5">
        {typeStats
          .filter((s) => s.priceFrom > 0)
          .map((stat) => (
            <CabinTypeCard
              key={stat.type}
              type={stat.type}
              priceFrom={stat.priceFrom}
              available={stat.available}
            />
          ))}
      </div>

      {/* Individual cabins */}
      <div className="px-5">
        <h2 className="mb-3 font-display text-lg">
          Available on Deck {selectedDeck.number}
        </h2>
        <div className="space-y-2">
          {selectedDeck.cabins.map((cabin) => (
            <CabinRow
              key={cabin.id}
              cabin={cabin}
              onSelect={() => selectCabin(cabin)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CabinRow({
  cabin,
  onSelect,
}: {
  cabin: Cabin;
  onSelect: () => void;
}) {
  const typeLabels: Record<CabinType, string> = {
    internal: "Internal",
    window: "Sea View",
    balcony: "Balcony",
    suite: "Suite",
  };

  return (
    <button
      onClick={onSelect}
      disabled={!cabin.available}
      className={`flex w-full items-center justify-between rounded-radius-md border p-3 text-left transition-colors ${
        cabin.available
          ? "border-hairline bg-surface hover:bg-surface-2"
          : "border-hairline bg-surface-sunk opacity-50"
      }`}
    >
      <div>
        <div className="text-sm font-medium text-ink">
          Cabin {cabin.number}
        </div>
        <div className="text-[11px] text-ink-4">
          {typeLabels[cabin.type]} · {cabin.size}
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm font-semibold text-ink">€{cabin.price}</div>
        <div
          className={`text-[11px] font-medium ${
            cabin.available ? "text-good" : "text-bad"
          }`}
        >
          {cabin.available ? "Available" : "Booked"}
        </div>
      </div>
    </button>
  );
}

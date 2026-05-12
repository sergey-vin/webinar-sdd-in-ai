"use client";

import { useState, useEffect } from "react";
import { DeckSelector } from "@/components/booking/deck-selector";
import { CabinCard } from "@/components/booking/cabin-card";
import { BookingSummary } from "@/components/booking/booking-summary";
import { useBookingStore } from "@/lib/stores/booking-store";
import type { Cabin, CabinType, Deck } from "@/lib/types";
import { useT } from "@/lib/i18n";

export default function BookingPage() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [cabins, setCabins] = useState<Cabin[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<CabinType | "all">("all");
  const booking = useBookingStore((s) => s.booking);
  const t = useT();

  const typeFilters: { value: CabinType | "all"; labelKey: string }[] = [
    { value: "all", labelKey: "booking.allTypes" },
    { value: "internal", labelKey: "cabin.internal" },
    { value: "window", labelKey: "cabin.window" },
    { value: "balcony", labelKey: "cabin.balcony" },
    { value: "suite", labelKey: "cabin.suite" },
  ];

  useEffect(() => {
    fetch("/data/cabins.json")
      .then((res) => res.json())
      .then((data: { decks: Deck[]; cabins: Cabin[] }) => {
        setDecks(data.decks);
        setCabins(data.cabins);
      });
  }, []);

  const filteredCabins = cabins
    .filter((c) => selectedDeck === null || c.deck === selectedDeck)
    .filter((c) => selectedType === "all" || c.type === selectedType)
    .sort((a, b) => a.price - b.price);

  return (
    <div className="px-4 py-6 max-w-lg mx-auto space-y-6">
      <h1 className="font-heading text-2xl font-bold text-navy">
        {t("booking.title")}
      </h1>

      <DeckSelector
        decks={decks}
        selectedDeck={selectedDeck}
        onSelect={(d) => setSelectedDeck(selectedDeck === d ? null : d)}
      />

      <div className="flex gap-2 overflow-x-auto pb-1">
        {typeFilters.map((tf) => (
          <button
            key={tf.value}
            onClick={() => setSelectedType(tf.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors duration-200 ${
              selectedType === tf.value
                ? "bg-navy text-white"
                : "bg-white text-navy border border-ocean-dark hover:bg-ocean"
            }`}
          >
            {t(tf.labelKey)}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredCabins.length === 0 ? (
          <p className="text-center text-muted-foreground text-sm py-8">
            {t("booking.noCabins")}
          </p>
        ) : (
          filteredCabins.map((cabin) => (
            <CabinCard key={cabin.id} cabin={cabin} />
          ))
        )}
      </div>

      {booking && <BookingSummary />}
    </div>
  );
}

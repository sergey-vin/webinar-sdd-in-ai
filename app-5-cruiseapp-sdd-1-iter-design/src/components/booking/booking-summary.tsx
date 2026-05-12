"use client";

import type { Cabin } from "@/lib/types";
import { useBookingStore } from "@/store/booking-store";
import { BedDouble, Eye, Sun, Crown, Check, ArrowLeft } from "lucide-react";
import type { CabinType } from "@/lib/types";

const typeLabels: Record<CabinType, string> = {
  internal: "Internal",
  window: "Sea View",
  balcony: "Balcony",
  suite: "Suite",
};

const typeIcons: Record<CabinType, React.ComponentType<{ className?: string }>> = {
  internal: BedDouble,
  window: Eye,
  balcony: Sun,
  suite: Crown,
};

interface BookingSummaryProps {
  cabin: Cabin;
  deckName: string;
  onBack: () => void;
}

export function BookingSummary({ cabin, deckName, onBack }: BookingSummaryProps) {
  const { isRequested, submitRequest } = useBookingStore();
  const Icon = typeIcons[cabin.type];

  if (isRequested) {
    return (
      <div className="flex flex-col items-center gap-4 px-5 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-good">
          <Check className="h-8 w-8" />
        </div>
        <h2 className="font-display text-2xl">Request Sent!</h2>
        <p className="text-sm text-ink-3">
          Your booking request for cabin {cabin.number} has been submitted.
          We&apos;ll confirm your reservation shortly.
        </p>
        <button
          onClick={onBack}
          className="mt-4 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
        >
          Back to Cabins
        </button>
      </div>
    );
  }

  return (
    <div className="px-5">
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-1.5 text-sm font-medium text-ink-3"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="rounded-radius-xl border border-hairline bg-surface p-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-brand">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ink">
              Cabin {cabin.number}
            </h3>
            <p className="text-sm text-ink-3">{typeLabels[cabin.type]}</p>
          </div>
        </div>

        <div className="mb-4 h-px bg-hairline" />

        <div className="space-y-3">
          <Row label="Deck" value={deckName} />
          <Row label="Type" value={typeLabels[cabin.type]} />
          <Row label="Size" value={cabin.size} />
          <Row label="Description" value={cabin.description} />
        </div>

        <div className="mb-4 mt-4 h-px bg-hairline" />

        <div className="flex items-baseline justify-between">
          <span className="text-sm text-ink-3">Price per night</span>
          <span className="text-2xl font-semibold text-ink">
            €{cabin.price}
          </span>
        </div>

        <button
          onClick={submitRequest}
          className="mt-5 w-full rounded-full bg-brand py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-2"
        >
          Send Booking Request
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-ink-3">{label}</span>
      <span className="font-medium text-ink">{value}</span>
    </div>
  );
}

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AmenityCard, getCategoryConfig } from "./amenity-card";
import type { Database } from "@/lib/supabase/types";

type Amenity = Database["public"]["Tables"]["amenities"]["Row"];

interface DeckMapProps {
  amenities: Amenity[];
  deckName: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  restaurant: "bg-orange-100 border-orange-300 hover:bg-orange-200",
  bar: "bg-purple-100 border-purple-300 hover:bg-purple-200",
  pool: "bg-blue-100 border-blue-300 hover:bg-blue-200",
  spa: "bg-pink-100 border-pink-300 hover:bg-pink-200",
  theater: "bg-red-100 border-red-300 hover:bg-red-200",
  gym: "bg-green-100 border-green-300 hover:bg-green-200",
  fitness: "bg-green-100 border-green-300 hover:bg-green-200",
  shop: "bg-amber-100 border-amber-300 hover:bg-amber-200",
  entertainment: "bg-indigo-100 border-indigo-300 hover:bg-indigo-200",
  lounge: "bg-teal-100 border-teal-300 hover:bg-teal-200",
  cafe: "bg-teal-100 border-teal-300 hover:bg-teal-200",
};

function getCategoryColor(category: string) {
  return CATEGORY_COLORS[category.toLowerCase()] || "bg-gray-100 border-gray-300 hover:bg-gray-200";
}

export function DeckMap({ amenities, deckName }: DeckMapProps) {
  const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const hasPositions = amenities.some(
    (a) => a.position_x !== null && a.position_y !== null
  );

  if (hasPositions) {
    return (
      <>
        <div className="relative w-full bg-muted/30 rounded-xl border border-border overflow-hidden" style={{ minHeight: 400 }}>
          {/* Ship outline shape */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <div className="w-[90%] h-[80%] rounded-[40%_40%_20%_20%] border-2 border-foreground" />
          </div>

          {amenities.map((amenity) => {
            const config = getCategoryConfig(amenity.category);
            const Icon = config.icon;
            return (
              <button
                key={amenity.id}
                className={cn(
                  "absolute flex flex-col items-center gap-1 p-2 rounded-lg border cursor-pointer transition-all transform -translate-x-1/2 -translate-y-1/2 shadow-sm",
                  getCategoryColor(amenity.category)
                )}
                style={{
                  left: `${Math.max(5, Math.min(95, amenity.position_x!))}%`,
                  top: `${Math.max(5, Math.min(95, amenity.position_y!))}%`,
                }}
                onClick={() => {
                  setSelectedAmenity(amenity);
                  setSheetOpen(true);
                }}
              >
                <Icon className={cn("size-4", config.color)} />
                <span className="text-[10px] font-medium leading-tight text-center max-w-[80px] truncate">
                  {amenity.name}
                </span>
              </button>
            );
          })}
        </div>

        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent side="bottom">
            <SheetHeader>
              <SheetTitle>{selectedAmenity?.name}</SheetTitle>
            </SheetHeader>
            {selectedAmenity && (
              <AmenityCard amenity={selectedAmenity} deckName={deckName} />
            )}
          </SheetContent>
        </Sheet>
      </>
    );
  }

  // Grid fallback when no positions
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {amenities.map((amenity) => {
          const config = getCategoryConfig(amenity.category);
          const Icon = config.icon;
          return (
            <button
              key={amenity.id}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl border cursor-pointer transition-all",
                getCategoryColor(amenity.category)
              )}
              onClick={() => {
                setSelectedAmenity(amenity);
                setSheetOpen(true);
              }}
            >
              <Icon className={cn("size-6", config.color)} />
              <span className="text-sm font-medium text-center leading-tight">
                {amenity.name}
              </span>
              {amenity.hours && (
                <span className="text-[10px] text-muted-foreground">{amenity.hours}</span>
              )}
            </button>
          );
        })}
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>{selectedAmenity?.name}</SheetTitle>
          </SheetHeader>
          {selectedAmenity && (
            <AmenityCard amenity={selectedAmenity} deckName={deckName} />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}

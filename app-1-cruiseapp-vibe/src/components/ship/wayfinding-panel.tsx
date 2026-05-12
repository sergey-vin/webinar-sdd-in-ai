"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation, ArrowRight } from "lucide-react";
import type { Database } from "@/lib/supabase/types";

type Amenity = Database["public"]["Tables"]["amenities"]["Row"] & {
  deck_number?: number;
  deck_name?: string;
};

interface WayfindingPanelProps {
  amenities: Amenity[];
}

function getDirection(fromX: number | null, toX: number | null): string {
  if (fromX === null || toX === null) return "";
  if (toX < fromX) return "forward";
  if (toX > fromX) return "aft";
  return "straight ahead";
}

function getSide(posY: number | null): string {
  if (posY === null) return "";
  return posY < 50 ? "port" : "starboard";
}

export function WayfindingPanel({ amenities }: WayfindingPanelProps) {
  const [fromId, setFromId] = useState<string>("");
  const [toId, setToId] = useState<string>("");

  const fromAmenity = amenities.find((a) => a.id === fromId);
  const toAmenity = amenities.find((a) => a.id === toId);

  function getDirections(): string | null {
    if (!fromAmenity || !toAmenity) return null;

    const fromDeck = fromAmenity.deck_number;
    const toDeck = toAmenity.deck_number;
    const direction = getDirection(fromAmenity.position_x, toAmenity.position_x);
    const side = getSide(toAmenity.position_y);

    if (fromDeck === toDeck) {
      const parts: string[] = [];
      if (direction && direction !== "straight ahead") {
        parts.push(`Head ${direction} along Deck ${toDeck}.`);
      }
      if (side) {
        parts.push(`${toAmenity.name} is on the ${side} side.`);
      } else {
        parts.push(`You will find ${toAmenity.name} on this deck.`);
      }
      return parts.join(" ");
    }

    const parts: string[] = [];
    parts.push(`Take the elevator from Deck ${fromDeck} to Deck ${toDeck}.`);
    if (direction && direction !== "straight ahead") {
      parts.push(`Then head ${direction}.`);
    }
    if (side) {
      parts.push(`${toAmenity.name} is on the ${side} side.`);
    } else {
      parts.push(`You will find ${toAmenity.name} on Deck ${toDeck}.`);
    }
    return parts.join(" ");
  }

  const directions = getDirections();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Navigation className="size-5" />
          Wayfinding
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 items-end">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">From</label>
            <Select value={fromId} onValueChange={(v) => setFromId(v ?? "")}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select starting point" />
              </SelectTrigger>
              <SelectContent>
                {amenities.map((a) => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.name} {a.deck_number ? `(Deck ${a.deck_number})` : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <ArrowRight className="hidden sm:block size-5 text-muted-foreground mb-2" />

          <div className="space-y-1.5">
            <label className="text-sm font-medium">To</label>
            <Select value={toId} onValueChange={(v) => setToId(v ?? "")}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select destination" />
              </SelectTrigger>
              <SelectContent>
                {amenities.map((a) => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.name} {a.deck_number ? `(Deck ${a.deck_number})` : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {directions && (
          <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
            <p className="text-sm font-medium flex items-start gap-2">
              <Navigation className="size-4 mt-0.5 shrink-0 text-primary" />
              {directions}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

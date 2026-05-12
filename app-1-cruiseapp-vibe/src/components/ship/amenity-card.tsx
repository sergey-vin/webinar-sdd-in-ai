"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  UtensilsCrossed,
  Wine,
  Waves,
  Sparkles,
  Theater,
  Dumbbell,
  ShoppingBag,
  Music,
  Coffee,
  MapPin,
  Clock,
  type LucideIcon,
} from "lucide-react";
import type { Database } from "@/lib/supabase/types";

type Amenity = Database["public"]["Tables"]["amenities"]["Row"];

const CATEGORY_CONFIG: Record<string, { icon: LucideIcon; color: string; bg: string }> = {
  restaurant: { icon: UtensilsCrossed, color: "text-orange-600", bg: "bg-orange-100" },
  bar: { icon: Wine, color: "text-purple-600", bg: "bg-purple-100" },
  pool: { icon: Waves, color: "text-blue-600", bg: "bg-blue-100" },
  spa: { icon: Sparkles, color: "text-pink-600", bg: "bg-pink-100" },
  theater: { icon: Theater, color: "text-red-600", bg: "bg-red-100" },
  gym: { icon: Dumbbell, color: "text-green-600", bg: "bg-green-100" },
  fitness: { icon: Dumbbell, color: "text-green-600", bg: "bg-green-100" },
  shop: { icon: ShoppingBag, color: "text-amber-600", bg: "bg-amber-100" },
  entertainment: { icon: Music, color: "text-indigo-600", bg: "bg-indigo-100" },
  lounge: { icon: Coffee, color: "text-teal-600", bg: "bg-teal-100" },
  cafe: { icon: Coffee, color: "text-teal-600", bg: "bg-teal-100" },
};

function getCategoryConfig(category: string) {
  const key = category.toLowerCase();
  return CATEGORY_CONFIG[key] || { icon: MapPin, color: "text-gray-600", bg: "bg-gray-100" };
}

interface AmenityCardProps {
  amenity: Amenity;
  deckName?: string;
}

export function AmenityCard({ amenity, deckName }: AmenityCardProps) {
  const config = getCategoryConfig(amenity.category);
  const Icon = config.icon;

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-start gap-3">
        <div className={`p-3 rounded-xl ${config.bg}`}>
          <Icon className={`size-6 ${config.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold">{amenity.name}</h3>
          <Badge variant="secondary" className="mt-1">
            {amenity.category}
          </Badge>
        </div>
      </div>

      {amenity.description && (
        <>
          <Separator />
          <p className="text-sm text-muted-foreground">{amenity.description}</p>
        </>
      )}

      <div className="space-y-2">
        {amenity.hours && (
          <div className="flex items-center gap-2 text-sm">
            <Clock className="size-4 text-muted-foreground" />
            <span>{amenity.hours}</span>
          </div>
        )}
        {deckName && (
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="size-4 text-muted-foreground" />
            <span>{deckName}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export { getCategoryConfig, CATEGORY_CONFIG };

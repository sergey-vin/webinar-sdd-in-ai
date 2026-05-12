"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Cruise } from "@/lib/types";

export function CruiseCard({ cruise }: { cruise: Cruise }) {
  const startPrice = Math.min(...cruise.cabins.map((c) => c.pricePerNight));

  return (
    <Link href={`/cruises/${cruise.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">🚢</div>
            <p className="text-sm text-muted-foreground">{cruise.shipName}</p>
          </div>
          <Badge className="absolute top-3 right-3 bg-primary">
            {cruise.duration} nights
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-1">{cruise.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">
            {cruise.ports.map((p) => p.name.split(" (")[0]).join(" → ")}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">★</span>
              <span className="text-sm font-medium">{cruise.rating}</span>
              <span className="text-xs text-muted-foreground">
                ({cruise.reviewCount.toLocaleString()})
              </span>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">from</p>
              <p className="text-lg font-bold text-primary">
                €{startPrice}
                <span className="text-xs font-normal text-muted-foreground">
                  /night
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

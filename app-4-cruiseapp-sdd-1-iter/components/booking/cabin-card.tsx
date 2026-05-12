"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Check } from "lucide-react";
import type { Cabin, CabinType } from "@/lib/types";
import { useBookingStore } from "@/lib/stores/booking-store";
import { useT } from "@/lib/i18n";

const typeColors: Record<CabinType, string> = {
  internal: "bg-slate-100 text-slate-700",
  window: "bg-blue-100 text-blue-700",
  balcony: "bg-emerald-100 text-emerald-700",
  suite: "bg-amber-100 text-amber-700",
};

interface CabinCardProps {
  cabin: Cabin;
}

export function CabinCard({ cabin }: CabinCardProps) {
  const { booking, selectCabin } = useBookingStore();
  const isSelected = booking?.cabinId === cabin.id;
  const t = useT();

  return (
    <Card
      className={`shadow-sm transition-all duration-200 ${
        !cabin.available ? "opacity-50" : ""
      } ${isSelected ? "ring-2 ring-gold" : ""}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-bold text-navy">
                {t("booking.cabin")} {cabin.number}
              </span>
              <Badge
                variant="secondary"
                className={`text-[10px] px-1.5 py-0 ${typeColors[cabin.type]}`}
              >
                {t(`cabin.${cabin.type}`)}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
              <Users className="w-3 h-3" />
              {t("booking.cabin")} {cabin.capacity} {t("booking.guests").toLowerCase()}
            </div>
            <div className="flex flex-wrap gap-1">
              {cabin.amenities.slice(0, 4).map((a) => (
                <span
                  key={a}
                  className="text-[10px] bg-ocean px-1.5 py-0.5 rounded text-navy"
                >
                  {a}
                </span>
              ))}
              {cabin.amenities.length > 4 && (
                <span className="text-[10px] text-muted-foreground">
                  +{cabin.amenities.length - 4}
                </span>
              )}
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-lg font-bold text-navy">
              ${cabin.price.toLocaleString()}
            </div>
            <div className="text-[10px] text-muted-foreground">{t("booking.perCruise")}</div>
            {cabin.available ? (
              <Button
                variant={isSelected ? "default" : "outline"}
                size="sm"
                className={`mt-2 text-xs ${
                  isSelected
                    ? "bg-gold hover:bg-gold-light text-navy"
                    : "border-ocean-dark hover:bg-ocean"
                }`}
                onClick={() =>
                  selectCabin({
                    cabinId: cabin.id,
                    cabinNumber: cabin.number,
                    cabinType: cabin.type,
                    deck: cabin.deck,
                    price: cabin.price,
                  })
                }
              >
                {isSelected ? (
                  <>
                    <Check className="w-3 h-3 mr-1" />
                    {t("booking.selected")}
                  </>
                ) : (
                  t("booking.select")
                )}
              </Button>
            ) : (
              <Badge variant="secondary" className="mt-2 text-[10px]">
                {t("booking.occupied")}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

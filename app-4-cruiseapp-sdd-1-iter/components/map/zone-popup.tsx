"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, MapPin } from "lucide-react";
import type { DeckZone, ZoneType } from "@/lib/types";
import { useT } from "@/lib/i18n";

const typeColors: Record<ZoneType, string> = {
  restaurant: "bg-amber-100 text-amber-700",
  bar: "bg-violet-100 text-violet-700",
  pool: "bg-blue-100 text-blue-700",
  theater: "bg-pink-100 text-pink-700",
  sport: "bg-red-100 text-red-700",
  kids: "bg-pink-100 text-pink-700",
  spa: "bg-emerald-100 text-emerald-700",
  shop: "bg-indigo-100 text-indigo-700",
  cabin: "bg-slate-100 text-slate-700",
  lobby: "bg-sky-100 text-sky-700",
};

interface ZonePopupProps {
  zone: DeckZone;
  onClose: () => void;
}

export function ZonePopup({ zone, onClose }: ZonePopupProps) {
  const t = useT();

  return (
    <Card className="shadow-lg border-gold/30 animate-in slide-in-from-bottom-2 duration-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge
                variant="secondary"
                className={`text-[10px] px-1.5 py-0 ${typeColors[zone.type]}`}
              >
                {t(`zone.${zone.type}`)}
              </Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {t("map.deck")} {zone.deck}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-navy">{zone.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">{zone.description}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="shrink-0 h-7 w-7 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

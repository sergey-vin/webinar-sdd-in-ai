"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Car, CarTaxiFront, Train, Clock, MapPin, DollarSign } from "lucide-react";
import type { TransportCar, TransportTaxi, TransportPublic } from "@/lib/types";
import { useT } from "@/lib/i18n";

interface TransportOptionsProps {
  car: TransportCar;
  taxi: TransportTaxi;
  publicTransport: TransportPublic;
}

export function TransportOptions({ car, taxi, publicTransport }: TransportOptionsProps) {
  const t = useT();

  return (
    <div className="space-y-3">
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <Car className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="text-sm font-semibold text-navy">{car.description}</h3>
          </div>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
              <span>{car.parkingName} — {car.parkingAddress}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              <span>{car.pricePerDay} {car.currency}/day</span>
            </div>
            <p className="text-muted-foreground">{car.notes}</p>
          </div>
          {car.bookingAvailable && (
            <Button
              variant="outline"
              size="sm"
              className="mt-3 text-xs border-ocean-dark hover:bg-ocean"
            >
              {t("logistics.bookParking")}
            </Button>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
              <CarTaxiFront className="w-4 h-4 text-amber-600" />
            </div>
            <h3 className="text-sm font-semibold text-navy">{taxi.description}</h3>
          </div>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-2">
              <DollarSign className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              <span>{taxi.estimatedPrice}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              <span>{taxi.estimatedTime}</span>
            </div>
            <p className="text-muted-foreground">{taxi.notes}</p>
          </div>
          <div className="flex gap-1.5 mt-3">
            {taxi.providers.map((p) => (
              <Badge key={p} variant="secondary" className="text-[10px] bg-ocean text-navy">
                {p}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
              <Train className="w-4 h-4 text-green-600" />
            </div>
            <h3 className="text-sm font-semibold text-navy">{publicTransport.description}</h3>
          </div>
          <div className="space-y-3">
            {publicTransport.options.map((opt) => (
              <div key={opt.name} className="bg-ocean rounded-lg p-2.5 space-y-1">
                <div className="text-xs font-semibold text-navy">{opt.name}</div>
                <div className="text-[11px] text-muted-foreground">{opt.route}</div>
                <div className="flex gap-3 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    {opt.price}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {opt.frequency}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

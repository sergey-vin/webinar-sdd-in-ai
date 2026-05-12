"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin, Clock, Car, Luggage, ExternalLink } from "lucide-react";
import type { Database } from "@/lib/supabase/types";

type Terminal = Database["public"]["Tables"]["terminals"]["Row"];

interface TerminalInfoProps {
  terminal: Terminal;
}

export function TerminalInfo({ terminal }: TerminalInfoProps) {
  const mapsUrl = `https://www.google.com/maps?q=${terminal.latitude},${terminal.longitude}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{terminal.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <MapPin className="size-4 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <p className="text-sm">{terminal.address}</p>
              <p className="text-sm text-muted-foreground">
                {terminal.city}
                {terminal.state ? `, ${terminal.state}` : ""}, {terminal.country}
              </p>
            </div>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <MapPin className="size-4 mr-1" />
            Open in Google Maps
            <ExternalLink className="size-3 ml-1" />
          </a>
        </div>

        {terminal.check_in_hours && (
          <>
            <Separator />
            <div className="flex items-start gap-2">
              <Clock className="size-4 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Check-in Hours</p>
                <p className="text-sm text-muted-foreground">{terminal.check_in_hours}</p>
              </div>
            </div>
          </>
        )}

        {terminal.parking_info && (
          <>
            <Separator />
            <div className="flex items-start gap-2">
              <Car className="size-4 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Parking</p>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {terminal.parking_info}
                </p>
              </div>
            </div>
          </>
        )}

        {terminal.luggage_dropoff_info && (
          <>
            <Separator />
            <div className="flex items-start gap-2">
              <Luggage className="size-4 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Luggage Drop-off</p>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {terminal.luggage_dropoff_info}
                </p>
              </div>
            </div>
          </>
        )}

        {terminal.description && (
          <>
            <Separator />
            <p className="text-sm text-muted-foreground">{terminal.description}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
}

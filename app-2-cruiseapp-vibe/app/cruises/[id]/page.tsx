"use client";

import { use, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cruises } from "@/lib/mock-data";

export default function CruiseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const cruise = cruises.find((c) => c.id === id);
  const [selectedCabin, setSelectedCabin] = useState<string | null>(null);

  if (!cruise) {
    return (
      <div className="px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-2">Cruise not found</h1>
        <Link href="/" className="text-primary underline">
          Back to search
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-6">
      {/* Header image */}
      <div className="relative h-56 bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-2">🚢</div>
          <p className="text-lg font-medium">{cruise.shipName}</p>
        </div>
        <Link
          href="/"
          className="absolute top-4 left-4 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center"
        >
          ←
        </Link>
      </div>

      <div className="px-4 max-w-lg mx-auto -mt-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-xl font-bold">{cruise.name}</h1>
              <Badge>{cruise.duration} nights</Badge>
            </div>
            <div className="flex items-center gap-1 mb-3">
              <span className="text-yellow-500">★</span>
              <span className="font-medium">{cruise.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({cruise.reviewCount.toLocaleString()} reviews)
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {cruise.description}
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap gap-2 mb-4">
              {cruise.highlights.map((h) => (
                <Badge key={h} variant="secondary">
                  {h}
                </Badge>
              ))}
            </div>

            <Separator className="my-4" />

            {/* Route */}
            <h2 className="font-semibold mb-3">Route</h2>
            <div className="space-y-3 mb-4">
              {cruise.ports.map((port, i) => (
                <div key={port.id} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    {i < cruise.ports.length - 1 && (
                      <div className="w-0.5 h-8 bg-primary/30" />
                    )}
                  </div>
                  <div className="flex-1 -mt-1">
                    <p className="font-medium text-sm">
                      Day {port.day}: {port.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {port.country}
                      {port.arrivalTime && ` · Arrive ${port.arrivalTime}`}
                      {port.departureTime && ` · Depart ${port.departureTime}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            {/* Cabins */}
            <h2 className="font-semibold mb-3">Choose Your Cabin</h2>
            <div className="space-y-3">
              {cruise.cabins.map((cabin) => (
                <button
                  key={cabin.id}
                  onClick={() => setSelectedCabin(cabin.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedCabin === cabin.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-sm">{cabin.name}</h3>
                    <p className="font-bold text-primary">
                      €{cabin.pricePerNight}
                      <span className="text-xs font-normal text-muted-foreground">
                        /night
                      </span>
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {cabin.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {cabin.amenities.slice(0, 4).map((a) => (
                      <Badge key={a} variant="outline" className="text-xs py-0">
                        {a}
                      </Badge>
                    ))}
                    {cabin.amenities.length > 4 && (
                      <Badge variant="outline" className="text-xs py-0">
                        +{cabin.amenities.length - 4} more
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {cabin.available} cabins left · Up to {cabin.maxGuests}{" "}
                    guests
                  </p>
                </button>
              ))}
            </div>

            <Link
              href={
                selectedCabin
                  ? `/cruises/${cruise.id}/book?cabin=${selectedCabin}`
                  : "#"
              }
              className="block mt-4"
            >
              <Button className="w-full h-12" disabled={!selectedCabin}>
                {selectedCabin
                  ? `Book Now — €${
                      cruise.cabins.find((c) => c.id === selectedCabin)!
                        .pricePerNight * cruise.duration
                    } total`
                  : "Select a cabin to continue"}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

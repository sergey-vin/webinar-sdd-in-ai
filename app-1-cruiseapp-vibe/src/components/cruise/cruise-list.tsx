"use client";

import { CruiseCard } from "./cruise-card";

interface CruiseWithDetails {
  id: string;
  name: string;
  slug: string;
  departure_port: string;
  departure_date: string;
  arrival_date: string;
  duration_nights: number;
  image_url: string | null;
  ship_name?: string;
  lowest_price_cents?: number;
}

interface CruiseListProps {
  cruises: CruiseWithDetails[];
}

export function CruiseList({ cruises }: CruiseListProps) {
  if (cruises.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg text-muted-foreground">
          No cruises found matching your criteria.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Try adjusting your filters or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cruises.map((cruise) => (
        <CruiseCard key={cruise.id} cruise={cruise} />
      ))}
    </div>
  );
}

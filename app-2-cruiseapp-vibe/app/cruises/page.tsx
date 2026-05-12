"use client";

import { CruiseCard } from "@/components/cruise-card";
import { cruises } from "@/lib/mock-data";

export default function CruisesPage() {
  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">All Cruises</h1>
      <div className="grid gap-4">
        {cruises.map((cruise) => (
          <CruiseCard key={cruise.id} cruise={cruise} />
        ))}
      </div>
    </div>
  );
}

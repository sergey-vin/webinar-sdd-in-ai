"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CruiseCard } from "@/components/cruise-card";
import { cruises } from "@/lib/mock-data";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");

  const filtered = cruises.filter((c) => {
    const matchSearch =
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.ports.some((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    const matchRegion = region === "all" || c.region === region;
    return matchSearch && matchRegion;
  });

  const regions = ["all", ...new Set(cruises.map((c) => c.region))];

  return (
    <div>
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-primary to-accent text-primary-foreground px-4 pt-12 pb-8">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-3xl font-bold mb-2">CruiseApp</h1>
          <p className="opacity-80 mb-6">
            Find and book your dream cruise vacation
          </p>
          <div className="relative">
            <Input
              placeholder="Search destinations, ships..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60 h-12 pl-10"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Region filter */}
      <div className="px-4 py-3 max-w-lg mx-auto">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {regions.map((r) => (
            <Button
              key={r}
              variant={region === r ? "default" : "outline"}
              size="sm"
              onClick={() => setRegion(r)}
              className="whitespace-nowrap"
            >
              {r === "all" ? "All Regions" : r}
            </Button>
          ))}
        </div>
      </div>

      {/* Cruise list */}
      <div className="px-4 pb-6 max-w-lg mx-auto">
        <h2 className="text-lg font-semibold mb-3">
          {filtered.length} cruise{filtered.length !== 1 ? "s" : ""} found
        </h2>
        <div className="grid gap-4">
          {filtered.map((cruise) => (
            <CruiseCard key={cruise.id} cruise={cruise} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No cruises match your search. Try different keywords.
          </p>
        )}
      </div>
    </div>
  );
}

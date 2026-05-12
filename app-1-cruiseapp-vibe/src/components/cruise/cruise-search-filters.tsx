"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

const DURATION_OPTIONS = [
  { value: "", label: "Any duration" },
  { value: "3", label: "3 nights" },
  { value: "5", label: "5 nights" },
  { value: "7", label: "7 nights" },
  { value: "10", label: "10 nights" },
  { value: "14", label: "14 nights" },
];

const PORT_OPTIONS = [
  { value: "", label: "Any port" },
  { value: "Miami", label: "Miami" },
  { value: "Fort Lauderdale", label: "Fort Lauderdale" },
  { value: "Cape Canaveral", label: "Cape Canaveral" },
  { value: "New York", label: "New York" },
  { value: "Seattle", label: "Seattle" },
  { value: "Galveston", label: "Galveston" },
  { value: "New Orleans", label: "New Orleans" },
  { value: "San Juan", label: "San Juan" },
  { value: "Barcelona", label: "Barcelona" },
  { value: "Southampton", label: "Southampton" },
];

export function CruiseSearchFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const port = searchParams.get("port") ?? "";
  const date = searchParams.get("date") ?? "";
  const duration = searchParams.get("duration") ?? "";

  const updateFilters = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const handleSearch = () => {
    // Already using URL params, this just ensures we're on the cruises page
    if (pathname !== "/cruises") {
      const params = new URLSearchParams(searchParams.toString());
      router.push(`/cruises?${params.toString()}`);
    }
  };

  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1 space-y-1.5">
          <Label htmlFor="port">Departure Port</Label>
          <select
            id="port"
            value={port}
            onChange={(e) => updateFilters("port", e.target.value)}
            className="flex h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {PORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 space-y-1.5">
          <Label htmlFor="date">Departure Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => updateFilters("date", e.target.value)}
          />
        </div>

        <div className="flex-1 space-y-1.5">
          <Label htmlFor="duration">Duration</Label>
          <select
            id="duration"
            value={duration}
            onChange={(e) => updateFilters("duration", e.target.value)}
            className="flex h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {DURATION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <Button onClick={handleSearch} className="sm:w-auto">
          <Search className="size-4" />
          Search
        </Button>
      </div>
    </div>
  );
}

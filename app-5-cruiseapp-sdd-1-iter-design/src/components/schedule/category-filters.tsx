"use client";

import type { EventCategory } from "@/lib/types";

const categories: { value: EventCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "music", label: "Music" },
  { value: "food", label: "Food & bars" },
  { value: "family", label: "Family" },
  { value: "shops", label: "Shops" },
  { value: "spa", label: "Spa" },
  { value: "show", label: "Shows" },
];

interface CategoryFiltersProps {
  selected: EventCategory | "all";
  onSelect: (category: EventCategory | "all") => void;
}

export function CategoryFilters({ selected, onSelect }: CategoryFiltersProps) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-1">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onSelect(cat.value)}
          className={`flex-shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors ${
            selected === cat.value
              ? "bg-ink text-white"
              : "border border-hairline bg-surface text-ink-2 hover:bg-surface-2"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

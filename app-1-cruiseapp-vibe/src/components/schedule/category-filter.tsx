"use client";

import { cn } from "@/lib/utils";

const CATEGORIES = [
  { value: null, label: "All" },
  { value: "show", label: "Shows" },
  { value: "music", label: "Music" },
  { value: "dining", label: "Dining" },
  { value: "activity", label: "Activities" },
  { value: "fitness", label: "Fitness" },
  { value: "kids", label: "Kids" },
  { value: "other", label: "Other" },
];

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-2 min-w-max px-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.label}
            onClick={() => onCategoryChange(cat.value)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
              selectedCategory === cat.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}

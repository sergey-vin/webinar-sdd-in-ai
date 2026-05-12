"use client";

import type { EventCategory } from "@/lib/types";
import { useT } from "@/lib/i18n";
import {
  Theater,
  Waves,
  UtensilsCrossed,
  Compass,
  Dumbbell,
  Baby,
  Music,
} from "lucide-react";

const categories: { value: EventCategory | "all"; labelKey: string; icon: React.ReactNode }[] = [
  { value: "all", labelKey: "category.all", icon: null },
  { value: "show", labelKey: "category.show", icon: <Theater className="w-3.5 h-3.5" /> },
  { value: "pool", labelKey: "category.pool", icon: <Waves className="w-3.5 h-3.5" /> },
  { value: "restaurant", labelKey: "category.restaurant", icon: <UtensilsCrossed className="w-3.5 h-3.5" /> },
  { value: "excursion", labelKey: "category.excursion", icon: <Compass className="w-3.5 h-3.5" /> },
  { value: "sport", labelKey: "category.sport", icon: <Dumbbell className="w-3.5 h-3.5" /> },
  { value: "kids", labelKey: "category.kids", icon: <Baby className="w-3.5 h-3.5" /> },
  { value: "music", labelKey: "category.music", icon: <Music className="w-3.5 h-3.5" /> },
];

interface CategoryFilterProps {
  selected: EventCategory | "all";
  onSelect: (category: EventCategory | "all") => void;
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  const t = useT();

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onSelect(cat.value)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors duration-200 ${
            selected === cat.value
              ? "bg-navy text-white"
              : "bg-white text-navy border border-ocean-dark hover:bg-ocean"
          }`}
        >
          {cat.icon}
          {t(cat.labelKey)}
        </button>
      ))}
    </div>
  );
}

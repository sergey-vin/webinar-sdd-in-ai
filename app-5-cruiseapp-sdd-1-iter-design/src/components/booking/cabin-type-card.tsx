import type { CabinType } from "@/lib/types";
import { BedDouble, Eye, Sun, Crown } from "lucide-react";

const typeConfig: Record<
  CabinType,
  {
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  internal: {
    label: "Internal",
    description: "Cozy cabin, no window",
    icon: BedDouble,
  },
  window: {
    label: "Sea View",
    description: "Porthole or window",
    icon: Eye,
  },
  balcony: {
    label: "Balcony",
    description: "Private outdoor space",
    icon: Sun,
  },
  suite: {
    label: "Suite",
    description: "Luxury living area",
    icon: Crown,
  },
};

interface CabinTypeCardProps {
  type: CabinType;
  priceFrom: number;
  available: number;
}

export function CabinTypeCard({ type, priceFrom, available }: CabinTypeCardProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div className="flex flex-col items-center gap-2 rounded-radius-lg border border-hairline bg-surface p-4 text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft text-brand">
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-sm font-medium text-ink">{config.label}</div>
      <div className="text-[11px] text-ink-4">{config.description}</div>
      <div className="mt-1 text-lg font-semibold text-ink">
        from €{priceFrom}
      </div>
      <div
        className={`text-[11px] font-medium ${
          available > 0 ? "text-good" : "text-bad"
        }`}
      >
        {available > 0 ? `${available} available` : "Sold out"}
      </div>
    </div>
  );
}

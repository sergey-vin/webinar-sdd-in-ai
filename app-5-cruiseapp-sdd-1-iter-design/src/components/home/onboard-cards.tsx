import type { OnboardVenue } from "@/lib/types";
import { Music, Coffee, Waves, Wine, UtensilsCrossed, Theater } from "lucide-react";

const venueIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  music: Music,
  coffee: Coffee,
  spa: Waves,
  wine: Wine,
  utensils: UtensilsCrossed,
  theater: Theater,
};

interface OnboardCardsProps {
  venues: OnboardVenue[];
}

export function OnboardCards({ venues }: OnboardCardsProps) {
  return (
    <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
      {venues.map((venue) => {
        const Icon = venueIcons[venue.icon] || Music;
        return (
          <div
            key={venue.id}
            className="flex w-[150px] flex-shrink-0 flex-col gap-2 rounded-radius-lg border border-hairline bg-surface p-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-radius-sm bg-brand-soft text-brand">
              <Icon className="h-4 w-4" />
            </div>
            <div className="text-sm font-medium text-ink">{venue.title}</div>
            <div className="text-[11px] text-ink-4">{venue.location}</div>
            {venue.time && (
              <div
                className={`inline-flex self-start rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  venue.isActive
                    ? "bg-green-50 text-good"
                    : "bg-surface-sunk text-ink-3"
                }`}
              >
                {venue.time}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

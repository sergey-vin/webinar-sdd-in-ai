import { Header } from "@/components/layout/header";
import { HeroCard } from "@/components/home/hero-card";
import { QuickActions } from "@/components/home/quick-actions";
import { JourneyTimeline } from "@/components/home/journey-timeline";
import { OnboardCards } from "@/components/home/onboard-cards";
import type { ShipStatus, JourneyLeg, OnboardVenue } from "@/lib/types";

import shipStatusData from "../../public/data/ship-status.json";
import journeyData from "../../public/data/journey.json";
import venuesData from "../../public/data/venues.json";

const shipStatus = shipStatusData as ShipStatus;
const journey = journeyData as JourneyLeg[];
const venues = venuesData as OnboardVenue[];

export default function HomePage() {
  return (
    <div>
      <Header
        title="Trip"
        subtitle={`Day ${shipStatus.dayOfTrip} of ${shipStatus.totalDays} · ${shipStatus.route}`}
        showNotification
        showTimezone
      />

      <div className="space-y-5 px-5">
        <HeroCard status={shipStatus} />
        <QuickActions />

        <section>
          <div className="mb-3 flex items-baseline justify-between px-1">
            <h2 className="font-display text-xl">Your journey</h2>
            <span className="text-xs font-medium text-ink-3">View all</span>
          </div>
          <JourneyTimeline legs={journey} />
        </section>

        <section>
          <div className="mb-3 flex items-baseline justify-between px-1">
            <h2 className="font-display text-xl">While you&apos;re aboard</h2>
            <span className="text-xs font-medium text-ink-3">See all</span>
          </div>
          <OnboardCards venues={venues} />
        </section>
      </div>
    </div>
  );
}

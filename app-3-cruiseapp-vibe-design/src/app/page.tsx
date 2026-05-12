"use client";

import { useState } from "react";
import { TabBar } from "@/components/shell/tab-bar";
import { TripTimeline } from "@/components/screens/trip-timeline";
import { BoardingPass } from "@/components/screens/boarding-pass";
import { Schedule } from "@/components/screens/schedule";
import { ShipMap } from "@/components/screens/ship-map";
import { SearchScreen } from "@/components/screens/search";
import { RouteScreen } from "@/components/screens/route";
import { ClubCardScreen } from "@/components/screens/club-card";
import { ProfileScreen } from "@/components/screens/profile";
import type { TabId } from "@/lib/types";

type Screen = TabId | "pass" | "schedule" | "map";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("trip");

  const activeTab: TabId =
    screen === "pass" || screen === "schedule" || screen === "map"
      ? "trip"
      : screen;

  const handleNavigate = (target: string) => {
    setScreen(target as Screen);
  };

  const handleTab = (tab: TabId) => {
    setScreen(tab);
  };

  return (
    <div className="relative min-h-dvh bg-bg flex flex-col max-w-[500px] mx-auto">
      <div className="flex-1 flex flex-col">
        {screen === "trip" && <TripTimeline onNavigate={handleNavigate} />}
        {screen === "pass" && <BoardingPass />}
        {screen === "schedule" && <Schedule />}
        {screen === "map" && <ShipMap />}
        {screen === "search" && <SearchScreen />}
        {screen === "route" && <RouteScreen />}
        {screen === "club" && <ClubCardScreen />}
        {screen === "you" && <ProfileScreen />}
      </div>
      <TabBar active={activeTab} onTab={handleTab} />
    </div>
  );
}

"use client";

import { Search, MapPin, CreditCard, User } from "lucide-react";
import { TopBar } from "@/components/shell/top-bar";

const screenConfig: Record<string, { title: string; subtitle: string; icon: typeof Search }> = {
  search: { title: "Search", subtitle: "Find & compare", icon: Search },
  route: { title: "Route", subtitle: "Door-to-door", icon: MapPin },
  club: { title: "Club card", subtitle: "Loyalty", icon: CreditCard },
  you: { title: "Profile", subtitle: "Account", icon: User },
};

export function Placeholder({ screen }: { screen: string }) {
  const config = screenConfig[screen] || screenConfig.search;
  const Icon = config.icon;

  return (
    <>
      <TopBar title={config.title} subtitle={config.subtitle} />
      <div className="flex-1 flex flex-col items-center justify-center text-ink-4 px-5">
        <Icon size={48} strokeWidth={1} />
        <div className="text-lg font-semibold mt-4 text-ink-3">{config.title}</div>
        <div className="text-sm text-ink-4 mt-1 text-center">Coming soon in the next iteration</div>
      </div>
    </>
  );
}

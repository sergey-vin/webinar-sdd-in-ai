"use client";

import { Ship, Search, MapPin, CreditCard, User } from "lucide-react";
import type { TabId } from "@/lib/types";

const tabs: { id: TabId; label: string; icon: typeof Ship }[] = [
  { id: "trip", label: "Trip", icon: Ship },
  { id: "search", label: "Search", icon: Search },
  { id: "route", label: "Route", icon: MapPin },
  { id: "club", label: "Club", icon: CreditCard },
  { id: "you", label: "You", icon: User },
];

export function TabBar({
  active,
  onTab,
}: {
  active: TabId;
  onTab: (id: TabId) => void;
}) {
  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50 bg-ink text-white rounded-full px-2 py-2 flex justify-around items-center shadow-lg max-w-[500px] mx-auto">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onTab(id)}
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2 px-1 rounded-full text-[10px] font-medium transition-all ${
            active === id
              ? "bg-accent text-white"
              : "text-white/55 hover:text-white/80"
          }`}
        >
          <Icon size={20} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

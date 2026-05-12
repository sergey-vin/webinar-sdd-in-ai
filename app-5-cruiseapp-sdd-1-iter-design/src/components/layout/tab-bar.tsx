"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Compass,
  CalendarDays,
  Map,
  BedDouble,
  Navigation,
} from "lucide-react";

const tabs = [
  { href: "/", label: "Trip", icon: Compass },
  { href: "/schedule", label: "Schedule", icon: CalendarDays },
  { href: "/map", label: "Map", icon: Map },
  { href: "/booking", label: "Booking", icon: BedDouble },
  { href: "/logistics", label: "Logistics", icon: Navigation },
];

export function TabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50 flex items-center justify-around rounded-full bg-ink p-2 shadow-lg">
      {tabs.map((tab) => {
        const isActive =
          tab.href === "/"
            ? pathname === "/"
            : pathname.startsWith(tab.href);
        const Icon = tab.icon;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex flex-1 flex-col items-center justify-center gap-0.5 rounded-full px-1 py-2 text-[10px] font-medium transition-all ${
              isActive
                ? "bg-accent text-white"
                : "text-white/55 hover:text-white/80"
            }`}
          >
            <Icon className="h-5 w-5" />
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

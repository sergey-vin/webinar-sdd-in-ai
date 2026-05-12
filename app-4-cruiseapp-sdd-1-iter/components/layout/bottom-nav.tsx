"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarDays, Map, Ship, Truck } from "lucide-react";
import { useT } from "@/lib/i18n";

const tabs = [
  { href: "/", labelKey: "nav.home", icon: Home },
  { href: "/schedule", labelKey: "nav.schedule", icon: CalendarDays },
  { href: "/map", labelKey: "nav.map", icon: Map },
  { href: "/booking", labelKey: "nav.booking", icon: Ship },
  { href: "/logistics", labelKey: "nav.logistics", icon: Truck },
];

export function BottomNav() {
  const pathname = usePathname();
  const t = useT();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-ocean-dark z-50">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center gap-0.5 py-2 px-3 text-xs transition-colors duration-200 ${
                isActive
                  ? "text-navy font-semibold"
                  : "text-muted-foreground hover:text-navy"
              }`}
            >
              <Icon
                className={`w-5 h-5 ${isActive ? "text-gold" : ""}`}
              />
              <span>{t(tab.labelKey)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

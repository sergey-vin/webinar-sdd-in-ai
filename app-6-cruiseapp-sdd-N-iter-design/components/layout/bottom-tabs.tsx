"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Ship,
  Search,
  Route,
  CreditCard,
  User,
} from "lucide-react";

const tabs = [
  { key: "trip", href: "/trip", icon: Ship },
  { key: "search", href: "/search", icon: Search },
  { key: "route", href: "/route", icon: Route },
  { key: "club", href: "/club", icon: CreditCard },
  { key: "profile", href: "/profile", icon: User },
] as const;

export function BottomTabs({ locale }: { locale: string }) {
  const pathname = usePathname();
  const t = useTranslations("tabs");

  return (
    <nav
      data-testid="bottom-tabs"
      className="fixed bottom-0 left-0 right-0 z-50 bg-ink border-t border-ink-2 md:max-w-[390px] md:mx-auto md:rounded-b-[32px]"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map(({ key, href, icon: Icon }) => {
          const fullPath = `/${locale}${href}`;
          const isActive = pathname.startsWith(fullPath);

          return (
            <Link
              key={key}
              href={fullPath}
              data-testid={`tab-${key}`}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
                isActive
                  ? "text-accent"
                  : "text-ink-4 hover:text-ink-5"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[11px] font-medium">{t(key)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

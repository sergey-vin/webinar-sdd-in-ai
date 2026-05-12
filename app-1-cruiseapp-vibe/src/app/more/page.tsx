import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Clock,
  Ship,
  Settings,
  Info,
  type LucideIcon,
} from "lucide-react";

interface MoreLink {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

const LINKS: MoreLink[] = [
  {
    href: "/clock",
    label: "Ship Clock",
    description: "Current ship time and timezone info",
    icon: Clock,
  },
  {
    href: "/dashboard",
    label: "My Dashboard",
    description: "Your bookings and profile settings",
    icon: Settings,
  },
  {
    href: "/cruises",
    label: "Browse Cruises",
    description: "Explore available cruise itineraries",
    icon: Ship,
  },
  {
    href: "/",
    label: "About",
    description: "About this app",
    icon: Info,
  },
];

export default function MorePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <h1 className="text-2xl font-bold">More</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.href} href={link.href}>
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                  <CardContent className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Icon className="size-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{link.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {link.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

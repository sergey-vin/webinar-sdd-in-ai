"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { activeBooking, cruises, demoUser } from "@/lib/mock-data";

const quickLinks = [
  {
    href: "/my-cruise/ship-map",
    title: "Ship Map",
    desc: "Navigate the ship",
    icon: "🗺️",
  },
  {
    href: "/my-cruise/schedule",
    title: "Schedule",
    desc: "Activities & shows",
    icon: "📅",
  },
  {
    href: "/my-cruise/clock",
    title: "Ship Clock",
    desc: "Time zones & alerts",
    icon: "🕐",
  },
  {
    href: "/my-cruise/transfer",
    title: "Transfer",
    desc: "Getting to the port",
    icon: "🚗",
  },
];

export default function MyCruisePage() {
  const cruise = cruises.find((c) => c.id === activeBooking.cruiseId)!;
  const cabin = cruise.cabins.find(
    (c) => c.id === activeBooking.cabinCategoryId
  )!;

  // Calculate current day of cruise (mock: day 2)
  const currentDay = 2;
  const currentPort = cruise.ports.find((p) => p.day === currentDay);
  const nextPort = cruise.ports.find((p) => p.day > currentDay);

  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      {/* User greeting */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
          {demoUser.avatar}
        </div>
        <div>
          <p className="font-semibold">Hello, {demoUser.name.split(" ")[0]}!</p>
          <p className="text-sm text-muted-foreground">
            Day {currentDay} of your cruise
          </p>
        </div>
      </div>

      {/* Current status */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">{cruise.name}</h2>
            <Badge variant="secondary">{cruise.shipName}</Badge>
          </div>
          <div className="text-sm space-y-1 text-muted-foreground">
            <p>
              🎫 Cabin: {cabin.name} — {activeBooking.cabinNumber}
            </p>
            <p>
              📍 {currentPort ? `At sea (en route to ${nextPort?.name})` : "At sea"}
            </p>
            <p>
              📅 {cruise.departureDate} — {cruise.returnDate}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Route progress */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">Voyage Progress</h3>
          <div className="space-y-2">
            {cruise.ports.map((port, i) => {
              const isPast = port.day < currentDay;
              const isCurrent = port.day === currentDay;
              const isFuture = port.day > currentDay;
              return (
                <div key={port.id} className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        isPast
                          ? "bg-green-500"
                          : isCurrent
                          ? "bg-primary ring-2 ring-primary/30"
                          : "bg-muted-foreground/30"
                      }`}
                    />
                    {i < cruise.ports.length - 1 && (
                      <div
                        className={`w-0.5 h-4 ${
                          isPast ? "bg-green-500/50" : "bg-muted-foreground/20"
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-sm ${
                        isCurrent ? "font-semibold" : ""
                      } ${isFuture ? "text-muted-foreground" : ""}`}
                    >
                      Day {port.day}: {port.name}
                    </p>
                  </div>
                  {isPast && (
                    <span className="text-xs text-green-600">✓</span>
                  )}
                  {isCurrent && (
                    <Badge variant="outline" className="text-xs">
                      Today
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Separator className="my-4" />

      {/* Quick links */}
      <h3 className="font-semibold mb-3">Quick Access</h3>
      <div className="grid grid-cols-2 gap-3">
        {quickLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="hover:shadow-md transition-shadow h-full">
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">{link.icon}</div>
                <p className="font-medium text-sm">{link.title}</p>
                <p className="text-xs text-muted-foreground">{link.desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

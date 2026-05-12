"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { scheduleEvents } from "@/lib/mock-data";

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "show", label: "Shows" },
  { key: "food", label: "Food" },
  { key: "sport", label: "Sports" },
  { key: "music", label: "Music" },
  { key: "wellness", label: "Wellness" },
  { key: "kids", label: "Kids" },
  { key: "social", label: "Social" },
];

const CATEGORY_COLORS: Record<string, string> = {
  show: "bg-red-100 text-red-700",
  food: "bg-orange-100 text-orange-700",
  sport: "bg-green-100 text-green-700",
  music: "bg-purple-100 text-purple-700",
  wellness: "bg-pink-100 text-pink-700",
  kids: "bg-amber-100 text-amber-700",
  social: "bg-blue-100 text-blue-700",
};

export default function SchedulePage() {
  const [activeDay, setActiveDay] = useState(2);
  const [category, setCategory] = useState("all");
  const [myPlan, setMyPlan] = useState<Set<string>>(new Set());

  const days = [...new Set(scheduleEvents.map((e) => e.day))].sort();

  const filtered = scheduleEvents
    .filter((e) => e.day === activeDay)
    .filter((e) => category === "all" || e.category === category)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const togglePlan = (id: string) => {
    setMyPlan((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-1">Daily Schedule</h1>
      <p className="text-sm text-muted-foreground mb-4">
        Activities, shows, and events
      </p>

      {/* Day selector */}
      <div className="flex gap-2 mb-4">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeDay === day
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Day {day}
          </button>
        ))}
      </div>

      {/* Category filter */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar mb-4 pb-1">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat.key}
            variant={category === cat.key ? "default" : "outline"}
            size="sm"
            onClick={() => setCategory(cat.key)}
            className="text-xs whitespace-nowrap h-7"
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {/* My Plan toggle */}
      {myPlan.size > 0 && (
        <div className="mb-4 p-2 bg-primary/10 rounded-lg text-sm text-center">
          {myPlan.size} event{myPlan.size !== 1 ? "s" : ""} in your plan
        </div>
      )}

      {/* Timeline */}
      <div className="space-y-3">
        {filtered.map((event) => {
          const inPlan = myPlan.has(event.id);
          return (
            <Card
              key={event.id}
              className={inPlan ? "border-primary/50 bg-primary/5" : ""}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {/* Time column */}
                  <div className="text-center min-w-[50px]">
                    <p className="text-sm font-bold">{event.startTime}</p>
                    <p className="text-xs text-muted-foreground">
                      {event.endTime}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-medium text-sm">{event.title}</h3>
                      <Badge
                        className={`text-xs shrink-0 ${
                          CATEGORY_COLORS[event.category] || ""
                        }`}
                        variant="secondary"
                      >
                        {event.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {event.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        📍 {event.venue} · Deck {event.deck}
                      </p>
                      <button
                        onClick={() => togglePlan(event.id)}
                        className={`text-xs px-2 py-1 rounded transition-colors ${
                          inPlan
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted hover:bg-primary/20"
                        }`}
                      >
                        {inPlan ? "✓ In Plan" : "+ Add"}
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          No events for this day and category.
        </p>
      )}
    </div>
  );
}

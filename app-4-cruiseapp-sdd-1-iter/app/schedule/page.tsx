"use client";

import { useState, useEffect } from "react";
import { EventList } from "@/components/schedule/event-list";
import { MyScheduleCard } from "@/components/schedule/my-schedule-card";
import { useScheduleStore } from "@/lib/stores/schedule-store";
import { CalendarDays, Star } from "lucide-react";
import type { CruiseEvent } from "@/lib/types";
import { useT } from "@/lib/i18n";

type Tab = "today" | "tomorrow" | "my";

export default function SchedulePage() {
  const [activeTab, setActiveTab] = useState<Tab>("today");
  const myEventIds = useScheduleStore((s) => s.myEventIds);
  const t = useT();

  const tabs: { value: Tab; label: string; icon: React.ReactNode }[] = [
    { value: "today", label: t("schedule.today"), icon: <CalendarDays className="w-4 h-4" /> },
    { value: "tomorrow", label: t("schedule.tomorrow"), icon: <CalendarDays className="w-4 h-4" /> },
    { value: "my", label: `${t("schedule.my")} (${myEventIds.length})`, icon: <Star className="w-4 h-4" /> },
  ];

  return (
    <div className="px-4 py-6 max-w-lg mx-auto space-y-4">
      <h1 className="font-heading text-2xl font-bold text-navy">{t("schedule.title")}</h1>

      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              activeTab === tab.value
                ? "bg-navy text-white"
                : "bg-white text-navy border border-ocean-dark hover:bg-ocean"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "my" ? (
        <MySchedule />
      ) : (
        <EventList day={activeTab} />
      )}
    </div>
  );
}

function MySchedule() {
  const myEventIds = useScheduleStore((s) => s.myEventIds);
  const [events, setEvents] = useState<CruiseEvent[]>([]);
  const t = useT();

  useEffect(() => {
    fetch("/data/events.json")
      .then((res) => res.json())
      .then((data: CruiseEvent[]) => {
        setEvents(data.filter((e) => myEventIds.includes(e.id)));
      });
  }, [myEventIds]);

  if (myEventIds.length === 0) {
    return (
      <div className="text-center py-12">
        <Star className="w-12 h-12 text-ocean-dark mx-auto mb-3" />
        <p className="text-muted-foreground text-sm">{t("schedule.empty")}</p>
        <p className="text-muted-foreground text-xs mt-1">{t("schedule.emptyHint")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {events
        .sort((a, b) => a.startTime.localeCompare(b.startTime))
        .map((event) => (
          <MyScheduleCard key={event.id} event={event} />
        ))}
    </div>
  );
}

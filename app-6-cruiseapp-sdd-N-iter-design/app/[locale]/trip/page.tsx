"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useTripStore } from "@/lib/stores/trip-store";
import { Timeline } from "@/components/trip/timeline";
import { DemoUserPicker } from "@/components/profile/demo-user-picker";
import { createClient } from "@/lib/supabase/client";
import type { EventItem } from "@/lib/types";

export default function TripPage() {
  const t = useTranslations("trip");
  const locale = useLocale();
  const { user, profile, loading: authLoading } = useAuthStore();
  const { trip, legs, loading: tripLoading, fetchActiveTrip } = useTripStore();
  const [savedEvents, setSavedEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    if (user) {
      fetchActiveTrip(user.id);
    }
  }, [user, fetchActiveTrip]);

  // Fetch saved events for vessel legs
  useEffect(() => {
    async function loadSavedEvents() {
      if (!profile || legs.length === 0) return;
      const vesselIds = [
        ...new Set(
          legs
            .filter((l) => l.route.vessel)
            .map((l) => l.route.vessel!.id),
        ),
      ];
      if (vesselIds.length === 0) return;

      const supabase = createClient();
      const { data: savedEventIds } = await supabase
        .from("user_events")
        .select("event_id")
        .eq("user_id", profile.id);

      if (!savedEventIds || savedEventIds.length === 0) return;

      const ids = savedEventIds.map((s) => s.event_id);
      const { data: events } = await supabase
        .from("events")
        .select(
          "*, venue:venues(name_en, name_ru, deck:decks(deck_number, name_en, name_ru))",
        )
        .in("id", ids)
        .order("start_time", { ascending: true });

      setSavedEvents((events as EventItem[]) ?? []);
    }
    loadSavedEvents();
  }, [profile, legs]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-ink-3 text-sm">{t("noTripDesc")}</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4">
        <DemoUserPicker />
      </div>
    );
  }

  if (tripLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center px-4">
        <p className="text-ink-3">{t("noTrip")}</p>
      </div>
    );
  }

  const tripTitle = locale === "ru" ? trip.title_ru : trip.title_en;

  return (
    <div data-testid="trip-page">
      {/* Trip header */}
      <div className="px-4 pt-4 pb-2">
        <h1 className="font-display text-2xl text-ink">{t("title")}</h1>
        <p className="text-sm text-ink-3 mt-1">{tripTitle}</p>
        {profile && (
          <p className="text-xs text-ink-4 mt-0.5">
            {profile.display_name} ·{" "}
            {t("day", {
              day: Math.max(
                1,
                Math.ceil(
                  (Date.now() - new Date(trip.start_date).getTime()) / 86400000,
                ),
              ),
            })}
          </p>
        )}
      </div>

      {/* Timeline */}
      <Timeline legs={legs} locale={locale} savedEvents={savedEvents} />
    </div>
  );
}

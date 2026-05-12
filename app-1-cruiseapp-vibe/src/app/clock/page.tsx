"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { ShipClock } from "@/components/clock/ship-clock";
import { DualClock } from "@/components/clock/dual-clock";
import { TimezoneAlert } from "@/components/clock/timezone-alert";
import { getShipTimezone, getCruiseDayNumber } from "@/lib/utils/timezone";
import { Clock as ClockIcon } from "lucide-react";
import type { Database } from "@/lib/supabase/types";

type TimezoneSchedule = Database["public"]["Tables"]["timezone_schedule"]["Row"];

export default function ClockPage() {
  const [shipTimezone, setShipTimezone] = useState<string>("UTC");
  const [homeTimezone, setHomeTimezone] = useState<string>("");
  const [upcomingChange, setUpcomingChange] = useState<TimezoneSchedule | null>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    // Set home timezone from browser
    const browserTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setHomeTimezone(browserTz);

    async function load() {
      const { data: { user } } = await supabase.auth.getUser();

      let cruiseId: string | null = null;
      let departureDate: string | null = null;

      // Try to get user's active booking
      if (user) {
        // Get home timezone from profile
        const { data: profile } = await supabase
          .from("user_profiles")
          .select("home_timezone")
          .eq("user_id", user.id)
          .single();

        if (profile?.home_timezone) {
          setHomeTimezone(profile.home_timezone);
        }

        const { data: booking } = await supabase
          .from("bookings")
          .select("cruise_id")
          .eq("user_id", user.id)
          .eq("status", "confirmed")
          .limit(1)
          .single();

        if (booking) {
          cruiseId = booking.cruise_id;
        }
      }

      // Demo mode: use first cruise
      if (!cruiseId) {
        const { data: cruise } = await supabase
          .from("cruises")
          .select("id, departure_date")
          .order("departure_date", { ascending: true })
          .limit(1)
          .single();

        if (cruise) {
          cruiseId = cruise.id;
          departureDate = cruise.departure_date;
        }
      } else {
        const { data: cruise } = await supabase
          .from("cruises")
          .select("departure_date")
          .eq("id", cruiseId)
          .single();
        departureDate = cruise?.departure_date ?? null;
      }

      if (cruiseId) {
        const { data: schedule } = await supabase
          .from("timezone_schedule")
          .select("*")
          .eq("cruise_id", cruiseId)
          .order("effective_from_day", { ascending: true });

        if (schedule && schedule.length > 0) {
          const dayNumber = departureDate
            ? getCruiseDayNumber(departureDate)
            : 1;

          const current = getShipTimezone(schedule, dayNumber);
          if (current) {
            setShipTimezone(current.iana_timezone);
          }

          // Check for upcoming timezone change
          const upcoming = schedule.find(
            (s) => s.effective_from_day === dayNumber + 1
          );
          if (upcoming && upcoming.direction && upcoming.minutes_change) {
            setUpcomingChange(upcoming);
          }
        }
      }

      setLoading(false);
    }

    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading clock...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
        <div className="flex items-center gap-2">
          <ClockIcon className="size-6" />
          <h1 className="text-2xl font-bold">Ship Clock</h1>
        </div>

        {upcomingChange && upcomingChange.direction && upcomingChange.minutes_change && (
          <TimezoneAlert
            direction={upcomingChange.direction as "forward" | "backward"}
            minutesChange={upcomingChange.minutes_change}
            effectiveTime={upcomingChange.effective_time}
          />
        )}

        <div className="flex justify-center py-8">
          <ShipClock ianaTimezone={shipTimezone} label="Ship Time" size="lg" />
        </div>

        {homeTimezone && (
          <DualClock shipTimezone={shipTimezone} homeTimezone={homeTimezone} />
        )}
      </div>
    </div>
  );
}

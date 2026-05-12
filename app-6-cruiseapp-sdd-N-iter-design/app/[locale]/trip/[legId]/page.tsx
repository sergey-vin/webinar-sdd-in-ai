"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import { BoardingPass } from "@/components/trip/boarding-pass";
import type { TripLegWithDetails } from "@/lib/types";

export default function LegDetailPage() {
  const params = useParams();
  const locale = useLocale();
  const legId = params.legId as string;
  const [leg, setLeg] = useState<TripLegWithDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeg() {
      const supabase = createClient();
      const { data } = await supabase
        .from("trip_legs")
        .select(
          `
          *,
          route:routes (
            *,
            carrier:carriers (*),
            origin:locations!routes_origin_id_fkey (*),
            destination:locations!routes_destination_id_fkey (*),
            vessel:vessels (*)
          )
        `,
        )
        .eq("id", legId)
        .single();

      setLeg(data as unknown as TripLegWithDetails | null);
      setLoading(false);
    }
    fetchLeg();
  }, [legId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!leg) {
    return (
      <div className="p-4 text-center text-ink-3">Leg not found</div>
    );
  }

  return <BoardingPass leg={leg} locale={locale} />;
}

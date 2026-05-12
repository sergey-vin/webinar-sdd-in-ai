"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { DeckMap } from "@/components/trip/deck-map";
import type { TripLegWithDetails } from "@/lib/types";

export default function DeckMapPage() {
  const params = useParams();
  const locale = useLocale();
  const t = useTranslations("trip");
  const tCommon = useTranslations("common");
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

  if (!leg || !leg.route.vessel) {
    return (
      <div className="p-4">
        <Link
          href={`/${locale}/trip`}
          className="inline-flex items-center gap-1 text-sm text-brand hover:text-brand-light mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          {tCommon("back")}
        </Link>
        <p className="text-sm text-ink-3 text-center">
          No deck map available for this leg
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <Link
        href={`/${locale}/trip/${legId}`}
        className="inline-flex items-center gap-1 text-sm text-brand hover:text-brand-light"
        data-testid="back-to-boarding"
      >
        <ArrowLeft className="w-4 h-4" />
        {tCommon("back")}
      </Link>

      <h1 className="font-display text-2xl text-ink">{t("deckMap")}</h1>
      <p className="text-xs text-ink-3">{leg.route.vessel.name}</p>

      <DeckMap vesselId={leg.route.vessel.id} seatInfo={leg.seat_info} />
    </div>
  );
}

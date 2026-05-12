"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/lib/stores/auth-store";
import { createClient } from "@/lib/supabase/client";
import { TIER_COLORS } from "@/lib/constants";
import {
  LogIn,
  Percent,
  Wifi,
  Armchair,
  ArrowUpCircle,
  Wine,
  Star,
  Gift,
} from "lucide-react";
import type { ClubPerk } from "@/lib/types";

const TIER_ORDER = ["blue", "silver", "gold", "platinum"] as const;
const TIER_POINTS = { blue: 0, silver: 1000, gold: 3000, platinum: 8000 };

const perkIcons: Record<string, typeof Star> = {
  "log-in": LogIn,
  percent: Percent,
  wifi: Wifi,
  armchair: Armchair,
  "arrow-up-circle": ArrowUpCircle,
  wine: Wine,
};

export function ClubCard() {
  const t = useTranslations("club");
  const locale = useLocale();
  const { profile } = useAuthStore();
  const [perks, setPerks] = useState<ClubPerk[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPerks() {
      if (!profile) {
        setLoading(false);
        return;
      }
      const supabase = createClient();
      const { data } = await supabase
        .from("club_perks")
        .select("*")
        .eq("tier", profile.club_tier)
        .order("id", { ascending: true });

      setPerks((data as ClubPerk[]) ?? []);
      setLoading(false);
    }
    loadPerks();
  }, [profile]);

  if (!profile) {
    return (
      <div className="p-4 text-center text-ink-3 text-sm">
        Sign in to see your club card
      </div>
    );
  }

  const currentTierIdx = TIER_ORDER.indexOf(
    profile.club_tier as (typeof TIER_ORDER)[number],
  );
  const nextTier =
    currentTierIdx < TIER_ORDER.length - 1
      ? TIER_ORDER[currentTierIdx + 1]
      : null;
  const nextTierPoints = nextTier
    ? TIER_POINTS[nextTier]
    : TIER_POINTS.platinum;
  const currentTierPoints = TIER_POINTS[profile.club_tier as keyof typeof TIER_POINTS] ?? 0;
  const progressPercent = nextTier
    ? Math.min(
        100,
        ((profile.club_points - currentTierPoints) /
          (nextTierPoints - currentTierPoints)) *
          100,
      )
    : 100;

  const tierColor = TIER_COLORS[profile.club_tier] ?? TIER_COLORS.blue;

  return (
    <div data-testid="club-page" className="p-4 space-y-4">
      <h1 className="font-display text-2xl text-ink">{t("title")}</h1>

      {/* Visual club card */}
      <Card
        data-testid="club-visual-card"
        className="p-5 relative overflow-hidden text-white"
        style={{ backgroundColor: tierColor }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 400 240" className="w-full h-full">
            <circle cx="350" cy="50" r="120" fill="white" />
            <circle cx="80" cy="200" r="80" fill="white" />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="text-xs uppercase tracking-widest opacity-80">
                CUThere Club
              </div>
              <div className="text-2xl font-display mt-1">
                {profile.club_tier.toUpperCase()}
              </div>
            </div>
            <Star className="w-8 h-8 opacity-80" />
          </div>

          <div className="space-y-1">
            <div className="text-lg font-semibold">
              {profile.display_name}
            </div>
            <div className="text-xs font-mono opacity-80">
              {profile.club_card_no}
            </div>
          </div>

          <div className="flex items-end justify-between mt-4">
            <div>
              <div className="text-xs opacity-80">{t("points")}</div>
              <div className="text-2xl font-bold font-mono">
                {profile.club_points.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tier progress */}
      {nextTier && (
        <Card className="p-4 bg-white" data-testid="tier-progress">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-ink-4 uppercase">
              {t("nextTier")}
            </span>
            <span
              className="text-xs font-semibold uppercase"
              style={{ color: TIER_COLORS[nextTier] }}
            >
              {nextTier}
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-surface-sunk overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${progressPercent}%`,
                backgroundColor: tierColor,
              }}
            />
          </div>
          <div className="text-xs text-ink-3 mt-1">
            {profile.club_points.toLocaleString()} /{" "}
            {nextTierPoints.toLocaleString()} {t("points").toLowerCase()}
          </div>
        </Card>
      )}

      {/* Perks */}
      <div>
        <h2 className="text-sm font-semibold text-ink-3 uppercase tracking-wide mb-2">
          {t("perks")}
        </h2>
        {loading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-12 bg-surface-sunk rounded" />
            <div className="h-12 bg-surface-sunk rounded" />
          </div>
        ) : (
          <Card
            className="bg-white divide-y divide-surface-sunk"
            data-testid="perks-list"
          >
            {perks.map((perk) => {
              const Icon = perkIcons[perk.icon ?? ""] ?? Gift;
              const perkText =
                locale === "ru" ? perk.perk_ru : perk.perk_en;
              return (
                <div
                  key={perk.id}
                  className="flex items-center gap-3 px-4 py-3"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: tierColor + "20" }}
                  >
                    <Icon
                      className="w-4 h-4"
                      style={{ color: tierColor }}
                    />
                  </div>
                  <span className="text-sm text-ink">{perkText}</span>
                </div>
              );
            })}
          </Card>
        )}
      </div>
    </div>
  );
}

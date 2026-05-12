"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";
import { useTripStore } from "@/lib/stores/trip-store";
import { DemoUserPicker } from "@/components/profile/demo-user-picker";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TIER_COLORS } from "@/lib/constants";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, Clock, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const t = useTranslations("profile");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { profile, signOut, user } = useAuthStore();
  const clearTrip = useTripStore((s) => s.clear);

  const otherLocale = locale === "en" ? "ru" : "en";
  const otherLocaleName = locale === "en" ? "Русский" : "English";

  function switchLocale() {
    const newPath = pathname.replace(`/${locale}`, `/${otherLocale}`);
    router.push(newPath);
  }

  async function handleSignOut() {
    await signOut();
    clearTrip();
  }

  return (
    <div data-testid="profile-page" className="p-4 space-y-4">
      <h1 className="font-display text-2xl text-ink">{t("title")}</h1>

      {profile && (
        <Card className="p-4 bg-white">
          <div className="flex items-center gap-3">
            <Avatar className="w-14 h-14">
              <AvatarFallback className="bg-brand text-white text-lg font-semibold">
                {profile.display_name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-lg text-ink">
                {profile.display_name}
              </div>
              <div className="text-sm text-ink-3">{profile.email}</div>
              <Badge
                className="mt-1 text-xs text-white border-0"
                style={{ backgroundColor: TIER_COLORS[profile.club_tier] }}
              >
                {profile.club_tier.toUpperCase()}
              </Badge>
            </div>
          </div>
        </Card>
      )}

      {/* Settings */}
      <div>
        <h2 className="text-sm font-semibold text-ink-3 uppercase tracking-wide mb-2">
          {t("settings")}
        </h2>
        <Card className="bg-white divide-y divide-surface-sunk">
          {/* Language */}
          <button
            data-testid="locale-switch"
            onClick={switchLocale}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-surface-sunk/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Languages className="w-5 h-5 text-ink-3" />
              <span className="text-sm text-ink">{t("language")}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm text-ink-3 font-medium">
                {locale === "en" ? "English" : "Русский"}
              </span>
              <span className="text-xs text-brand">→ {otherLocaleName}</span>
            </div>
          </button>

          {/* Home timezone */}
          {profile && (
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-ink-3" />
                <span className="text-sm text-ink">{t("homeTimezone")}</span>
              </div>
              <span
                className="text-sm text-ink-3 font-mono"
                data-testid="home-tz"
              >
                {profile.home_timezone.replace("Europe/", "")}
              </span>
            </div>
          )}
        </Card>
      </div>

      {/* Demo user switch */}
      <div>
        <h2 className="text-sm font-semibold text-ink-3 uppercase tracking-wide mb-2">
          {t("switchUser")}
        </h2>
        <DemoUserPicker />
      </div>

      {user && (
        <Button
          variant="outline"
          className="w-full"
          onClick={handleSignOut}
          data-testid="sign-out-btn"
        >
          <LogOut className="w-4 h-4 mr-2" />
          {tCommon("signOut")}
        </Button>
      )}
    </div>
  );
}

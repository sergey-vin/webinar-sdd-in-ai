"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/lib/stores/auth-store";
import { DEMO_USERS } from "@/lib/constants";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

export function DemoUserPicker() {
  const t = useTranslations("auth");
  const tProfile = useTranslations("profile");
  const { signIn, user } = useAuthStore();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSignIn = async (key: keyof typeof DEMO_USERS) => {
    setLoading(key);
    try {
      await signIn(DEMO_USERS[key].email, DEMO_USERS[key].password);
    } catch (err) {
      console.error("Sign in failed:", err);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div data-testid="demo-user-picker" className="space-y-4">
      <div className="text-center">
        <User className="w-10 h-10 text-ink-4 mx-auto mb-2" />
        <p className="text-sm text-ink-3">{t("selectUser")}</p>
      </div>

      {(Object.keys(DEMO_USERS) as Array<keyof typeof DEMO_USERS>).map(
        (key) => {
          const demoUser = DEMO_USERS[key];
          const isCurrentUser = user?.email === demoUser.email;
          const isLoading = loading === key;
          const initials = demoUser.name
            .split(" ")
            .map((n) => n[0])
            .join("");

          return (
            <Card
              key={key}
              data-testid={`demo-user-${key}`}
              onClick={() => !isLoading && handleSignIn(key)}
              className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                isCurrentUser ? "border-brand bg-brand-soft" : "bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback
                    className={`font-semibold text-sm ${
                      key === "elena"
                        ? "bg-accent text-white"
                        : "bg-brand text-white"
                    }`}
                  >
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-semibold text-ink">{demoUser.name}</div>
                  <div className="text-xs text-ink-3">{demoUser.email}</div>
                </div>
                {isLoading && (
                  <div className="w-5 h-5 border-2 border-brand border-t-transparent rounded-full animate-spin" />
                )}
                {isCurrentUser && (
                  <span className="text-xs text-brand font-medium">Active</span>
                )}
              </div>
            </Card>
          );
        },
      )}
    </div>
  );
}

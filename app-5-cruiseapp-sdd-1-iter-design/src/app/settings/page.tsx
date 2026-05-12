"use client";

import { Header } from "@/components/layout/header";
import { useThemeStore } from "@/store/theme-store";
import { useLocaleStore } from "@/store/locale-store";
import { Sun, Moon, Monitor, Globe } from "lucide-react";

export default function SettingsPage() {
  const { theme, setTheme } = useThemeStore();
  const { locale, setLocale } = useLocaleStore();

  return (
    <div>
      <Header title="Settings" />

      <div className="space-y-6 px-5">
        {/* Appearance */}
        <section>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-4">
            Appearance
          </h2>
          <div className="flex gap-2 rounded-radius-md border border-hairline bg-surface p-1">
            {([
              { value: "light" as const, icon: Sun, label: "Light" },
              { value: "dark" as const, icon: Moon, label: "Dark" },
              { value: "auto" as const, icon: Monitor, label: "Auto" },
            ]).map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.value}
                  onClick={() => setTheme(opt.value)}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-radius-sm py-2.5 text-sm font-medium transition-colors ${
                    theme === opt.value
                      ? "bg-ink text-white"
                      : "text-ink-3 hover:text-ink"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {opt.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Language */}
        <section>
          <h2 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-4">
            <Globe className="h-3.5 w-3.5" />
            Language
          </h2>
          <div className="space-y-1.5">
            {([
              { value: "en" as const, label: "English" },
              { value: "ru" as const, label: "Русский" },
            ]).map((opt) => (
              <button
                key={opt.value}
                onClick={() => setLocale(opt.value)}
                className={`flex w-full items-center justify-between rounded-radius-md border p-3 text-left transition-colors ${
                  locale === opt.value
                    ? "border-brand bg-brand-soft/40"
                    : "border-hairline bg-surface"
                }`}
              >
                <span className="text-sm font-medium text-ink">{opt.label}</span>
                {locale === opt.value && (
                  <div className="h-2.5 w-2.5 rounded-full bg-brand" />
                )}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

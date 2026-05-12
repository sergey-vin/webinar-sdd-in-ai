"use client";

import { useState } from "react";
import {
  MoreHorizontal, ChevronRight, Ticket, User, CreditCard,
  Globe, Clock, Moon, Bell, Download, Wifi, LogOut, Sun, Monitor,
  Check,
} from "lucide-react";
import { TopBar, IconButton } from "@/components/shell/top-bar";
import { Avatar } from "@/components/ui/avatar";

type Appearance = "auto" | "light" | "dark";
type TimeFormat = "24h" | "12h";

export function ProfileScreen() {
  const [appearance, setAppearance] = useState<Appearance>("auto");
  const [timeFormat, setTimeFormat] = useState<TimeFormat>("24h");
  const [notifications, setNotifications] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [offlinePack, setOfflinePack] = useState(true);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (s: string) => setExpandedSection(expandedSection === s ? null : s);

  return (
    <>
      <TopBar title="Profile" right={
        <IconButton label="More"><MoreHorizontal size={18} /></IconButton>
      } />

      <div className="flex-1 overflow-y-auto px-5 pb-24 no-scrollbar">
        {/* User card */}
        <div className="bg-surface border border-hairline rounded-lg flex items-center gap-3.5 p-4">
          <Avatar persona="solo" size={56} />
          <div className="flex-1 min-w-0">
            <div className="text-base font-semibold">Anna Lindqvist</div>
            <div className="text-xs text-ink-3 mt-0.5">Captain tier · 4421-8870</div>
          </div>
          <button className="w-10 h-10 rounded-full bg-surface border border-hairline flex items-center justify-center text-ink-3">
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Travel docs */}
        <div className="flex items-baseline justify-between px-1 pb-2.5 mt-[18px]">
          <h2 className="font-display font-normal text-xl tracking-tight m-0">Travel docs</h2>
        </div>
        <div className="bg-surface border border-hairline rounded-lg overflow-hidden">
          <RowItem icon={<Ticket size={18} />} title="2 active bookings" sub="Helsinki → Tallinn · Tallinn stay" />
          <div className="h-px bg-hairline" />
          <RowItem icon={<User size={18} />} title="Passport · SE…2841" sub="Expires Aug 2031" />
          <div className="h-px bg-hairline" />
          <RowItem icon={<CreditCard size={18} />} title="Payment · Visa ··4421" />
        </div>

        {/* Preferences */}
        <div className="flex items-baseline justify-between px-1 pb-2.5 mt-[18px]">
          <h2 className="font-display font-normal text-xl tracking-tight m-0">Preferences</h2>
        </div>
        <div className="bg-surface border border-hairline rounded-lg overflow-hidden">
          <RowItem icon={<Globe size={18} />} title="Language" right="English" />
          <div className="h-px bg-hairline" />

          {/* Time format — interactive */}
          <div>
            <div
              className="cursor-pointer"
              onClick={() => toggleSection("time")}
            >
              <RowItem icon={<Clock size={18} />} title="Time format" right={timeFormat} />
            </div>
            {expandedSection === "time" && (
              <div className="px-4 pb-3 flex gap-2 animate-[fadeIn_0.15s_ease]">
                {(["24h", "12h"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setTimeFormat(f)}
                    className={`flex-1 py-2 rounded-full text-xs font-semibold border transition-all ${
                      timeFormat === f ? "bg-ink text-white border-ink" : "bg-surface text-ink-2 border-hairline"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="h-px bg-hairline" />

          {/* Appearance — interactive */}
          <div>
            <div
              className="cursor-pointer"
              onClick={() => toggleSection("appearance")}
            >
              <RowItem icon={<Moon size={18} />} title="Appearance" right={appearance.charAt(0).toUpperCase() + appearance.slice(1)} />
            </div>
            {expandedSection === "appearance" && (
              <div className="px-4 pb-3 flex gap-2 animate-[fadeIn_0.15s_ease]">
                {([
                  { key: "auto" as const, icon: Monitor, label: "Auto" },
                  { key: "light" as const, icon: Sun, label: "Light" },
                  { key: "dark" as const, icon: Moon, label: "Dark" },
                ]).map(({ key, icon: I, label }) => (
                  <button
                    key={key}
                    onClick={() => setAppearance(key)}
                    className={`flex-1 py-2 rounded-full text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${
                      appearance === key ? "bg-ink text-white border-ink" : "bg-surface text-ink-2 border-hairline"
                    }`}
                  >
                    <I size={12} /> {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="h-px bg-hairline" />

          {/* Notifications — toggle */}
          <div className="px-4 py-3.5 flex items-center gap-3.5">
            <span className="text-ink-3"><Bell size={18} /></span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">Notifications</div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-11 h-6 rounded-full transition-all duration-200 relative ${
                notifications ? "bg-good" : "bg-ink-5"
              }`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-200 ${
                notifications ? "left-[22px]" : "left-0.5"
              }`} />
            </button>
          </div>
        </div>

        {/* Offline */}
        <div className="flex items-baseline justify-between px-1 pb-2.5 mt-[18px]">
          <h2 className="font-display font-normal text-xl tracking-tight m-0">Offline</h2>
        </div>
        <div className="bg-surface border border-hairline rounded-lg overflow-hidden">
          <div className="px-4 py-3.5 flex items-center gap-3.5">
            <span className="text-ink-3"><Download size={18} /></span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">Trip pack</div>
              <div className="text-[11px] text-ink-3 mt-0.5">14.2 MB · synced just now</div>
            </div>
            <button
              onClick={() => setOfflinePack(!offlinePack)}
              className={`w-11 h-6 rounded-full transition-all duration-200 relative ${
                offlinePack ? "bg-good" : "bg-ink-5"
              }`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-200 ${
                offlinePack ? "left-[22px]" : "left-0.5"
              }`} />
            </button>
          </div>
          <div className="h-px bg-hairline" />
          <div className="px-4 py-3.5 flex items-center gap-3.5">
            <span className="text-ink-3"><Wifi size={18} /></span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">Auto-sync at terminals</div>
            </div>
            <button
              onClick={() => setAutoSync(!autoSync)}
              className={`w-11 h-6 rounded-full transition-all duration-200 relative ${
                autoSync ? "bg-good" : "bg-ink-5"
              }`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-200 ${
                autoSync ? "left-[22px]" : "left-0.5"
              }`} />
            </button>
          </div>
        </div>

        <div className="h-6" />
        <button className="w-full py-3.5 rounded-full text-[15px] font-semibold bg-surface text-ink border border-hairline flex items-center justify-center gap-2 hover:border-ink-5 active:scale-[0.98] transition-all">
          <LogOut size={16} /> Sign out
        </button>
      </div>
    </>
  );
}

function RowItem({ icon, title, sub, right }: {
  icon: React.ReactNode;
  title: string;
  sub?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="px-4 py-3.5 flex items-center gap-3.5">
      <span className="text-ink-3">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium">{title}</div>
        {sub && <div className="text-[11px] text-ink-3 mt-0.5">{sub}</div>}
      </div>
      <div className="text-[13px] text-ink-3">{right || <ChevronRight size={14} />}</div>
    </div>
  );
}

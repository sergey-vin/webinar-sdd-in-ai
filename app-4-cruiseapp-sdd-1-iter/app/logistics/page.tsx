"use client";

import { useState, useEffect } from "react";
import { TerminalInfoCard } from "@/components/logistics/terminal-info";
import { TransportOptions } from "@/components/logistics/transport-options";
import { Navigation, Building2 } from "lucide-react";
import type { TerminalData } from "@/lib/types";
import { useT } from "@/lib/i18n";

type Tab = "to" | "terminal" | "from";

export default function LogisticsPage() {
  const [data, setData] = useState<TerminalData | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("to");
  const t = useT();

  useEffect(() => {
    fetch("/data/terminal.json")
      .then((res) => res.json())
      .then(setData);
  }, []);

  const tabs: { value: Tab; labelKey: string }[] = [
    { value: "to", labelKey: "logistics.toTerminal" },
    { value: "terminal", labelKey: "logistics.terminal" },
    { value: "from", labelKey: "logistics.fromTerminal" },
  ];

  return (
    <div className="px-4 py-6 max-w-lg mx-auto space-y-4">
      <h1 className="font-heading text-2xl font-bold text-navy">{t("logistics.title")}</h1>

      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors duration-200 ${
              activeTab === tab.value
                ? "bg-navy text-white"
                : "bg-white text-navy border border-ocean-dark hover:bg-ocean"
            }`}
          >
            {t(tab.labelKey)}
          </button>
        ))}
      </div>

      {data && (
        <>
          {activeTab === "terminal" && (
            <TerminalInfoCard terminal={data.terminal} />
          )}

          {activeTab === "to" && (
            <div className="space-y-4">
              <div className="bg-ocean rounded-xl p-4 flex items-center gap-3">
                <Navigation className="w-6 h-6 text-gold" />
                <div>
                  <div className="text-sm font-semibold text-navy">
                    {t("logistics.routeTo")}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {data.terminal.name}
                  </div>
                </div>
              </div>
              <TransportOptions
                car={data.transport.car}
                taxi={data.transport.taxi}
                publicTransport={data.transport.publicTransport}
              />
            </div>
          )}

          {activeTab === "from" && (
            <div className="space-y-4">
              <div className="bg-ocean rounded-xl p-4 flex items-center gap-3">
                <Building2 className="w-6 h-6 text-gold" />
                <div>
                  <div className="text-sm font-semibold text-navy">
                    {t("logistics.routeFrom")}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {t("logistics.routeFromDesc")}
                  </div>
                </div>
              </div>
              <TransportOptions
                car={data.transport.car}
                taxi={data.transport.taxi}
                publicTransport={data.transport.publicTransport}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

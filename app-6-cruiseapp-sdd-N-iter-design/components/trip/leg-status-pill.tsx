"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import type { LegStatus } from "@/lib/types";

const statusStyles: Record<LegStatus, string> = {
  scheduled: "bg-surface-sunk text-ink-3",
  check_in_open: "bg-warn/10 text-warn",
  boarding: "bg-accent-soft text-accent",
  in_transit: "bg-brand-soft text-brand",
  arrived: "bg-good/10 text-good",
  cancelled: "bg-bad/10 text-bad",
};

export function LegStatusPill({ status }: { status: LegStatus }) {
  const t = useTranslations("status");

  return (
    <Badge
      data-testid={`status-${status}`}
      className={`text-xs font-medium px-2 py-0.5 rounded-full border-0 ${statusStyles[status]}`}
    >
      {status === "in_transit" && (
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand mr-1 animate-pulse-dot" />
      )}
      {t(status)}
    </Badge>
  );
}

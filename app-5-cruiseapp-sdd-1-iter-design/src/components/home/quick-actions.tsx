import Link from "next/link";
import { QrCode, Map, CalendarDays, Settings } from "lucide-react";

const actions = [
  { href: "#", label: "Boarding", icon: QrCode },
  { href: "/map", label: "Ship map", icon: Map },
  { href: "/schedule", label: "Schedule", icon: CalendarDays },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Link
            key={action.label}
            href={action.href}
            className="flex flex-col items-center gap-1.5 rounded-radius-md border border-hairline bg-surface p-3 text-center transition-colors hover:bg-surface-2"
          >
            <Icon className="h-5 w-5 text-brand" />
            <span className="text-[11px] font-medium text-ink-2">
              {action.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

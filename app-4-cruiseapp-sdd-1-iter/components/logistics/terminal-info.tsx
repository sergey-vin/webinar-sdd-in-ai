"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Phone,
  Clock,
  CheckCircle,
  AlertTriangle,
  Luggage,
} from "lucide-react";
import type { TerminalInfo as TerminalInfoType } from "@/lib/types";
import { useT } from "@/lib/i18n";

interface TerminalInfoProps {
  terminal: TerminalInfoType;
}

export function TerminalInfoCard({ terminal }: TerminalInfoProps) {
  const t = useT();

  return (
    <div className="space-y-4">
      <Card className="shadow-sm">
        <CardContent className="p-4 space-y-3">
          <h2 className="font-heading text-base font-semibold text-navy">
            {terminal.name}
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span>{terminal.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gold shrink-0" />
              <span>{terminal.phone}</span>
            </div>
          </div>

          <div className="bg-ocean rounded-xl p-3 space-y-1.5">
            <div className="flex items-center gap-2 text-xs">
              <Clock className="w-3.5 h-3.5 text-gold" />
              <span className="font-medium text-navy">{t("logistics.schedule")}</span>
            </div>
            <div className="grid grid-cols-2 gap-1 text-xs">
              <span className="text-muted-foreground">{t("logistics.checkIn")}:</span>
              <span className="font-medium">{terminal.checkInStart} — {terminal.checkInEnd}</span>
              <span className="text-muted-foreground">{t("logistics.boarding")}:</span>
              <span className="font-medium">{terminal.boarding}</span>
              <span className="text-muted-foreground">{t("logistics.departure")}:</span>
              <span className="font-medium">{terminal.departure}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="p-4">
          <h3 className="text-sm font-semibold text-navy flex items-center gap-2 mb-3">
            <Luggage className="w-4 h-4 text-gold" />
            {t("logistics.whatToBring")}
          </h3>
          <ul className="space-y-1.5">
            {terminal.whatToBring.map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs">
                <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="p-4">
          <h3 className="text-sm font-semibold text-navy flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-gold" />
            {t("logistics.rules")}
          </h3>
          <ul className="space-y-1.5">
            {terminal.rules.map((rule) => (
              <li key={rule} className="flex items-start gap-2 text-xs">
                <span className="text-gold shrink-0">•</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

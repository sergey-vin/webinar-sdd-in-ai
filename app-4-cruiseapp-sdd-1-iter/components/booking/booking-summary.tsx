"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBookingStore } from "@/lib/stores/booking-store";
import { Send, X, CheckCircle, Minus, Plus } from "lucide-react";
import { useT } from "@/lib/i18n";

export function BookingSummary() {
  const { booking, setGuests, submitBooking, clearBooking } = useBookingStore();
  const t = useT();

  if (!booking) return null;

  if (booking.status === "submitted") {
    return (
      <Card className="shadow-md border-green-200 bg-green-50">
        <CardContent className="p-6 text-center">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-green-800">
            {t("booking.submitted")}
          </h3>
          <p className="text-sm text-green-700 mt-1">
            {t("booking.cabin")} {booking.cabinNumber}, {t("booking.deck").toLowerCase()} {booking.deck}
          </p>
          <p className="text-xs text-green-600 mt-2">
            {t("booking.submittedInfo")}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={clearBooking}
          >
            {t("booking.newBooking")}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md border-gold/30 bg-white sticky bottom-18">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-base font-semibold text-navy">
            {t("booking.yourChoice")}
          </h3>
          <button
            onClick={clearBooking}
            className="text-muted-foreground hover:text-navy transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("booking.cabin")}</span>
            <span className="font-medium">{booking.cabinNumber} ({t(`cabin.${booking.cabinType}`)})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("booking.deck")}</span>
            <span className="font-medium">{booking.deck}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">{t("booking.guests")}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setGuests(Math.max(1, booking.guests - 1))}
                className="w-6 h-6 rounded-full border border-ocean-dark flex items-center justify-center hover:bg-ocean"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="font-medium w-4 text-center">{booking.guests}</span>
              <button
                onClick={() => setGuests(Math.min(4, booking.guests + 1))}
                className="w-6 h-6 rounded-full border border-ocean-dark flex items-center justify-center hover:bg-ocean"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
          <div className="flex justify-between pt-2 border-t border-ocean-dark">
            <span className="font-semibold text-navy">{t("booking.total")}</span>
            <span className="font-bold text-navy text-lg">
              ${booking.price.toLocaleString()}
            </span>
          </div>
        </div>

        <Button
          className="w-full bg-gold hover:bg-gold-light text-navy font-semibold"
          onClick={submitBooking}
        >
          <Send className="w-4 h-4 mr-2" />
          {t("booking.submit")}
        </Button>
      </CardContent>
    </Card>
  );
}

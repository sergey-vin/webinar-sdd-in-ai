"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Ship, ArrowRight, Loader2 } from "lucide-react";

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const supabase = createClient();

  const [bookingRef, setBookingRef] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooking() {
      if (!bookingId) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("bookings")
        .select("booking_reference")
        .eq("id", bookingId)
        .single();

      if (data) {
        setBookingRef(data.booking_reference);
      }
      setLoading(false);
    }

    fetchBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-sky-600" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-20">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center gap-6 py-10 text-center">
          {/* Success animation */}
          <div className="relative">
            <div className="animate-[scale-in_0.5s_ease-out] rounded-full bg-green-100 p-4">
              <CheckCircle className="size-16 text-green-600 animate-[fade-in_0.3s_ease-out_0.3s_both]" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-green-700">
              Booking Confirmed!
            </h1>
            <p className="text-muted-foreground">
              Your cruise has been booked successfully.
            </p>
          </div>

          {bookingRef && (
            <div className="rounded-lg border-2 border-dashed border-sky-200 bg-sky-50 px-6 py-4">
              <p className="text-xs text-muted-foreground mb-1">
                Booking Reference
              </p>
              <p className="text-2xl font-bold font-mono tracking-wider text-sky-700">
                {bookingRef}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Link href="/dashboard" className={buttonVariants({ className: "flex-1" })}>
              <Ship className="size-4 mr-1" />
              My Bookings
            </Link>
            <Link href="/cruises" className={buttonVariants({ variant: "outline", className: "flex-1" })}>
              Browse Cruises
              <ArrowRight className="size-4 ml-1" />
            </Link>
          </div>
        </CardContent>
      </Card>

      <style jsx global>{`
        @keyframes scale-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/utils/price";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Ship,
  Calendar,
  Anchor,
  FileText,
  ArrowRight,
} from "lucide-react";

function statusVariant(status: string) {
  switch (status) {
    case "confirmed":
      return "default" as const;
    case "pending":
      return "secondary" as const;
    case "cancelled":
      return "destructive" as const;
    default:
      return "outline" as const;
  }
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: bookings } = await supabase
    .from("bookings")
    .select(
      "id, booking_reference, status, total_price_cents, passenger_count, booked_at, cruises(name, slug, departure_date, arrival_date, duration_nights, ships(name)), cabin_categories(name)"
    )
    .eq("user_id", user.id)
    .order("booked_at", { ascending: false });

  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center gap-3">
        <Anchor className="size-5 text-sky-600" />
        <h1 className="text-xl sm:text-2xl font-bold">My Bookings</h1>
      </div>

      {!bookings || bookings.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
            <Ship className="size-12 text-muted-foreground/40" />
            <div>
              <p className="text-lg font-medium">No bookings yet</p>
              <p className="text-sm text-muted-foreground">
                Browse our cruises and book your dream vacation.
              </p>
            </div>
            <Link
              href="/cruises"
              className="inline-flex items-center gap-1 text-sm font-medium text-sky-600 hover:underline"
            >
              Browse Cruises <ArrowRight className="size-4" />
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {bookings.map((booking) => {
            const cruise = booking.cruises as unknown as {
              name: string;
              slug: string;
              departure_date: string;
              arrival_date: string;
              duration_nights: number;
              ships: { name: string } | null;
            } | null;
            const cabin = booking.cabin_categories as unknown as {
              name: string;
            } | null;

            const departureDate = cruise?.departure_date
              ? new Date(cruise.departure_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "";
            const arrivalDate = cruise?.arrival_date
              ? new Date(cruise.arrival_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "";

            return (
              <Link
                key={booking.id}
                href={`/dashboard/bookings/${booking.id}`}
                className="group block"
              >
                <Card className="transition-shadow hover:shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base group-hover:text-sky-600 transition-colors">
                        {cruise?.name || "Unknown Cruise"}
                      </CardTitle>
                      <Badge variant={statusVariant(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    {cruise?.ships && (
                      <div className="flex items-center gap-2">
                        <Ship className="size-4 shrink-0" />
                        <span>
                          {(cruise.ships as { name: string }).name}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="size-4 shrink-0" />
                      <span>
                        {departureDate} - {arrivalDate}
                      </span>
                    </div>
                    {cabin && (
                      <div className="flex items-center gap-2">
                        <FileText className="size-4 shrink-0" />
                        <span>{cabin.name}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono">
                        Ref: {booking.booking_reference}
                      </span>
                      <span className="font-semibold text-foreground">
                        {formatPrice(booking.total_price_cents)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

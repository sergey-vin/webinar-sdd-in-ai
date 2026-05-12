import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatPrice, formatPriceDetailed } from "@/lib/utils/price";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Ship,
  Calendar,
  Users,
  MapPin,
  ArrowLeft,
  FileText,
  Anchor,
} from "lucide-react";
import { CancelBookingButton } from "./cancel-button";

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

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: booking, error } = await supabase
    .from("bookings")
    .select(
      "*, cruises(name, slug, departure_port, arrival_port, departure_date, arrival_date, duration_nights, ships(name)), cabin_categories(name, sq_feet, amenities_list), passengers(*)"
    )
    .eq("id", id)
    .single();

  if (error || !booking || booking.user_id !== user.id) {
    redirect("/dashboard");
  }

  const cruise = booking.cruises as unknown as {
    name: string;
    slug: string;
    departure_port: string;
    arrival_port: string;
    departure_date: string;
    arrival_date: string;
    duration_nights: number;
    ships: { name: string } | null;
  } | null;

  const cabin = booking.cabin_categories as unknown as {
    name: string;
    sq_feet: number | null;
    amenities_list: string[] | null;
  } | null;

  const passengers = (booking.passengers || []) as unknown as Array<{
    id: string;
    first_name: string;
    last_name: string;
    date_of_birth: string | null;
    nationality: string | null;
    is_lead_passenger: boolean;
  }>;

  const departureDate = cruise?.departure_date
    ? new Date(cruise.departure_date).toLocaleDateString("en-US", {
        weekday: "short",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";
  const arrivalDate = cruise?.arrival_date
    ? new Date(cruise.arrival_date).toLocaleDateString("en-US", {
        weekday: "short",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const canCancel =
    booking.status === "pending" || booking.status === "confirmed";

  return (
    <div className="py-6 space-y-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back to My Bookings
      </Link>

      {/* Booking Reference Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">Booking Reference</p>
          <p className="text-2xl sm:text-3xl font-bold font-mono tracking-wider">
            {booking.booking_reference}
          </p>
        </div>
        <Badge variant={statusVariant(booking.status)} className="w-fit text-sm px-3 py-1">
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </Badge>
      </div>

      {/* Cruise Info */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Anchor className="size-4 text-sky-600" />
            <CardTitle className="text-base">Cruise Details</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <p className="font-semibold text-base">{cruise?.name}</p>
            {cruise?.ships && (
              <p className="text-muted-foreground flex items-center gap-1 mt-1">
                <Ship className="size-3" />{" "}
                {(cruise.ships as { name: string }).name}
              </p>
            )}
          </div>
          <Separator />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <p className="text-muted-foreground text-xs">Departure</p>
              <p className="font-medium flex items-center gap-1">
                <MapPin className="size-3" /> {cruise?.departure_port}
              </p>
              <p className="text-muted-foreground flex items-center gap-1">
                <Calendar className="size-3" /> {departureDate}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Arrival</p>
              <p className="font-medium flex items-center gap-1">
                <MapPin className="size-3" /> {cruise?.arrival_port}
              </p>
              <p className="text-muted-foreground flex items-center gap-1">
                <Calendar className="size-3" /> {arrivalDate}
              </p>
            </div>
          </div>
          <p className="text-muted-foreground">
            {cruise?.duration_nights} nights
          </p>
        </CardContent>
      </Card>

      {/* Cabin Info */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <FileText className="size-4 text-sky-600" />
            <CardTitle className="text-base">Cabin</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p className="font-semibold">{cabin?.name}</p>
          {cabin?.sq_feet && (
            <p className="text-muted-foreground">{cabin.sq_feet} sq ft</p>
          )}
          {cabin?.amenities_list && cabin.amenities_list.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {cabin.amenities_list.map((a) => (
                <Badge key={a} variant="secondary" className="text-xs">
                  {a}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Passengers */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Users className="size-4 text-sky-600" />
            <CardTitle className="text-base">
              Passengers ({passengers.length})
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {passengers
            .sort((a, b) =>
              a.is_lead_passenger ? -1 : b.is_lead_passenger ? 1 : 0
            )
            .map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between text-sm py-1"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    {p.first_name} {p.last_name}
                  </span>
                  {p.is_lead_passenger && (
                    <Badge variant="secondary" className="text-[10px]">
                      Lead
                    </Badge>
                  )}
                </div>
                <div className="text-muted-foreground text-xs text-right">
                  {p.nationality && <span>{p.nationality}</span>}
                  {p.date_of_birth && (
                    <span className="ml-2">
                      DOB:{" "}
                      {new Date(p.date_of_birth).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  )}
                </div>
              </div>
            ))}
        </CardContent>
      </Card>

      {/* Price Breakdown */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Price Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {booking.passenger_count} passenger
              {booking.passenger_count > 1 ? "s" : ""}
            </span>
            <span className="font-semibold text-base text-sky-700">
              {formatPriceDetailed(booking.total_price_cents)}
            </span>
          </div>
          {booking.special_requests && (
            <>
              <Separator />
              <div>
                <p className="text-xs text-muted-foreground">
                  Special Requests
                </p>
                <p className="text-sm">{booking.special_requests}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      {canCancel && (
        <div className="flex gap-3">
          <CancelBookingButton bookingId={booking.id} />
        </div>
      )}
    </div>
  );
}

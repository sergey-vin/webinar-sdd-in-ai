import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ItineraryTimeline } from "@/components/cruise/itinerary-timeline";
import { PricingTable } from "@/components/cruise/pricing-table";
import { buttonVariants } from "@/components/ui/button";
import {
  Ship,
  MapPin,
  Calendar,
  Clock,
  ArrowLeft,
  Building2,
} from "lucide-react";

export default async function CruiseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  // Fetch cruise with ship, itinerary, and pricing
  const { data: cruise } = await supabase
    .from("cruises")
    .select(
      `
      *,
      ships!inner(id, name, description, max_passengers, year_built, tonnage),
      itinerary_stops(id, day_number, port_name, arrival_time, departure_time, is_sea_day, description),
      cruise_pricing(
        id, price_per_person_cents, taxes_fees_cents,
        cabin_categories!inner(id, name, slug, description, max_occupancy, amenities_list, sq_feet)
      )
    `
    )
    .eq("slug", slug)
    .single();

  if (!cruise) {
    notFound();
  }

  const ship = cruise.ships as unknown as {
    id: string;
    name: string;
    description: string | null;
    max_passengers: number | null;
    year_built: number | null;
    tonnage: number | null;
  };

  const stops = (cruise.itinerary_stops ?? []).sort(
    (a: { day_number: number }, b: { day_number: number }) => a.day_number - b.day_number
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pricing = (cruise.cruise_pricing ?? []).map((p: any) => ({
    id: p.id,
    price_per_person_cents: p.price_per_person_cents,
    taxes_fees_cents: p.taxes_fees_cents,
    cabin_category: p.cabin_categories as unknown as {
      id: string;
      name: string;
      description: string | null;
      max_occupancy: number;
      amenities_list: string[] | null;
      sq_feet: number | null;
    },
  }));

  const departureDate = new Date(cruise.departure_date).toLocaleDateString(
    "en-US",
    { weekday: "long", month: "long", day: "numeric", year: "numeric" }
  );
  const arrivalDate = new Date(cruise.arrival_date).toLocaleDateString(
    "en-US",
    { weekday: "long", month: "long", day: "numeric", year: "numeric" }
  );

  return (
    <div className="py-6">
      {/* Back link */}
      <Link
        href="/cruises"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to cruises
      </Link>

      {/* Hero */}
      <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 px-6 py-10 text-white sm:px-10 sm:py-16">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute right-0 top-0 size-48 rounded-full bg-white blur-3xl" />
        </div>
        <div className="relative">
          <h1 className="text-2xl font-bold sm:text-4xl">{cruise.name}</h1>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-sky-100 sm:text-base">
            <span className="flex items-center gap-1.5">
              <Ship className="size-4" />
              {ship.name}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="size-4" />
              {cruise.departure_port}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" />
              {cruise.duration_nights} nights
            </span>
          </div>
          <div className="mt-3 flex flex-col gap-1 text-sm text-sky-100 sm:flex-row sm:gap-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4" />
              {departureDate}
            </span>
            <span className="hidden sm:inline">to</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4 sm:hidden" />
              {arrivalDate}
            </span>
          </div>
        </div>
      </section>

      {/* Description */}
      {cruise.description && (
        <section className="mt-8">
          <p className="text-muted-foreground">{cruise.description}</p>
        </section>
      )}

      {/* Terminal info */}
      {cruise.departure_terminal_id && (
        <section className="mt-6">
          <Link
            href={`/terminal/${cruise.departure_terminal_id}`}
            className="inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            <Building2 className="size-4 text-sky-600" />
            View departure terminal info
          </Link>
        </section>
      )}

      {/* Itinerary */}
      {stops.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-6 text-xl font-bold">Itinerary</h2>
          <ItineraryTimeline stops={stops} />
        </section>
      )}

      {/* Pricing */}
      <section className="mt-10">
        <h2 className="mb-6 text-xl font-bold">Cabin Options & Pricing</h2>
        <PricingTable pricing={pricing} cruiseSlug={slug} />
      </section>

      {/* Book CTA */}
      <section className="mt-10 rounded-xl bg-gradient-to-r from-sky-50 to-blue-50 p-6 text-center sm:p-10">
        <h2 className="text-xl font-bold sm:text-2xl">
          Ready to set sail?
        </h2>
        <p className="mt-2 text-muted-foreground">
          Book your cabin now and secure the best rate for this cruise.
        </p>
        <Link
          href={`/cruises/${slug}/book`}
          className={buttonVariants({ size: "lg", className: "mt-4 bg-sky-600 hover:bg-sky-700" })}
        >
          Book Now
        </Link>
      </section>
    </div>
  );
}

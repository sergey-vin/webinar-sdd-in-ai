import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { CruiseCard } from "@/components/cruise/cruise-card";
import { buttonVariants } from "@/components/ui/button";
import {
  Ship,
  Music,
  Clock,
  MapPin,
  ArrowRight,
  Anchor,
} from "lucide-react";

const FEATURES = [
  {
    icon: Ship,
    title: "Ship Navigation",
    description:
      "Interactive deck maps to explore every corner of your ship, from pools to restaurants.",
  },
  {
    icon: Music,
    title: "Entertainment",
    description:
      "Browse shows, activities, and events. Never miss a moment of onboard fun.",
  },
  {
    icon: Clock,
    title: "Time Sync",
    description:
      "Automatic timezone updates as you sail. Always know the right ship time.",
  },
  {
    icon: MapPin,
    title: "Terminal Planning",
    description:
      "Parking, directions, and check-in info for every departure terminal.",
  },
];

export default async function HomePage() {
  const supabase = await createClient();

  // Fetch featured cruises with ship names and lowest prices
  const { data: cruises } = await supabase
    .from("cruises")
    .select(
      `
      id, name, slug, departure_port, departure_date, arrival_date,
      duration_nights, image_url, status,
      ships!inner(name),
      cruise_pricing(price_per_person_cents)
    `
    )
    .eq("status", "active")
    .order("departure_date", { ascending: true })
    .limit(6);

  const featuredCruises = (cruises ?? []).map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    departure_port: c.departure_port,
    departure_date: c.departure_date,
    arrival_date: c.arrival_date,
    duration_nights: c.duration_nights,
    image_url: c.image_url,
    ship_name: (c.ships as unknown as { name: string })?.name,
    lowest_price_cents: c.cruise_pricing?.length
      ? Math.min(...c.cruise_pricing.map((p) => p.price_per_person_cents))
      : undefined,
  }));

  return (
    <div className="-mx-4 sm:-mx-0">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-800 px-4 py-16 text-white sm:px-8 sm:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-1/4 top-1/4 size-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 size-48 rounded-full bg-sky-300 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Anchor className="size-8" />
            <span className="text-lg font-medium tracking-wide uppercase">
              CruiseVibe
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Find Your Perfect Cruise
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-sky-100 sm:text-lg">
            Explore the world by sea. Browse destinations, compare prices, and
            book your dream vacation with confidence.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/cruises"
              className={buttonVariants({ size: "lg", className: "w-full bg-white text-sky-700 hover:bg-sky-50 sm:w-auto" })}
            >
              Browse Cruises
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Cruises */}
      {featuredCruises.length > 0 && (
        <section className="px-4 py-12 sm:px-0">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Featured Cruises</h2>
            <Link
              href="/cruises"
              className="text-sm font-medium text-sky-600 hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCruises.map((cruise) => (
              <CruiseCard key={cruise.id} cruise={cruise} />
            ))}
          </div>
        </section>
      )}

      {/* Why CruiseVibe */}
      <section className="px-4 py-12 sm:px-0">
        <h2 className="mb-8 text-center text-2xl font-bold">
          Why CruiseVibe?
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                <feature.icon className="size-6" />
              </div>
              <h3 className="mb-2 font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

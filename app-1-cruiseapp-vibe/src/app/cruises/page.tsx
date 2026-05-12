import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { CruiseList } from "@/components/cruise/cruise-list";
import { CruiseSearchFilters } from "@/components/cruise/cruise-search-filters";
import { Anchor } from "lucide-react";

interface SearchParams {
  port?: string;
  date?: string;
  duration?: string;
}

export default async function CruisesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  let query = supabase
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
    .order("departure_date", { ascending: true });

  if (params.port) {
    query = query.eq("departure_port", params.port);
  }

  if (params.date) {
    query = query.gte("departure_date", params.date);
  }

  if (params.duration) {
    query = query.eq("duration_nights", parseInt(params.duration));
  }

  const { data: cruises } = await query;

  const formattedCruises = (cruises ?? []).map((c) => ({
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
    <div className="py-6">
      <div className="mb-6 flex items-center gap-3">
        <Anchor className="size-6 text-sky-600" />
        <h1 className="text-2xl font-bold">Browse Cruises</h1>
      </div>

      <Suspense fallback={null}>
        <CruiseSearchFilters />
      </Suspense>

      <div className="mt-8">
        <CruiseList cruises={formattedCruises} />
      </div>
    </div>
  );
}

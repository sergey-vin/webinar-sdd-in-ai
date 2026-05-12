import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Calendar, Clock, Ship } from "lucide-react";
import { formatPrice } from "@/lib/utils/price";

interface CruiseCardProps {
  cruise: {
    id: string;
    name: string;
    slug: string;
    departure_port: string;
    departure_date: string;
    arrival_date: string;
    duration_nights: number;
    image_url: string | null;
    ship_name?: string;
    lowest_price_cents?: number;
  };
}

export function CruiseCard({ cruise }: CruiseCardProps) {
  const departureDate = new Date(cruise.departure_date).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric", year: "numeric" }
  );
  const arrivalDate = new Date(cruise.arrival_date).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric", year: "numeric" }
  );

  return (
    <Link href={`/cruises/${cruise.slug}`} className="group block">
      <Card className="h-full transition-shadow hover:shadow-lg">
        {/* Image placeholder with gradient */}
        <div className="relative h-40 w-full overflow-hidden rounded-t-xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600">
          <div className="absolute inset-0 flex items-center justify-center">
            <Ship className="size-12 text-white/30" />
          </div>
          {cruise.lowest_price_cents && (
            <div className="absolute bottom-2 right-2 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-sky-700">
              From {formatPrice(cruise.lowest_price_cents)}
            </div>
          )}
        </div>

        <CardHeader>
          <CardTitle className="line-clamp-2 group-hover:text-sky-600 transition-colors">
            {cruise.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-2 text-sm text-muted-foreground">
          {cruise.ship_name && (
            <div className="flex items-center gap-2">
              <Ship className="size-4 shrink-0" />
              <span>{cruise.ship_name}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0" />
            <span>{cruise.departure_port}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="size-4 shrink-0" />
            <span>
              {departureDate} - {arrivalDate}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-4 shrink-0" />
            <span>{cruise.duration_nights} nights</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

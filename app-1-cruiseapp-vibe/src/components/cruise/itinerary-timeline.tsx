import { Waves, MapPin } from "lucide-react";

interface ItineraryStop {
  id: string;
  day_number: number;
  port_name: string;
  arrival_time: string | null;
  departure_time: string | null;
  is_sea_day: boolean;
  description: string | null;
}

interface ItineraryTimelineProps {
  stops: ItineraryStop[];
}

export function ItineraryTimeline({ stops }: ItineraryTimelineProps) {
  return (
    <div className="space-y-0">
      {stops.map((stop, index) => {
        const isLast = index === stops.length - 1;

        return (
          <div key={stop.id} className="relative flex gap-4">
            {/* Timeline line + dot */}
            <div className="flex flex-col items-center">
              <div
                className={`flex size-8 shrink-0 items-center justify-center rounded-full border-2 ${
                  stop.is_sea_day
                    ? "border-sky-200 bg-sky-50 text-sky-400"
                    : "border-sky-500 bg-sky-500 text-white"
                }`}
              >
                {stop.is_sea_day ? (
                  <Waves className="size-4" />
                ) : (
                  <MapPin className="size-4" />
                )}
              </div>
              {!isLast && (
                <div className="w-0.5 flex-1 bg-sky-200" />
              )}
            </div>

            {/* Content */}
            <div className={`pb-6 ${isLast ? "pb-0" : ""}`}>
              <div className="flex items-baseline gap-2">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Day {stop.day_number}
                </span>
              </div>
              <h4
                className={`mt-0.5 font-medium ${
                  stop.is_sea_day
                    ? "text-muted-foreground italic"
                    : "text-foreground"
                }`}
              >
                {stop.port_name}
              </h4>
              {!stop.is_sea_day && (stop.arrival_time || stop.departure_time) && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {stop.arrival_time && (
                    <span>Arrive: {stop.arrival_time}</span>
                  )}
                  {stop.arrival_time && stop.departure_time && (
                    <span className="mx-2">|</span>
                  )}
                  {stop.departure_time && (
                    <span>Depart: {stop.departure_time}</span>
                  )}
                </p>
              )}
              {stop.description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {stop.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

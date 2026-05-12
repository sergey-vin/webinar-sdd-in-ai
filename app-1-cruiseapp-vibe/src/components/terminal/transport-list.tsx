"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { Car, Smartphone, Bus, Train, ExternalLink, Phone } from "lucide-react";
import type { Database } from "@/lib/supabase/types";

type TransportOption = Database["public"]["Tables"]["transport_options"]["Row"];

interface TransportListProps {
  transportOptions: TransportOption[];
}

const TYPE_CONFIG: Record<string, { label: string; icon: typeof Car }> = {
  parking: { label: "Parking", icon: Car },
  taxi: { label: "Taxi", icon: Car },
  rideshare: { label: "Rideshare", icon: Smartphone },
  shuttle: { label: "Shuttle", icon: Bus },
  public_transit: { label: "Public Transit", icon: Train },
  rental_car: { label: "Rental Car", icon: Car },
};

export function TransportList({ transportOptions }: TransportListProps) {
  // Group by type
  const groups: Record<string, TransportOption[]> = {};
  for (const option of transportOptions) {
    if (!groups[option.type]) groups[option.type] = [];
    groups[option.type].push(option);
  }

  // Sort within groups by sort_order
  for (const key of Object.keys(groups)) {
    groups[key].sort((a, b) => a.sort_order - b.sort_order);
  }

  const typeOrder = ["parking", "taxi", "rideshare", "shuttle", "public_transit", "rental_car"];
  const sortedTypes = Object.keys(groups).sort(
    (a, b) => (typeOrder.indexOf(a) === -1 ? 99 : typeOrder.indexOf(a)) - (typeOrder.indexOf(b) === -1 ? 99 : typeOrder.indexOf(b))
  );

  if (sortedTypes.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No transport options available.</p>
      </div>
    );
  }

  return (
    <Accordion>
      {sortedTypes.map((type) => {
        const config = TYPE_CONFIG[type] || { label: type, icon: Car };
        const Icon = config.icon;
        const options = groups[type];

        return (
          <AccordionItem key={type} value={type}>
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Icon className="size-4 text-muted-foreground" />
                <span>{config.label}</span>
                <span className="text-xs text-muted-foreground">({options.length})</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pl-6">
                {options.map((option) => (
                  <div
                    key={option.id}
                    className="rounded-lg border p-3 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-medium">{option.name}</h4>
                      {option.estimated_cost && (
                        <span className="text-sm font-semibold text-primary whitespace-nowrap">
                          {option.estimated_cost}
                        </span>
                      )}
                    </div>

                    {option.description && (
                      <p className="text-xs text-muted-foreground">
                        {option.description}
                      </p>
                    )}

                    {option.notes && (
                      <p className="text-xs text-muted-foreground italic">
                        {option.notes}
                      </p>
                    )}

                    <div className="flex gap-2 flex-wrap">
                      {option.booking_url && (
                        <a
                          href={option.booking_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={buttonVariants({ variant: "outline", size: "sm" })}
                        >
                          Book
                          <ExternalLink className="size-3 ml-1" />
                        </a>
                      )}
                      {option.phone && (
                        <a
                          href={`tel:${option.phone}`}
                          className={buttonVariants({ variant: "outline", size: "sm" })}
                        >
                          <Phone className="size-3 mr-1" />
                          {option.phone}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

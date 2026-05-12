"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Check } from "lucide-react";
import { formatPrice } from "@/lib/utils/price";

interface PricingItem {
  id: string;
  price_per_person_cents: number;
  taxes_fees_cents: number;
  cabin_category: {
    id: string;
    name: string;
    description: string | null;
    max_occupancy: number;
    amenities_list: string[] | null;
    sq_feet: number | null;
  };
}

interface PricingTableProps {
  pricing: PricingItem[];
  cruiseSlug: string;
}

export function PricingTable({ pricing, cruiseSlug }: PricingTableProps) {
  if (pricing.length === 0) {
    return (
      <p className="text-muted-foreground">
        Pricing information is not available yet.
      </p>
    );
  }

  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <div className="flex gap-4 pb-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pricing.map((item) => {
          const total =
            item.price_per_person_cents + item.taxes_fees_cents;

          return (
            <Card
              key={item.id}
              className="min-w-[260px] shrink-0 sm:min-w-0"
            >
              <CardHeader>
                <CardTitle>{item.cabin_category.name}</CardTitle>
                {item.cabin_category.description && (
                  <p className="text-sm text-muted-foreground">
                    {item.cabin_category.description}
                  </p>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-2xl font-bold text-sky-600">
                    {formatPrice(item.price_per_person_cents)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    per person + {formatPrice(item.taxes_fees_cents)} taxes
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    Total: {formatPrice(total)}/person
                  </p>
                </div>

                {item.cabin_category.sq_feet && (
                  <p className="text-sm text-muted-foreground">
                    {item.cabin_category.sq_feet} sq ft | Up to{" "}
                    {item.cabin_category.max_occupancy} guests
                  </p>
                )}

                {item.cabin_category.amenities_list &&
                  item.cabin_category.amenities_list.length > 0 && (
                    <ul className="space-y-1">
                      {item.cabin_category.amenities_list.map(
                        (amenity, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm"
                          >
                            <Check className="size-3.5 shrink-0 text-green-500" />
                            {amenity}
                          </li>
                        )
                      )}
                    </ul>
                  )}

                <a
                  href={`/cruises/${cruiseSlug}/book?category=${item.cabin_category.id}`}
                  className={buttonVariants({ className: "w-full" })}
                >
                  Select
                </a>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { formatPrice, formatPriceDetailed } from "@/lib/utils/price";
import { BookingStepper } from "@/components/booking/booking-stepper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Ship,
  Users,
  Check,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Anchor,
} from "lucide-react";

const STEPS = ["Cabin", "Passengers", "Review", "Confirm"];

interface CruiseData {
  id: string;
  name: string;
  slug: string;
  departure_port: string;
  arrival_port: string;
  departure_date: string;
  arrival_date: string;
  duration_nights: number;
  ships: { name: string } | null;
}

interface PricingWithCategory {
  id: string;
  price_per_person_cents: number;
  taxes_fees_cents: number;
  cabin_categories: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    max_occupancy: number;
    sq_feet: number | null;
    amenities_list: string[] | null;
    image_url: string | null;
  } | null;
}

interface Passenger {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  nationality: string;
}

export default function BookCruisePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const supabase = createClient();

  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [cruise, setCruise] = useState<CruiseData | null>(null);
  const [pricingOptions, setPricingOptions] = useState<PricingWithCategory[]>(
    []
  );

  // Step 1 state
  const [selectedPricingId, setSelectedPricingId] = useState<string | null>(
    null
  );
  const [passengerCount, setPassengerCount] = useState(2);

  // Step 2 state
  const [passengers, setPassengers] = useState<Passenger[]>([]);

  // Step 3 state
  const [specialRequests, setSpecialRequests] = useState("");

  useEffect(() => {
    async function init() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data: cruiseData, error: cruiseError } = await supabase
        .from("cruises")
        .select("id, name, slug, departure_port, arrival_port, departure_date, arrival_date, duration_nights, ships(name)")
        .eq("slug", slug)
        .single();

      if (cruiseError || !cruiseData) {
        setError("Cruise not found.");
        setLoading(false);
        return;
      }

      setCruise(cruiseData as unknown as CruiseData);

      const { data: pricing } = await supabase
        .from("cruise_pricing")
        .select(
          "id, price_per_person_cents, taxes_fees_cents, cabin_categories(id, name, slug, description, max_occupancy, sq_feet, amenities_list, image_url)"
        )
        .eq("cruise_id", cruiseData.id);

      setPricingOptions((pricing as unknown as PricingWithCategory[]) || []);
      setLoading(false);
    }

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // When passenger count changes, reset/resize passengers array
  useEffect(() => {
    setPassengers((prev) => {
      const arr: Passenger[] = [];
      for (let i = 0; i < passengerCount; i++) {
        arr.push(
          prev[i] || {
            first_name: "",
            last_name: "",
            date_of_birth: "",
            nationality: "",
          }
        );
      }
      return arr;
    });
  }, [passengerCount]);

  const selectedPricing = pricingOptions.find(
    (p) => p.id === selectedPricingId
  );

  const totalPriceCents = selectedPricing
    ? selectedPricing.price_per_person_cents * passengerCount +
      selectedPricing.taxes_fees_cents
    : 0;

  function canGoNext(): boolean {
    if (currentStep === 0) return !!selectedPricingId;
    if (currentStep === 1) {
      return passengers.every((p) => p.first_name.trim() && p.last_name.trim());
    }
    return true;
  }

  function handleNext() {
    if (currentStep < 3) setCurrentStep((s) => s + 1);
  }

  function handleBack() {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  }

  function updatePassenger(index: number, field: keyof Passenger, value: string) {
    setPassengers((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  }

  async function handleSubmit() {
    if (!cruise || !selectedPricing?.cabin_categories) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cruise_id: cruise.id,
          cabin_category_id: selectedPricing.cabin_categories.id,
          passenger_count: passengerCount,
          total_price_cents: totalPriceCents,
          special_requests: specialRequests || null,
          passengers: passengers.map((p, i) => ({
            ...p,
            is_lead_passenger: i === 0,
          })),
        }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Booking failed");
      }

      const { booking } = await res.json();
      router.push(
        `/cruises/${slug}/book/confirmation?bookingId=${booking.id}`
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-sky-600" />
      </div>
    );
  }

  if (error && !cruise) {
    return (
      <div className="py-20 text-center">
        <p className="text-red-600">{error}</p>
        <Button variant="outline" className="mt-4" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center gap-3">
        <Anchor className="size-5 text-sky-600" />
        <h1 className="text-xl sm:text-2xl font-bold">Book: {cruise?.name}</h1>
      </div>

      <BookingStepper currentStep={currentStep} steps={STEPS} />

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Step 0: Cabin Selection */}
      {currentStep === 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Select Your Cabin</h2>
            <div className="flex items-center gap-2">
              <Label htmlFor="passenger-count" className="text-sm whitespace-nowrap">
                Passengers
              </Label>
              <Select
                value={String(passengerCount)}
                onValueChange={(v) => setPassengerCount(Number(v))}
              >
                <SelectTrigger className="w-20" id="passenger-count">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pricingOptions.map((pricing) => {
              const cat = pricing.cabin_categories;
              if (!cat) return null;
              const isSelected = selectedPricingId === pricing.id;

              return (
                <Card
                  key={pricing.id}
                  className={`cursor-pointer transition-all ${
                    isSelected
                      ? "ring-2 ring-sky-600 border-sky-600"
                      : "hover:shadow-md"
                  }`}
                  onClick={() => setSelectedPricingId(pricing.id)}
                >
                  <div className="relative h-28 w-full overflow-hidden rounded-t-xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Ship className="size-10 text-white/30" />
                    </div>
                    {isSelected && (
                      <div className="absolute top-2 right-2 rounded-full bg-sky-600 p-1">
                        <Check className="size-4 text-white" />
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{cat.name}</CardTitle>
                    {cat.description && (
                      <CardDescription className="text-xs line-clamp-2">
                        {cat.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Per person</span>
                      <span className="font-semibold text-sky-700">
                        {formatPrice(pricing.price_per_person_cents)}
                      </span>
                    </div>
                    {cat.sq_feet && (
                      <div className="flex items-center justify-between text-muted-foreground">
                        <span>Size</span>
                        <span>{cat.sq_feet} sq ft</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="size-3" />
                      <span>Up to {cat.max_occupancy} guests</span>
                    </div>
                    {cat.amenities_list && cat.amenities_list.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {cat.amenities_list.slice(0, 4).map((a) => (
                          <Badge key={a} variant="secondary" className="text-[10px]">
                            {a}
                          </Badge>
                        ))}
                        {cat.amenities_list.length > 4 && (
                          <Badge variant="outline" className="text-[10px]">
                            +{cat.amenities_list.length - 4}
                          </Badge>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {pricingOptions.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No cabin categories available for this cruise.
            </p>
          )}
        </div>
      )}

      {/* Step 1: Passengers */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Passenger Details</h2>
          {passengers.map((passenger, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  Passenger {index + 1}
                  {index === 0 && (
                    <Badge variant="secondary" className="ml-2">
                      Lead
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor={`fn-${index}`}>First Name *</Label>
                  <Input
                    id={`fn-${index}`}
                    value={passenger.first_name}
                    onChange={(e) =>
                      updatePassenger(index, "first_name", e.target.value)
                    }
                    placeholder="First name"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`ln-${index}`}>Last Name *</Label>
                  <Input
                    id={`ln-${index}`}
                    value={passenger.last_name}
                    onChange={(e) =>
                      updatePassenger(index, "last_name", e.target.value)
                    }
                    placeholder="Last name"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`dob-${index}`}>Date of Birth</Label>
                  <Input
                    id={`dob-${index}`}
                    type="date"
                    value={passenger.date_of_birth}
                    onChange={(e) =>
                      updatePassenger(index, "date_of_birth", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`nat-${index}`}>Nationality</Label>
                  <Input
                    id={`nat-${index}`}
                    value={passenger.nationality}
                    onChange={(e) =>
                      updatePassenger(index, "nationality", e.target.value)
                    }
                    placeholder="e.g. American"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Step 2: Review */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Review Your Booking</h2>
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div>
                <p className="text-sm text-muted-foreground">Cruise</p>
                <p className="font-semibold">{cruise?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {cruise?.departure_port} &rarr; {cruise?.arrival_port}
                </p>
                <p className="text-sm text-muted-foreground">
                  {cruise?.departure_date &&
                    new Date(cruise.departure_date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                  -{" "}
                  {cruise?.arrival_date &&
                    new Date(cruise.arrival_date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                </p>
                {cruise?.ships && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <Ship className="size-3" /> {(cruise.ships as { name: string }).name}
                  </p>
                )}
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground">Cabin Category</p>
                <p className="font-semibold">
                  {selectedPricing?.cabin_categories?.name}
                </p>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground mb-2">Passengers</p>
                {passengers.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm py-1">
                    <Users className="size-3 text-muted-foreground" />
                    <span>
                      {p.first_name} {p.last_name}
                    </span>
                    {i === 0 && (
                      <Badge variant="secondary" className="text-[10px]">
                        Lead
                      </Badge>
                    )}
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Price Breakdown</p>
                <div className="flex justify-between text-sm">
                  <span>
                    {formatPrice(
                      selectedPricing?.price_per_person_cents || 0
                    )}{" "}
                    x {passengerCount} passenger{passengerCount > 1 ? "s" : ""}
                  </span>
                  <span>
                    {formatPrice(
                      (selectedPricing?.price_per_person_cents || 0) *
                        passengerCount
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Taxes & fees</span>
                  <span>
                    {formatPriceDetailed(selectedPricing?.taxes_fees_cents || 0)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span className="text-sky-700">
                    {formatPriceDetailed(totalPriceCents)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-1.5">
            <Label htmlFor="special-requests">Special Requests (optional)</Label>
            <textarea
              id="special-requests"
              className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="Any dietary requirements, celebrations, accessibility needs..."
            />
          </div>
        </div>
      )}

      {/* Step 3: Confirm */}
      {currentStep === 3 && (
        <div className="space-y-4 text-center py-4">
          <h2 className="text-lg font-semibold">Confirm & Book</h2>
          <p className="text-muted-foreground">
            Please review your details above, then click the button below to
            complete your booking.
          </p>
          <div className="text-2xl font-bold text-sky-700">
            Total: {formatPriceDetailed(totalPriceCents)}
          </div>
          <Button
            size="lg"
            className="w-full sm:w-auto"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader2 className="size-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              "Complete Booking"
            )}
          </Button>
        </div>
      )}

      {/* Navigation buttons */}
      {currentStep < 3 && (
        <div className="flex justify-between pt-2">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="size-4 mr-1" />
            Back
          </Button>
          <Button onClick={handleNext} disabled={!canGoNext()}>
            Next
            <ArrowRight className="size-4 ml-1" />
          </Button>
        </div>
      )}
      {currentStep === 3 && (
        <div className="flex justify-start pt-2">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="size-4 mr-1" />
            Back
          </Button>
        </div>
      )}
    </div>
  );
}

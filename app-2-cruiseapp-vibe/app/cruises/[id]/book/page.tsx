"use client";

import { use, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cruises } from "@/lib/mock-data";

export default function BookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const router = useRouter();
  const cruise = cruises.find((c) => c.id === id);
  const cabinId = searchParams.get("cabin");
  const cabin = cruise?.cabins.find((c) => c.id === cabinId);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState("2");
  const [submitted, setSubmitted] = useState(false);

  if (!cruise || !cabin) {
    return (
      <div className="px-4 py-12 text-center">
        <h1 className="text-xl font-bold mb-2">Invalid booking</h1>
        <Link href="/" className="text-primary underline">
          Back to search
        </Link>
      </div>
    );
  }

  const total = cabin.pricePerNight * cruise.duration * parseInt(guests || "1");

  if (submitted) {
    return (
      <div className="px-4 py-12 max-w-lg mx-auto text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
        <p className="text-muted-foreground mb-6">
          Your {cruise.name} cruise has been booked. A confirmation email has
          been sent to {email}.
        </p>
        <Card>
          <CardContent className="p-4 text-left text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Booking ID</span>
              <span className="font-mono">BK-2026-0715</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ship</span>
              <span>{cruise.shipName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cabin</span>
              <span>{cabin.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Dates</span>
              <span>
                {cruise.departureDate} — {cruise.returnDate}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>€{total.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>
        <Button className="mt-6 w-full" onClick={() => router.push("/my-cruise")}>
          Go to My Cruise
        </Button>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      <Link
        href={`/cruises/${cruise.id}`}
        className="text-sm text-muted-foreground mb-4 inline-block"
      >
        ← Back to cruise details
      </Link>

      <h1 className="text-xl font-bold mb-1">Book Your Cruise</h1>
      <p className="text-sm text-muted-foreground mb-4">
        {cruise.name} · {cabin.name}
      </p>

      {/* Summary */}
      <Card className="mb-6">
        <CardContent className="p-4 text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Ship</span>
            <span>{cruise.shipName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Duration</span>
            <span>{cruise.duration} nights</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Cabin</span>
            <span>{cabin.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Rate</span>
            <span>€{cabin.pricePerNight}/night</span>
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Full Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Alex Johnson"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="alex@example.com"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">
            Number of Guests
          </label>
          <Input
            type="number"
            min={1}
            max={cabin.maxGuests}
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Max {cabin.maxGuests} guests for {cabin.name}
          </p>
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>€{total.toLocaleString()}</span>
        </div>

        <Button
          className="w-full h-12"
          disabled={!name || !email}
          onClick={() => setSubmitted(true)}
        >
          Confirm Booking
        </Button>
      </div>
    </div>
  );
}

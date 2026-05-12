import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  // Check auth
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    cruise_id,
    cabin_category_id,
    passenger_count,
    total_price_cents,
    special_requests,
    passengers,
  } = body;

  // Validate required fields
  if (!cruise_id || !cabin_category_id || !passenger_count || !total_price_cents) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (!passengers || !Array.isArray(passengers) || passengers.length === 0) {
    return NextResponse.json(
      { error: "At least one passenger is required" },
      { status: 400 }
    );
  }

  // Verify cruise exists
  const { data: cruise, error: cruiseError } = await supabase
    .from("cruises")
    .select("id")
    .eq("id", cruise_id)
    .single();

  if (cruiseError || !cruise) {
    return NextResponse.json({ error: "Cruise not found" }, { status: 404 });
  }

  // Verify cabin category exists
  const { data: cabin, error: cabinError } = await supabase
    .from("cabin_categories")
    .select("id")
    .eq("id", cabin_category_id)
    .single();

  if (cabinError || !cabin) {
    return NextResponse.json(
      { error: "Cabin category not found" },
      { status: 404 }
    );
  }

  // Verify pricing exists
  const { data: pricing, error: pricingError } = await supabase
    .from("cruise_pricing")
    .select("id")
    .eq("cruise_id", cruise_id)
    .eq("cabin_category_id", cabin_category_id)
    .single();

  if (pricingError || !pricing) {
    return NextResponse.json(
      { error: "Pricing not found for this cruise and cabin" },
      { status: 404 }
    );
  }

  // Create booking
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: booking, error: bookingError } = await (supabase as any)
    .from("bookings")
    .insert({
      user_id: user.id,
      cruise_id,
      cabin_category_id,
      status: "pending",
      total_price_cents,
      passenger_count,
      special_requests: special_requests || null,
    })
    .select()
    .single();

  if (bookingError || !booking) {
    console.error("Booking insert error:", bookingError);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }

  // Create passenger records
  const passengerInserts = passengers.map(
    (p: {
      first_name: string;
      last_name: string;
      date_of_birth?: string;
      nationality?: string;
      is_lead_passenger?: boolean;
    }) => ({
      booking_id: booking.id,
      first_name: p.first_name,
      last_name: p.last_name,
      date_of_birth: p.date_of_birth || null,
      nationality: p.nationality || null,
      is_lead_passenger: p.is_lead_passenger || false,
      passport_number: null,
      emergency_contact_name: null,
      emergency_contact_phone: null,
    })
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error: passengerError } = await (supabase as any)
    .from("passengers")
    .insert(passengerInserts);

  if (passengerError) {
    console.error("Passenger insert error:", passengerError);
    // Still return booking even if passengers fail - we can handle this
  }

  return NextResponse.json({ booking }, { status: 201 });
}

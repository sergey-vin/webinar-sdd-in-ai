CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  cruise_id UUID NOT NULL REFERENCES cruises(id) ON DELETE RESTRICT,
  cabin_id UUID REFERENCES cabins(id) ON DELETE SET NULL,
  cabin_category_id UUID NOT NULL REFERENCES cabin_categories(id) ON DELETE RESTRICT,
  booking_reference TEXT NOT NULL UNIQUE DEFAULT upper(substr(md5(random()::text), 1, 8)),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
    'pending', 'confirmed', 'paid', 'checked_in', 'cancelled', 'refunded'
  )),
  total_price_cents INT NOT NULL,
  passenger_count INT NOT NULL DEFAULT 1,
  special_requests TEXT,
  booked_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_cruise ON bookings(cruise_id);

CREATE TABLE passengers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE,
  nationality TEXT,
  passport_number TEXT,
  is_lead_passenger BOOLEAN NOT NULL DEFAULT false,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_passengers_booking ON passengers(booking_id);

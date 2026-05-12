CREATE TABLE cruises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ship_id UUID NOT NULL REFERENCES ships(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  departure_port TEXT NOT NULL,
  arrival_port TEXT NOT NULL,
  departure_date DATE NOT NULL,
  arrival_date DATE NOT NULL,
  duration_nights INT NOT NULL,
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'boarding', 'sailing', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_cruises_dates ON cruises(departure_date, arrival_date);
CREATE INDEX idx_cruises_ship ON cruises(ship_id);

CREATE TABLE itinerary_stops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cruise_id UUID NOT NULL REFERENCES cruises(id) ON DELETE CASCADE,
  day_number INT NOT NULL,
  port_name TEXT NOT NULL,
  arrival_time TIME,
  departure_time TIME,
  is_sea_day BOOLEAN NOT NULL DEFAULT false,
  description TEXT,
  latitude FLOAT,
  longitude FLOAT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_itinerary_cruise ON itinerary_stops(cruise_id, day_number);

CREATE TABLE cruise_pricing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cruise_id UUID NOT NULL REFERENCES cruises(id) ON DELETE CASCADE,
  cabin_category_id UUID NOT NULL REFERENCES cabin_categories(id) ON DELETE CASCADE,
  price_per_person_cents INT NOT NULL,
  taxes_fees_cents INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(cruise_id, cabin_category_id)
);

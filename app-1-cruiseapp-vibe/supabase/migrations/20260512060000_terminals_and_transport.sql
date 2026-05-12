CREATE TABLE terminals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT,
  country TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  description TEXT,
  image_url TEXT,
  parking_info TEXT,
  luggage_dropoff_info TEXT,
  check_in_hours TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE transport_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  terminal_id UUID NOT NULL REFERENCES terminals(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('parking', 'taxi', 'rideshare', 'shuttle', 'public_transit', 'rental_car')),
  name TEXT NOT NULL,
  description TEXT,
  estimated_cost TEXT,
  booking_url TEXT,
  phone TEXT,
  notes TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_transport_terminal ON transport_options(terminal_id);

ALTER TABLE cruises ADD COLUMN departure_terminal_id UUID REFERENCES terminals(id);
ALTER TABLE cruises ADD COLUMN arrival_terminal_id UUID REFERENCES terminals(id);

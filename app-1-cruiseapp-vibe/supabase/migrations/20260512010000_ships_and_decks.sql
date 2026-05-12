CREATE TABLE ships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  total_decks INT NOT NULL DEFAULT 0,
  year_built INT,
  tonnage INT,
  max_passengers INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE decks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ship_id UUID NOT NULL REFERENCES ships(id) ON DELETE CASCADE,
  deck_number INT NOT NULL,
  name TEXT NOT NULL,
  svg_map_url TEXT,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(ship_id, deck_number)
);

CREATE TABLE amenities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deck_id UUID NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'restaurant', 'bar', 'pool', 'spa', 'theater', 'gym',
    'casino', 'shop', 'medical', 'kids', 'lounge', 'other'
  )),
  description TEXT,
  svg_element_id TEXT,
  position_x FLOAT,
  position_y FLOAT,
  hours TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE cabin_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ship_id UUID NOT NULL REFERENCES ships(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  max_occupancy INT NOT NULL DEFAULT 2,
  base_price_cents INT NOT NULL,
  image_url TEXT,
  amenities_list TEXT[],
  sq_feet INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(ship_id, slug)
);

CREATE TABLE cabins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deck_id UUID NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
  cabin_category_id UUID NOT NULL REFERENCES cabin_categories(id) ON DELETE CASCADE,
  cabin_number TEXT NOT NULL,
  svg_element_id TEXT,
  position_x FLOAT,
  position_y FLOAT,
  is_accessible BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'booked', 'maintenance')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(deck_id, cabin_number)
);

CREATE INDEX idx_cabins_category ON cabins(cabin_category_id);
CREATE INDEX idx_cabins_deck ON cabins(deck_id);

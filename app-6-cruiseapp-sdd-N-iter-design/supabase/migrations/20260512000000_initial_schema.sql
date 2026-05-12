-- CUThere initial schema
-- All times stored as TIMESTAMPTZ (UTC)

-- ============================================================
-- PROFILES (extends auth.users)
-- ============================================================
CREATE TABLE public.profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name  TEXT NOT NULL,
  email         TEXT NOT NULL,
  avatar_url    TEXT,
  locale        TEXT NOT NULL DEFAULT 'en' CHECK (locale IN ('en', 'ru')),
  home_timezone TEXT NOT NULL DEFAULT 'Europe/Moscow',
  club_tier     TEXT NOT NULL DEFAULT 'blue' CHECK (club_tier IN ('blue', 'silver', 'gold', 'platinum')),
  club_points   INTEGER NOT NULL DEFAULT 0,
  club_card_no  TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- CARRIERS (ferry lines, airlines, transit operators)
-- ============================================================
CREATE TABLE public.carriers (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code      TEXT NOT NULL UNIQUE,
  name_en   TEXT NOT NULL,
  name_ru   TEXT NOT NULL,
  mode      TEXT NOT NULL CHECK (mode IN ('ferry', 'flight', 'bus', 'train', 'metro')),
  logo_url  TEXT,
  color     TEXT
);

-- ============================================================
-- LOCATIONS (ports, airports, stations — unified)
-- ============================================================
CREATE TABLE public.locations (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code      TEXT NOT NULL UNIQUE,
  name_en   TEXT NOT NULL,
  name_ru   TEXT NOT NULL,
  city_en   TEXT NOT NULL,
  city_ru   TEXT NOT NULL,
  country   TEXT NOT NULL,
  lat       DOUBLE PRECISION,
  lng       DOUBLE PRECISION,
  timezone  TEXT NOT NULL,
  loc_type  TEXT NOT NULL CHECK (loc_type IN ('port', 'airport', 'station', 'stop'))
);

-- ============================================================
-- VESSELS (ships/ferries)
-- ============================================================
CREATE TABLE public.vessels (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  carrier_id    UUID NOT NULL REFERENCES public.carriers(id),
  name          TEXT NOT NULL,
  ship_class    TEXT,
  deck_count    INTEGER NOT NULL DEFAULT 1,
  pax_capacity  INTEGER
);

-- ============================================================
-- DECKS
-- ============================================================
CREATE TABLE public.decks (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vessel_id   UUID NOT NULL REFERENCES public.vessels(id) ON DELETE CASCADE,
  deck_number INTEGER NOT NULL,
  name_en     TEXT NOT NULL,
  name_ru     TEXT NOT NULL,
  svg_path    TEXT
);

-- ============================================================
-- VENUES (places on a deck)
-- ============================================================
CREATE TABLE public.venues (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deck_id     UUID NOT NULL REFERENCES public.decks(id) ON DELETE CASCADE,
  name_en     TEXT NOT NULL,
  name_ru     TEXT NOT NULL,
  category    TEXT NOT NULL CHECK (category IN (
    'restaurant', 'bar', 'pool', 'theater', 'spa', 'shop', 'gym', 'lounge', 'cabin_area', 'other'
  )),
  svg_zone_id TEXT,
  x           DOUBLE PRECISION,
  y           DOUBLE PRECISION
);

-- ============================================================
-- ROUTES (scheduled service between two locations)
-- ============================================================
CREATE TABLE public.routes (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  carrier_id      UUID NOT NULL REFERENCES public.carriers(id),
  vessel_id       UUID REFERENCES public.vessels(id),
  origin_id       UUID NOT NULL REFERENCES public.locations(id),
  destination_id  UUID NOT NULL REFERENCES public.locations(id),
  route_code      TEXT NOT NULL,
  mode            TEXT NOT NULL CHECK (mode IN ('ferry', 'flight', 'bus', 'train', 'metro')),
  duration_min    INTEGER NOT NULL,
  base_price_eur  NUMERIC(10,2),
  co2_kg          NUMERIC(6,2),
  frequency       TEXT
);

-- ============================================================
-- TRIPS (a user's multi-leg journey)
-- ============================================================
CREATE TABLE public.trips (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title_en    TEXT NOT NULL,
  title_ru    TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'active', 'completed')),
  start_date  DATE NOT NULL,
  end_date    DATE NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- TRIP LEGS (individual segments)
-- ============================================================
CREATE TABLE public.trip_legs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id         UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  route_id        UUID NOT NULL REFERENCES public.routes(id),
  leg_order       INTEGER NOT NULL,
  departure_time  TIMESTAMPTZ NOT NULL,
  arrival_time    TIMESTAMPTZ NOT NULL,
  status          TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN (
    'scheduled', 'check_in_open', 'boarding', 'in_transit', 'arrived', 'cancelled'
  )),
  seat_info       TEXT,
  booking_ref     TEXT,
  qr_data         TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- EVENTS (on-board or at-destination activities)
-- ============================================================
CREATE TABLE public.events (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vessel_id       UUID REFERENCES public.vessels(id),
  location_id     UUID REFERENCES public.locations(id),
  venue_id        UUID REFERENCES public.venues(id),
  title_en        TEXT NOT NULL,
  title_ru        TEXT NOT NULL,
  description_en  TEXT,
  description_ru  TEXT,
  category        TEXT NOT NULL CHECK (category IN (
    'show', 'dining', 'excursion', 'sport', 'wellness', 'kids', 'music', 'other'
  )),
  start_time      TIMESTAMPTZ NOT NULL,
  end_time        TIMESTAMPTZ NOT NULL,
  image_url       TEXT
);

-- ============================================================
-- USER EVENTS (saved to personal schedule)
-- ============================================================
CREATE TABLE public.user_events (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id   UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  event_id  UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  notify    BOOLEAN NOT NULL DEFAULT true,
  UNIQUE(user_id, event_id)
);

-- ============================================================
-- CLUB PERKS
-- ============================================================
CREATE TABLE public.club_perks (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tier      TEXT NOT NULL CHECK (tier IN ('blue', 'silver', 'gold', 'platinum')),
  perk_en   TEXT NOT NULL,
  perk_ru   TEXT NOT NULL,
  icon      TEXT
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX idx_trip_legs_trip ON public.trip_legs(trip_id, leg_order);
CREATE INDEX idx_trips_user ON public.trips(user_id, status);
CREATE INDEX idx_events_vessel ON public.events(vessel_id, start_time);
CREATE INDEX idx_events_location ON public.events(location_id, start_time);
CREATE INDEX idx_user_events_user ON public.user_events(user_id);
CREATE INDEX idx_routes_origin_dest ON public.routes(origin_id, destination_id, mode);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Profiles: anyone can read (demo app), only own profile can update
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_read" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Trips: user sees own trips
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
CREATE POLICY "trips_select_own" ON public.trips FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "trips_insert_own" ON public.trips FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "trips_update_own" ON public.trips FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "trips_delete_own" ON public.trips FOR DELETE USING (auth.uid() = user_id);

-- Trip legs: via trip ownership
ALTER TABLE public.trip_legs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "trip_legs_select" ON public.trip_legs FOR SELECT
  USING (trip_id IN (SELECT id FROM public.trips WHERE user_id = auth.uid()));

-- User events: own only
ALTER TABLE public.user_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user_events_select" ON public.user_events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "user_events_insert" ON public.user_events FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "user_events_delete" ON public.user_events FOR DELETE USING (auth.uid() = user_id);

-- Public reference tables (read-only for everyone)
ALTER TABLE public.carriers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "carriers_read" ON public.carriers FOR SELECT USING (true);

ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "locations_read" ON public.locations FOR SELECT USING (true);

ALTER TABLE public.vessels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "vessels_read" ON public.vessels FOR SELECT USING (true);

ALTER TABLE public.decks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "decks_read" ON public.decks FOR SELECT USING (true);

ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;
CREATE POLICY "venues_read" ON public.venues FOR SELECT USING (true);

ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "routes_read" ON public.routes FOR SELECT USING (true);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "events_read" ON public.events FOR SELECT USING (true);

ALTER TABLE public.club_perks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "club_perks_read" ON public.club_perks FOR SELECT USING (true);

-- ============================================================
-- TRIGGER: auto-create profile on auth.users insert
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)), NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

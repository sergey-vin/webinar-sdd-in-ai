CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cruise_id UUID NOT NULL REFERENCES cruises(id) ON DELETE CASCADE,
  deck_id UUID REFERENCES decks(id) ON DELETE SET NULL,
  amenity_id UUID REFERENCES amenities(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN (
    'show', 'music', 'dining', 'activity', 'fitness',
    'kids', 'enrichment', 'party', 'sports', 'other'
  )),
  day_number INT NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  location_name TEXT,
  image_url TEXT,
  is_free BOOLEAN NOT NULL DEFAULT true,
  capacity INT,
  requires_reservation BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_events_cruise_day ON events(cruise_id, day_number);
CREATE INDEX idx_events_category ON events(category);

CREATE TABLE user_event_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  remind_before_minutes INT DEFAULT 15,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, event_id)
);

CREATE TABLE timezone_schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cruise_id UUID NOT NULL REFERENCES cruises(id) ON DELETE CASCADE,
  effective_from_day INT NOT NULL,
  effective_time TIME NOT NULL DEFAULT '02:00',
  timezone_offset TEXT NOT NULL,
  timezone_name TEXT NOT NULL,
  iana_timezone TEXT NOT NULL,
  direction TEXT CHECK (direction IN ('forward', 'backward')),
  minutes_change INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(cruise_id, effective_from_day)
);

CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  home_timezone TEXT NOT NULL DEFAULT 'America/New_York',
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

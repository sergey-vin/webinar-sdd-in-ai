-- CUThere seed data
-- 2 demo users, carriers, locations, vessels, routes, trips, events, perks

-- ============================================================
-- 1. Create auth users via admin API
-- ============================================================
-- Elena Volkova (experienced traveler, Gold tier)
INSERT INTO auth.users (
  id, instance_id, aud, role, email,
  encrypted_password, email_confirmed_at,
  raw_user_meta_data, created_at, updated_at,
  confirmation_token, recovery_token, email_change_token_new, email_change
) VALUES (
  '11111111-1111-1111-1111-111111111111',
  '00000000-0000-0000-0000-000000000000',
  'authenticated', 'authenticated', 'elena@cuthere.demo',
  crypt('demo123456', gen_salt('bf')),
  now(),
  '{"display_name": "Elena Volkova"}'::jsonb,
  now(), now(), '', '', '', ''
);

INSERT INTO auth.identities (
  id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at
) VALUES (
  '11111111-1111-1111-1111-111111111111',
  '11111111-1111-1111-1111-111111111111',
  '{"sub": "11111111-1111-1111-1111-111111111111", "email": "elena@cuthere.demo"}'::jsonb,
  'email', '11111111-1111-1111-1111-111111111111',
  now(), now(), now()
);

-- James Chen (new traveler, Blue tier)
INSERT INTO auth.users (
  id, instance_id, aud, role, email,
  encrypted_password, email_confirmed_at,
  raw_user_meta_data, created_at, updated_at,
  confirmation_token, recovery_token, email_change_token_new, email_change
) VALUES (
  '22222222-2222-2222-2222-222222222222',
  '00000000-0000-0000-0000-000000000000',
  'authenticated', 'authenticated', 'james@cuthere.demo',
  crypt('demo123456', gen_salt('bf')),
  now(),
  '{"display_name": "James Chen"}'::jsonb,
  now(), now(), '', '', '', ''
);

INSERT INTO auth.identities (
  id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at
) VALUES (
  '22222222-2222-2222-2222-222222222222',
  '22222222-2222-2222-2222-222222222222',
  '{"sub": "22222222-2222-2222-2222-222222222222", "email": "james@cuthere.demo"}'::jsonb,
  'email', '22222222-2222-2222-2222-222222222222',
  now(), now(), now()
);

-- ============================================================
-- 2. Update profiles (created by trigger, now enrich)
-- ============================================================
UPDATE public.profiles SET
  display_name = 'Elena Volkova',
  avatar_url = NULL,
  locale = 'en',
  home_timezone = 'Europe/Berlin',
  club_tier = 'gold',
  club_points = 4250,
  club_card_no = 'CUT-GOLD-001847'
WHERE id = '11111111-1111-1111-1111-111111111111';

UPDATE public.profiles SET
  display_name = 'James Chen',
  avatar_url = NULL,
  locale = 'en',
  home_timezone = 'Europe/Helsinki',
  club_tier = 'blue',
  club_points = 320,
  club_card_no = 'CUT-BLUE-009215'
WHERE id = '22222222-2222-2222-2222-222222222222';

-- ============================================================
-- 3. Carriers
-- ============================================================
INSERT INTO public.carriers (id, code, name_en, name_ru, mode, logo_url, color) VALUES
  ('cc000000-0001-0000-0000-000000000000', 'VKL', 'Viking Line', 'Викинг Лайн', 'ferry', NULL, '#CC0000'),
  ('cc000000-0002-0000-0000-000000000000', 'TLK', 'Tallink Silja', 'Таллинк Силья', 'ferry', NULL, '#003399'),
  ('cc000000-0003-0000-0000-000000000000', 'ECK', 'Eckerö Line', 'Экерё Лайн', 'ferry', NULL, '#0066CC'),
  ('cc000000-0004-0000-0000-000000000000', 'AY',  'Finnair', 'Финнэйр', 'flight', NULL, '#0B1560'),
  ('cc000000-0005-0000-0000-000000000000', 'HSL', 'HSL Helsinki', 'HSL Хельсинки', 'metro', NULL, '#007AC9');

-- ============================================================
-- 4. Locations
-- ============================================================
INSERT INTO public.locations (id, code, name_en, name_ru, city_en, city_ru, country, lat, lng, timezone, loc_type) VALUES
  ('aa000000-0001-0000-0000-000000000000', 'HEL-WTP', 'West Terminal', 'Западный терминал', 'Helsinki', 'Хельсинки', 'FI', 60.1536, 24.9126, 'Europe/Helsinki', 'port'),
  ('aa000000-0002-0000-0000-000000000000', 'HEL-OLP', 'Olympia Terminal', 'Терминал Олимпия', 'Helsinki', 'Хельсинки', 'FI', 60.1620, 24.9570, 'Europe/Helsinki', 'port'),
  ('aa000000-0003-0000-0000-000000000000', 'TLL-DT',  'D-Terminal', 'Терминал D', 'Tallinn', 'Таллин', 'EE', 59.4480, 24.7650, 'Europe/Tallinn', 'port'),
  ('aa000000-0004-0000-0000-000000000000', 'TLL-AT',  'A-Terminal', 'Терминал А', 'Tallinn', 'Таллин', 'EE', 59.4510, 24.7630, 'Europe/Tallinn', 'port'),
  ('aa000000-0005-0000-0000-000000000000', 'STO-VRT', 'Värtahamnen', 'Вертахамнен', 'Stockholm', 'Стокгольм', 'SE', 59.3530, 18.1040, 'Europe/Stockholm', 'port'),
  ('aa000000-0006-0000-0000-000000000000', 'HEL-VNT', 'Helsinki-Vantaa', 'Хельсинки-Вантаа', 'Helsinki', 'Хельсинки', 'FI', 60.3172, 24.9633, 'Europe/Helsinki', 'airport'),
  ('aa000000-0007-0000-0000-000000000000', 'BER-BER', 'Berlin Brandenburg', 'Берлин Бранденбург', 'Berlin', 'Берлин', 'DE', 52.3667, 13.5033, 'Europe/Berlin', 'airport'),
  ('aa000000-0008-0000-0000-000000000000', 'HEL-RLW', 'Helsinki Central', 'Хельсинки Центральный', 'Helsinki', 'Хельсинки', 'FI', 60.1718, 24.9414, 'Europe/Helsinki', 'station');

-- ============================================================
-- 5. Vessels
-- ============================================================
INSERT INTO public.vessels (id, carrier_id, name, ship_class, deck_count, pax_capacity) VALUES
  ('bb000000-0001-0000-0000-000000000000', 'cc000000-0001-0000-0000-000000000000', 'MS Viking Grace', 'Viking Grace class', 11, 2800),
  ('bb000000-0002-0000-0000-000000000000', 'cc000000-0002-0000-0000-000000000000', 'MS Megastar', 'MyStar class', 9, 2800);

-- ============================================================
-- 6. Decks (Viking Grace: decks 4-10)
-- ============================================================
INSERT INTO public.decks (id, vessel_id, deck_number, name_en, name_ru, svg_path) VALUES
  ('dd000000-0001-0000-0000-000000000000', 'bb000000-0001-0000-0000-000000000000', 4,  'Deck 4 — Car Deck',     'Палуба 4 — Автопалуба',   NULL),
  ('dd000000-0002-0000-0000-000000000000', 'bb000000-0001-0000-0000-000000000000', 5,  'Deck 5 — Reception',    'Палуба 5 — Ресепшн',      NULL),
  ('dd000000-0003-0000-0000-000000000000', 'bb000000-0001-0000-0000-000000000000', 6,  'Deck 6 — Promenade',    'Палуба 6 — Променад',     NULL),
  ('dd000000-0004-0000-0000-000000000000', 'bb000000-0001-0000-0000-000000000000', 7,  'Deck 7 — Entertainment','Палуба 7 — Развлечения',  NULL),
  ('dd000000-0005-0000-0000-000000000000', 'bb000000-0001-0000-0000-000000000000', 8,  'Deck 8 — Spa & Pool',   'Палуба 8 — Спа и Бассейн',NULL),
  ('dd000000-0006-0000-0000-000000000000', 'bb000000-0001-0000-0000-000000000000', 9,  'Deck 9 — Sky Bar',      'Палуба 9 — Скай Бар',     NULL),
  ('dd000000-0007-0000-0000-000000000000', 'bb000000-0001-0000-0000-000000000000', 10, 'Deck 10 — Sun Deck',    'Палуба 10 — Солнечная',   NULL);

-- ============================================================
-- 7. Venues (sample for decks 5-8)
-- ============================================================
INSERT INTO public.venues (id, deck_id, name_en, name_ru, category, svg_zone_id, x, y) VALUES
  -- Deck 5
  ('ee000000-0001-0000-0000-000000000000', 'dd000000-0002-0000-0000-000000000000', 'Reception', 'Ресепшн', 'other', 'zone-reception', 200, 100),
  ('ee000000-0002-0000-0000-000000000000', 'dd000000-0002-0000-0000-000000000000', 'Tax Free Shop', 'Магазин Tax Free', 'shop', 'zone-taxfree', 300, 150),
  ('ee000000-0003-0000-0000-000000000000', 'dd000000-0002-0000-0000-000000000000', 'Café Amadeus', 'Кафе Амадеус', 'restaurant', 'zone-amadeus', 150, 200),
  -- Deck 6
  ('ee000000-0004-0000-0000-000000000000', 'dd000000-0003-0000-0000-000000000000', 'Oscar''s Restaurant', 'Ресторан Оскар', 'restaurant', 'zone-oscars', 180, 120),
  ('ee000000-0005-0000-0000-000000000000', 'dd000000-0003-0000-0000-000000000000', 'Sunset Bar', 'Бар Закат', 'bar', 'zone-sunset', 350, 100),
  ('ee000000-0006-0000-0000-000000000000', 'dd000000-0003-0000-0000-000000000000', 'Viking Lounge', 'Лаундж Викинг', 'lounge', 'zone-lounge', 250, 180),
  -- Deck 7
  ('ee000000-0007-0000-0000-000000000000', 'dd000000-0004-0000-0000-000000000000', 'Theater Viking', 'Театр Викинг', 'theater', 'zone-theater', 200, 140),
  ('ee000000-0008-0000-0000-000000000000', 'dd000000-0004-0000-0000-000000000000', 'Casino', 'Казино', 'other', 'zone-casino', 300, 160),
  ('ee000000-0009-0000-0000-000000000000', 'dd000000-0004-0000-0000-000000000000', 'Kids Play Area', 'Детская площадка', 'other', 'zone-kids', 100, 200),
  -- Deck 8
  ('ee000000-000a-0000-0000-000000000000', 'dd000000-0005-0000-0000-000000000000', 'Day Spa', 'Дневной Спа', 'spa', 'zone-spa', 200, 100),
  ('ee000000-000b-0000-0000-000000000000', 'dd000000-0005-0000-0000-000000000000', 'Pool Area', 'Зона Бассейна', 'pool', 'zone-pool', 300, 130),
  ('ee000000-000c-0000-0000-000000000000', 'dd000000-0005-0000-0000-000000000000', 'Fitness Center', 'Фитнес-центр', 'gym', 'zone-gym', 150, 180);

-- ============================================================
-- 8. Routes
-- ============================================================
INSERT INTO public.routes (id, carrier_id, vessel_id, origin_id, destination_id, route_code, mode, duration_min, base_price_eur, co2_kg, frequency) VALUES
  -- Viking Line: Helsinki West -> Stockholm
  ('ff000000-0001-0000-0000-000000000000', 'cc000000-0001-0000-0000-000000000000', 'bb000000-0001-0000-0000-000000000000',
   'aa000000-0001-0000-0000-000000000000', 'aa000000-0005-0000-0000-000000000000', 'VKL-HEL-STO', 'ferry', 660, 89.00, 42.50, 'daily'),
  -- Tallink: Helsinki Olympia -> Tallinn D-Terminal
  ('ff000000-0002-0000-0000-000000000000', 'cc000000-0002-0000-0000-000000000000', 'bb000000-0002-0000-0000-000000000000',
   'aa000000-0002-0000-0000-000000000000', 'aa000000-0003-0000-0000-000000000000', 'TLK-HEL-TLL', 'ferry', 120, 29.00, 18.30, 'daily'),
  -- Eckero: Helsinki West -> Tallinn A-Terminal
  ('ff000000-0003-0000-0000-000000000000', 'cc000000-0003-0000-0000-000000000000', NULL,
   'aa000000-0001-0000-0000-000000000000', 'aa000000-0004-0000-0000-000000000000', 'ECK-HEL-TLL', 'ferry', 150, 22.00, 15.20, 'daily'),
  -- Finnair: Berlin -> Helsinki
  ('ff000000-0004-0000-0000-000000000000', 'cc000000-0004-0000-0000-000000000000', NULL,
   'aa000000-0007-0000-0000-000000000000', 'aa000000-0006-0000-0000-000000000000', 'AY-BER-HEL', 'flight', 145, 149.00, 122.00, 'daily'),
  -- Finnair: Helsinki -> Berlin
  ('ff000000-0005-0000-0000-000000000000', 'cc000000-0004-0000-0000-000000000000', NULL,
   'aa000000-0006-0000-0000-000000000000', 'aa000000-0007-0000-0000-000000000000', 'AY-HEL-BER', 'flight', 150, 139.00, 122.00, 'daily'),
  -- HSL: Helsinki Central -> West Terminal (metro/tram)
  ('ff000000-0006-0000-0000-000000000000', 'cc000000-0005-0000-0000-000000000000', NULL,
   'aa000000-0008-0000-0000-000000000000', 'aa000000-0001-0000-0000-000000000000', 'HSL-CTR-WTP', 'metro', 15, 3.10, 0.80, 'every 10min');

-- ============================================================
-- 9. Trips
-- ============================================================
-- Elena: Berlin -> Helsinki (flight) -> Tallinn (ferry) -> Helsinki (ferry) -> Stockholm (ferry) — ACTIVE
INSERT INTO public.trips (id, user_id, title_en, title_ru, status, start_date, end_date) VALUES
  ('ab000000-0001-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111',
   'Berlin → Helsinki → Tallinn → Stockholm', 'Берлин → Хельсинки → Таллин → Стокгольм',
   'active', '2026-05-10', '2026-05-15');

-- James: Helsinki -> Tallinn (ferry, round trip) — UPCOMING
INSERT INTO public.trips (id, user_id, title_en, title_ru, status, start_date, end_date) VALUES
  ('ab000000-0002-0000-0000-000000000000', '22222222-2222-2222-2222-222222222222',
   'Helsinki → Tallinn Round Trip', 'Хельсинки → Таллин (туда и обратно)',
   'upcoming', '2026-05-20', '2026-05-22');

-- ============================================================
-- 10. Trip Legs
-- ============================================================
-- Elena's legs (4 legs)
INSERT INTO public.trip_legs (id, trip_id, route_id, leg_order, departure_time, arrival_time, status, seat_info, booking_ref, qr_data) VALUES
  -- Leg 1: Berlin -> Helsinki (flight) — completed
  ('ac000000-0001-0000-0000-000000000000', 'ab000000-0001-0000-0000-000000000000',
   'ff000000-0004-0000-0000-000000000000', 1,
   '2026-05-10T08:30:00Z', '2026-05-10T12:55:00Z',
   'arrived', 'Seat 14A', 'CUT-AY1047', 'CUTHERE:AY1047:VOLKOVA:14A'),
  -- Leg 2: Helsinki -> Tallinn (Tallink ferry) — in transit NOW
  ('ac000000-0002-0000-0000-000000000000', 'ab000000-0001-0000-0000-000000000000',
   'ff000000-0002-0000-0000-000000000000', 2,
   '2026-05-12T10:30:00Z', '2026-05-12T12:30:00Z',
   'in_transit', 'Cabin 6021', 'CUT-TLK8842', 'CUTHERE:TLK8842:VOLKOVA:6021'),
  -- Leg 3: Tallinn -> Helsinki (Eckero ferry) — scheduled
  ('ac000000-0003-0000-0000-000000000000', 'ab000000-0001-0000-0000-000000000000',
   'ff000000-0003-0000-0000-000000000000', 3,
   '2026-05-13T18:00:00Z', '2026-05-13T20:30:00Z',
   'scheduled', 'Seat B12', 'CUT-ECK3351', 'CUTHERE:ECK3351:VOLKOVA:B12'),
  -- Leg 4: Helsinki -> Stockholm (Viking Grace overnight) — scheduled
  ('ac000000-0004-0000-0000-000000000000', 'ab000000-0001-0000-0000-000000000000',
   'ff000000-0001-0000-0000-000000000000', 4,
   '2026-05-14T17:00:00Z', '2026-05-15T04:00:00Z',
   'scheduled', 'Cabin 8042', 'CUT-VKL5590', 'CUTHERE:VKL5590:VOLKOVA:8042');

-- James's legs (2 legs)
INSERT INTO public.trip_legs (id, trip_id, route_id, leg_order, departure_time, arrival_time, status, seat_info, booking_ref, qr_data) VALUES
  -- Leg 1: Helsinki -> Tallinn
  ('ac000000-0005-0000-0000-000000000000', 'ab000000-0002-0000-0000-000000000000',
   'ff000000-0002-0000-0000-000000000000', 1,
   '2026-05-20T09:00:00Z', '2026-05-20T11:00:00Z',
   'scheduled', 'Seat A04', 'CUT-TLK9901', 'CUTHERE:TLK9901:CHEN:A04'),
  -- Leg 2: Tallinn -> Helsinki (return)
  ('ac000000-0006-0000-0000-000000000000', 'ab000000-0002-0000-0000-000000000000',
   'ff000000-0003-0000-0000-000000000000', 2,
   '2026-05-22T16:00:00Z', '2026-05-22T18:30:00Z',
   'scheduled', 'Seat C08', 'CUT-ECK7720', 'CUTHERE:ECK7720:CHEN:C08');

-- ============================================================
-- 11. Events (on-board MS Megastar, the ferry Elena is currently on)
-- ============================================================
INSERT INTO public.events (id, vessel_id, venue_id, title_en, title_ru, description_en, description_ru, category, start_time, end_time) VALUES
  ('ae000000-0001-0000-0000-000000000000', 'bb000000-0002-0000-0000-000000000000', 'ee000000-0007-0000-0000-000000000000',
   'Live Jazz: Baltic Quartet', 'Живой джаз: Балтийский Квартет',
   'Enjoy live jazz music in the main theater', 'Живая джазовая музыка в главном театре',
   'music', '2026-05-12T11:00:00Z', '2026-05-12T12:00:00Z'),
  ('ae000000-0002-0000-0000-000000000000', 'bb000000-0002-0000-0000-000000000000', 'ee000000-0004-0000-0000-000000000000',
   'Lunch Buffet', 'Шведский стол (обед)',
   'All-you-can-eat Scandinavian buffet', 'Скандинавский шведский стол без ограничений',
   'dining', '2026-05-12T11:30:00Z', '2026-05-12T13:00:00Z'),
  ('ae000000-0003-0000-0000-000000000000', 'bb000000-0002-0000-0000-000000000000', 'ee000000-0009-0000-0000-000000000000',
   'Kids Treasure Hunt', 'Детский Поиск Сокровищ',
   'Fun treasure hunt for children ages 4-12', 'Весёлый поиск сокровищ для детей 4-12 лет',
   'kids', '2026-05-12T10:00:00Z', '2026-05-12T11:30:00Z'),
  ('ae000000-0004-0000-0000-000000000000', 'bb000000-0002-0000-0000-000000000000', 'ee000000-000a-0000-0000-000000000000',
   'Morning Yoga', 'Утренняя Йога',
   'Start your day with a relaxing yoga session', 'Начните день с расслабляющей йоги',
   'wellness', '2026-05-12T08:00:00Z', '2026-05-12T09:00:00Z'),
  ('ae000000-0005-0000-0000-000000000000', 'bb000000-0002-0000-0000-000000000000', 'ee000000-0005-0000-0000-000000000000',
   'Happy Hour at Sunset Bar', 'Счастливый час в баре Закат',
   'Half-price cocktails and sea views', 'Коктейли за полцены и виды на море',
   'dining', '2026-05-12T16:00:00Z', '2026-05-12T18:00:00Z'),
  ('ae000000-0006-0000-0000-000000000000', 'bb000000-0002-0000-0000-000000000000', 'ee000000-0007-0000-0000-000000000000',
   'Evening Show: Northern Lights', 'Вечернее шоу: Северное Сияние',
   'Spectacular light and dance performance', 'Зрелищное световое и танцевальное шоу',
   'show', '2026-05-12T20:00:00Z', '2026-05-12T21:30:00Z'),
  ('ae000000-0007-0000-0000-000000000000', 'bb000000-0002-0000-0000-000000000000', NULL,
   'Arrival at Tallinn', 'Прибытие в Таллин',
   'Ship arrives at D-Terminal, Tallinn', 'Корабль прибывает в Терминал D, Таллин',
   'other', '2026-05-12T12:30:00Z', '2026-05-12T12:30:00Z'),
  ('ae000000-0008-0000-0000-000000000000', 'bb000000-0002-0000-0000-000000000000', 'ee000000-0002-0000-0000-000000000000',
   'Tax Free Shopping', 'Покупки Tax Free',
   'Last chance to shop before arrival', 'Последний шанс сделать покупки до прибытия',
   'other', '2026-05-12T11:00:00Z', '2026-05-12T12:15:00Z');

-- Elena saved some events
INSERT INTO public.user_events (user_id, event_id, notify) VALUES
  ('11111111-1111-1111-1111-111111111111', 'ae000000-0001-0000-0000-000000000000', true),
  ('11111111-1111-1111-1111-111111111111', 'ae000000-0002-0000-0000-000000000000', true),
  ('11111111-1111-1111-1111-111111111111', 'ae000000-0006-0000-0000-000000000000', true);

-- ============================================================
-- 12. Club Perks
-- ============================================================
INSERT INTO public.club_perks (tier, perk_en, perk_ru, icon) VALUES
  ('blue',     'Priority boarding',         'Приоритетная посадка',          'log-in'),
  ('blue',     '5% off onboard shopping',   'Скидка 5% в магазинах на борту','percent'),
  ('silver',   'Priority boarding',         'Приоритетная посадка',          'log-in'),
  ('silver',   '10% off onboard shopping',  'Скидка 10% в магазинах',        'percent'),
  ('silver',   'Free Wi-Fi (1hr)',          'Бесплатный Wi-Fi (1 час)',      'wifi'),
  ('gold',     'Priority boarding',         'Приоритетная посадка',          'log-in'),
  ('gold',     '15% off onboard shopping',  'Скидка 15% в магазинах',        'percent'),
  ('gold',     'Free Wi-Fi (unlimited)',    'Бесплатный Wi-Fi (безлимит)',   'wifi'),
  ('gold',     'Lounge access',            'Доступ в лаундж',              'armchair'),
  ('platinum', 'Priority boarding',         'Приоритетная посадка',          'log-in'),
  ('platinum', '20% off onboard shopping',  'Скидка 20% в магазинах',        'percent'),
  ('platinum', 'Free Wi-Fi (unlimited)',    'Бесплатный Wi-Fi (безлимит)',   'wifi'),
  ('platinum', 'Lounge access',            'Доступ в лаундж',              'armchair'),
  ('platinum', 'Cabin upgrade',            'Повышение каюты',              'arrow-up-circle'),
  ('platinum', 'Free minibar',             'Бесплатный минибар',           'wine');

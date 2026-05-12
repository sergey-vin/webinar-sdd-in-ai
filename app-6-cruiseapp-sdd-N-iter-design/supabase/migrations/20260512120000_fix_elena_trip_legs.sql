-- Fix Elena's trip legs to be realistic:
-- 1. Add airport bus transfer (Helsinki-Vantaa → West Terminal)
-- 2. Remove duplicate HEL→TLL ferry, replace with TLL→STO

-- Add bus carrier for Finnair City Bus (airport shuttle)
INSERT INTO public.carriers (id, code, name_en, name_ru, mode, logo_url, color) VALUES
  ('cc000000-0006-0000-0000-000000000000', 'FCB', 'Finnair City Bus', 'Финнэйр Сити Бас', 'bus', NULL, '#0B1560');

-- Add route: Helsinki-Vantaa Airport → West Terminal (bus, ~40 min)
INSERT INTO public.routes (id, carrier_id, vessel_id, origin_id, destination_id, route_code, mode, duration_min, base_price_eur, co2_kg, frequency) VALUES
  ('ff000000-0007-0000-0000-000000000000', 'cc000000-0006-0000-0000-000000000000', NULL,
   'aa000000-0006-0000-0000-000000000000', 'aa000000-0001-0000-0000-000000000000', 'FCB-VNT-WTP', 'bus', 40, 6.90, 2.10, 'every 20min');

-- Add Tallink route: Tallinn D-Terminal → Stockholm Värtahamnen (overnight ferry via Viking Grace)
-- In reality Tallink runs TLL→STO via MS Baltic Queen / MS Victoria I
-- Let's add a separate vessel for this
INSERT INTO public.vessels (id, carrier_id, name, ship_class, deck_count, pax_capacity) VALUES
  ('bb000000-0003-0000-0000-000000000000', 'cc000000-0002-0000-0000-000000000000', 'MS Baltic Queen', 'Baltic Queen class', 12, 2500);

INSERT INTO public.routes (id, carrier_id, vessel_id, origin_id, destination_id, route_code, mode, duration_min, base_price_eur, co2_kg, frequency) VALUES
  ('ff000000-0008-0000-0000-000000000000', 'cc000000-0002-0000-0000-000000000000', 'bb000000-0003-0000-0000-000000000000',
   'aa000000-0003-0000-0000-000000000000', 'aa000000-0005-0000-0000-000000000000', 'TLK-TLL-STO', 'ferry', 1080, 69.00, 55.00, 'daily');

-- Update Elena's trip title
UPDATE public.trips SET
  title_en = 'Berlin → Helsinki → Tallinn → Stockholm',
  title_ru = 'Берлин → Хельсинки → Таллин → Стокгольм'
WHERE id = 'ab000000-0001-0000-0000-000000000000';

-- Delete existing legs 2,3,4 for Elena and re-insert correct ones
DELETE FROM public.trip_legs WHERE id IN (
  'ac000000-0002-0000-0000-000000000000',
  'ac000000-0003-0000-0000-000000000000',
  'ac000000-0004-0000-0000-000000000000'
);

-- Re-insert legs 2-5 (now 5 legs total):
-- Leg 1: Berlin→Helsinki (flight) — already correct, arrived
-- Leg 2: Airport → West Terminal (bus) — arrived
-- Leg 3: Helsinki → Tallinn (Tallink ferry, in_transit)
-- Leg 4: Tallinn → Stockholm (Tallink overnight ferry, scheduled)
INSERT INTO public.trip_legs (id, trip_id, route_id, leg_order, departure_time, arrival_time, status, seat_info, booking_ref, qr_data) VALUES
  -- Leg 2: Helsinki-Vantaa → West Terminal (bus, 40 min)
  ('ac000000-0002-0000-0000-000000000000', 'ab000000-0001-0000-0000-000000000000',
   'ff000000-0007-0000-0000-000000000000', 2,
   '2026-05-10T13:30:00Z', '2026-05-10T14:10:00Z',
   'arrived', NULL, NULL, NULL),
  -- Leg 3: Helsinki West Terminal → Tallinn D-Terminal (Tallink Megastar, 2h)
  ('ac000000-0003-0000-0000-000000000000', 'ab000000-0001-0000-0000-000000000000',
   'ff000000-0002-0000-0000-000000000000', 3,
   '2026-05-12T10:30:00Z', '2026-05-12T12:30:00Z',
   'in_transit', 'Cabin 6021', 'CUT-TLK8842', 'CUTHERE:TLK8842:VOLKOVA:6021'),
  -- Leg 4: Tallinn D-Terminal → Stockholm (Tallink Baltic Queen, overnight 18h)
  ('ac000000-0004-0000-0000-000000000000', 'ab000000-0001-0000-0000-000000000000',
   'ff000000-0008-0000-0000-000000000000', 4,
   '2026-05-13T17:00:00Z', '2026-05-14T11:00:00Z',
   'scheduled', 'Cabin 4102', 'CUT-TLK6617', 'CUTHERE:TLK6617:VOLKOVA:4102');

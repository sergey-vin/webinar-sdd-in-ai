-- Add reverse Eckerö route for Tallinn→Helsinki (James uses it for return leg)
INSERT INTO public.routes (id, carrier_id, vessel_id, origin_id, destination_id, route_code, mode, duration_min, base_price_eur, co2_kg, frequency) VALUES
  ('ff000000-0009-0000-0000-000000000000', 'cc000000-0003-0000-0000-000000000000', NULL,
   'aa000000-0004-0000-0000-000000000000', 'aa000000-0001-0000-0000-000000000000', 'ECK-TLL-HEL', 'ferry', 150, 22.00, 15.20, 'daily');

-- Update James's leg 2 to use the correct reverse route
UPDATE public.trip_legs SET route_id = 'ff000000-0009-0000-0000-000000000000'
WHERE id = 'ac000000-0006-0000-0000-000000000000';

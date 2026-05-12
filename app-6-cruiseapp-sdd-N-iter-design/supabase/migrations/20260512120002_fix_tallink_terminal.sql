-- Tallink Megastar actually departs from West Terminal (T2), not Olympia
-- Update the route origin to match the bus destination
UPDATE public.routes SET origin_id = 'aa000000-0001-0000-0000-000000000000'
WHERE id = 'ff000000-0002-0000-0000-000000000000';

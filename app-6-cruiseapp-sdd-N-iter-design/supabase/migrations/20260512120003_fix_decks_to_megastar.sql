-- Decks and venues were assigned to Viking Grace but events reference them
-- via Megastar. Elena is on Megastar. Move decks to Megastar vessel.
UPDATE public.decks SET vessel_id = 'bb000000-0002-0000-0000-000000000000'
WHERE vessel_id = 'bb000000-0001-0000-0000-000000000000';

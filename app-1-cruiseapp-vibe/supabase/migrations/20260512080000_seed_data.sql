-- =============================================
-- SEED DATA for CruiseVibe MVP
-- =============================================

-- TERMINALS
INSERT INTO terminals (id, name, city, state, country, address, latitude, longitude, description, parking_info, luggage_dropoff_info, check_in_hours) VALUES
('a0000000-0000-0000-0000-000000000001', 'PortMiami Terminal D', 'Miami', 'FL', 'USA', '1015 N America Way, Miami, FL 33132', 25.7743, -80.1703, 'One of the busiest cruise ports in the world, located on Dodge Island in Biscayne Bay.', 'On-site parking available at $22/day. Covered garage near Terminal D. Pre-book at portmiami.biz for guaranteed spot. Overflow parking available at offsite lots with shuttle service ($15/day).', 'Luggage drop-off is available curbside at Terminal D. Porters will tag and transport your bags to the ship. Tip $2-3 per bag. Bags are delivered to your cabin.', '10:00 AM - 3:00 PM on embarkation day'),
('a0000000-0000-0000-0000-000000000002', 'Port Everglades Terminal 25', 'Fort Lauderdale', 'FL', 'USA', '1850 Eller Dr, Fort Lauderdale, FL 33316', 26.0934, -80.1167, 'Major cruise port in Fort Lauderdale, convenient to Fort Lauderdale-Hollywood International Airport.', 'Parking at $20/day in covered garages. Northport Parking Garage is closest to Terminal 25. Can be pre-booked online. Offsite parking with shuttle from $12/day.', 'Curbside luggage drop-off available. Porters assist with tagging. Allow extra time during peak hours. Bags delivered to cabin by sailing time.', '11:00 AM - 3:30 PM on embarkation day');

-- TRANSPORT OPTIONS
INSERT INTO transport_options (terminal_id, type, name, description, estimated_cost, booking_url, notes, sort_order) VALUES
('a0000000-0000-0000-0000-000000000001', 'parking', 'PortMiami Parking Garage', 'Covered multi-level garage steps from Terminal D', '$22/day', NULL, 'Arrive early for best spots. Credit cards accepted.', 1),
('a0000000-0000-0000-0000-000000000001', 'parking', 'Park N Fly Miami', 'Offsite covered parking with free shuttle to port', '$15/day', NULL, 'Shuttle runs every 15 minutes. 10 minute ride to terminal.', 2),
('a0000000-0000-0000-0000-000000000001', 'rideshare', 'Uber / Lyft', 'Rideshare drop-off at Terminal D entrance', '$15-30 from Miami Beach', NULL, 'Use the designated rideshare pickup/dropoff zone. Allow extra time during peak embarkation.', 3),
('a0000000-0000-0000-0000-000000000001', 'taxi', 'Miami Taxi', 'Metered taxi service available throughout Miami', '$25-40 from Miami Beach', NULL, 'Flat rate from MIA airport: $27. Metered from other locations.', 4),
('a0000000-0000-0000-0000-000000000001', 'public_transit', 'Miami Metromover + Trolley', 'Free Metromover to PortMiami station, then shuttle', '$0 (free)', NULL, 'Take Metromover to PortMiami station. Free shuttle connects to terminals. Allow 45+ minutes.', 5),
('a0000000-0000-0000-0000-000000000002', 'parking', 'Northport Parking Garage', 'Covered garage closest to Terminal 25', '$20/day', NULL, 'Pre-booking recommended during holiday season.', 1),
('a0000000-0000-0000-0000-000000000002', 'rideshare', 'Uber / Lyft', 'Rideshare to Terminal 25', '$10-20 from FLL airport', NULL, 'Port Everglades is only 3 miles from FLL airport.', 2),
('a0000000-0000-0000-0000-000000000002', 'shuttle', 'Go Port Shuttle', 'Shared shuttle from FLL airport to port', '$8/person', NULL, 'Runs hourly from airport. Book in advance for guaranteed seat.', 3);

-- SHIPS
INSERT INTO ships (id, name, slug, description, total_decks, year_built, tonnage, max_passengers) VALUES
('b0000000-0000-0000-0000-000000000001', 'Ocean Majesty', 'ocean-majesty', 'A magnificent vessel featuring 14 decks of world-class amenities, from tranquil spa retreats to exhilarating water slides. The Ocean Majesty offers an unparalleled cruise experience with award-winning dining, Broadway-caliber entertainment, and spacious staterooms.', 14, 2022, 168000, 3000),
('b0000000-0000-0000-0000-000000000002', 'Caribbean Star', 'caribbean-star', 'An intimate yet feature-rich ship perfect for Caribbean getaways. With 10 beautifully designed decks, the Caribbean Star delivers a boutique cruise experience with exceptional service, gourmet cuisine, and stunning ocean views from nearly every cabin.', 10, 2019, 92000, 2000);

-- DECKS for Ocean Majesty
INSERT INTO decks (id, ship_id, deck_number, name, description) VALUES
('c0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 3, 'Atlantic Deck', 'Passenger cabins - Interior and Ocean View staterooms'),
('c0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001', 7, 'Promenade Deck', 'Main dining, theater, lobby, and shops'),
('c0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000001', 9, 'Lido Deck', 'Pool, buffet restaurant, and bars'),
('c0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000001', 11, 'Spa Deck', 'Spa, fitness center, and adults-only retreat'),
('c0000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000001', 14, 'Sky Deck', 'Observation lounge, sports court, and sky bar');

-- DECKS for Caribbean Star
INSERT INTO decks (id, ship_id, deck_number, name, description) VALUES
('c0000000-0000-0000-0000-000000000006', 'b0000000-0000-0000-0000-000000000002', 2, 'Coral Deck', 'Interior and Ocean View cabins'),
('c0000000-0000-0000-0000-000000000007', 'b0000000-0000-0000-0000-000000000002', 5, 'Plaza Deck', 'Main dining room, theater, and reception'),
('c0000000-0000-0000-0000-000000000008', 'b0000000-0000-0000-0000-000000000002', 7, 'Sun Deck', 'Pool area, casual dining, and bars'),
('c0000000-0000-0000-0000-000000000009', 'b0000000-0000-0000-0000-000000000002', 10, 'Vista Deck', 'Observation lounge and specialty restaurant');

-- AMENITIES for Ocean Majesty
INSERT INTO amenities (deck_id, name, category, description, position_x, position_y, hours) VALUES
('c0000000-0000-0000-0000-000000000002', 'The Grand Restaurant', 'restaurant', 'Elegant main dining room serving multi-course dinners with ocean views. Smart casual dress code.', 30, 50, '6:00 PM - 9:30 PM'),
('c0000000-0000-0000-0000-000000000002', 'Starlight Theater', 'theater', 'State-of-the-art 800-seat theater featuring Broadway-style shows, comedy acts, and live music.', 70, 50, '7:30 PM & 9:30 PM shows'),
('c0000000-0000-0000-0000-000000000002', 'Boutique Row', 'shop', 'Duty-free shopping featuring designer brands, jewelry, and cruise souvenirs.', 50, 20, '9:00 AM - 11:00 PM (at sea)'),
('c0000000-0000-0000-0000-000000000003', 'Oasis Pool', 'pool', 'Main pool with retractable roof, surrounded by loungers and a poolside bar.', 40, 50, '7:00 AM - 10:00 PM'),
('c0000000-0000-0000-0000-000000000003', 'Horizon Buffet', 'restaurant', 'All-day buffet with international cuisine stations, made-to-order omelets, and fresh sushi bar.', 60, 30, '6:30 AM - 9:30 PM'),
('c0000000-0000-0000-0000-000000000003', 'Tiki Bar', 'bar', 'Tropical poolside bar serving frozen cocktails, craft beers, and refreshments.', 40, 80, '10:00 AM - midnight'),
('c0000000-0000-0000-0000-000000000004', 'Serenity Spa', 'spa', 'Full-service spa offering massages, facials, sauna, steam room, and hydrotherapy pool.', 30, 50, '8:00 AM - 8:00 PM'),
('c0000000-0000-0000-0000-000000000004', 'FitZone Gym', 'gym', 'Modern fitness center with ocean-view treadmills, free weights, yoga studio, and group classes.', 60, 50, '6:00 AM - 10:00 PM'),
('c0000000-0000-0000-0000-000000000005', 'Sky Lounge', 'lounge', 'Panoramic observation lounge with craft cocktails and live jazz music in the evenings.', 50, 50, '4:00 PM - 1:00 AM'),
('c0000000-0000-0000-0000-000000000005', 'Sports Court', 'other', 'Multi-use sports court for basketball, volleyball, and pickleball.', 70, 70, '7:00 AM - 9:00 PM');

-- AMENITIES for Caribbean Star
INSERT INTO amenities (deck_id, name, category, description, position_x, position_y, hours) VALUES
('c0000000-0000-0000-0000-000000000007', 'Coral Dining Room', 'restaurant', 'Intimate main dining room with Caribbean-inspired cuisine and nightly specials.', 30, 50, '6:30 PM - 9:00 PM'),
('c0000000-0000-0000-0000-000000000007', 'Moonlight Theater', 'theater', 'Cozy 400-seat theater with live entertainment and movie screenings.', 70, 50, '8:00 PM show nightly'),
('c0000000-0000-0000-0000-000000000008', 'Breeze Pool', 'pool', 'Open-air pool with whirlpools and a swim-up bar.', 40, 50, '7:00 AM - 9:00 PM'),
('c0000000-0000-0000-0000-000000000008', 'Island Grill', 'restaurant', 'Casual buffet and grill with Caribbean flavors and ocean-side seating.', 60, 30, '7:00 AM - 9:00 PM'),
('c0000000-0000-0000-0000-000000000009', 'Sunset Lounge', 'lounge', 'Top-deck lounge with 360-degree views, perfect for sunset watching.', 50, 50, '5:00 PM - midnight');

-- CABIN CATEGORIES for Ocean Majesty
INSERT INTO cabin_categories (id, ship_id, name, slug, description, max_occupancy, base_price_cents, amenities_list, sq_feet) VALUES
('d0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'Interior', 'interior', 'Comfortable interior stateroom, perfect for budget-conscious travelers. Features two twin beds convertible to king, private bathroom, TV, and mini-fridge.', 2, 59900, ARRAY['TV', 'Mini-fridge', 'Safe', 'Hair dryer'], 160),
('d0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001', 'Ocean View', 'ocean-view', 'Stateroom with a picture window offering stunning ocean views. Includes sitting area, two twin beds convertible to king, and enhanced amenities.', 2, 79900, ARRAY['Ocean view window', 'TV', 'Mini-fridge', 'Safe', 'Sitting area'], 190),
('d0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000001', 'Balcony', 'balcony', 'Spacious stateroom with private balcony for enjoying ocean breezes and sunrise views. Features king bed, sofa, and premium bath amenities.', 3, 109900, ARRAY['Private balcony', 'TV', 'Mini-bar', 'Safe', 'Sofa', 'Premium toiletries', 'Bathrobe'], 230),
('d0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000001', 'Suite', 'suite', 'Luxurious suite with separate living area, walk-in closet, jacuzzi tub, and priority boarding. Includes butler service and specialty dining package.', 4, 249900, ARRAY['Large balcony', 'Jacuzzi tub', 'Walk-in closet', 'Butler service', 'Priority boarding', 'Specialty dining included', 'Premium mini-bar', 'Pillow menu'], 450);

-- CABIN CATEGORIES for Caribbean Star
INSERT INTO cabin_categories (id, ship_id, name, slug, description, max_occupancy, base_price_cents, amenities_list, sq_feet) VALUES
('d0000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000002', 'Interior', 'interior', 'Cozy interior cabin with all essentials for a great Caribbean getaway.', 2, 49900, ARRAY['TV', 'Mini-fridge', 'Safe'], 145),
('d0000000-0000-0000-0000-000000000006', 'b0000000-0000-0000-0000-000000000002', 'Ocean View', 'ocean-view', 'Bright cabin with porthole window and Caribbean-inspired decor.', 2, 69900, ARRAY['Porthole window', 'TV', 'Mini-fridge', 'Safe'], 170),
('d0000000-0000-0000-0000-000000000007', 'b0000000-0000-0000-0000-000000000002', 'Balcony', 'balcony', 'Enjoy private balcony views of turquoise Caribbean waters.', 3, 99900, ARRAY['Private balcony', 'TV', 'Mini-bar', 'Safe', 'Bathrobe'], 210),
('d0000000-0000-0000-0000-000000000008', 'b0000000-0000-0000-0000-000000000002', 'Suite', 'suite', 'Premium suite with expansive balcony and VIP perks.', 4, 199900, ARRAY['Large balcony', 'Jacuzzi tub', 'Butler service', 'Priority boarding', 'Mini-bar'], 380);

-- CRUISES
INSERT INTO cruises (id, ship_id, name, slug, description, departure_port, arrival_port, departure_date, arrival_date, duration_nights, status, departure_terminal_id, arrival_terminal_id) VALUES
('e0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', '7-Night Western Caribbean', 'western-caribbean-7', 'Explore the stunning Western Caribbean with stops in Cozumel, Grand Cayman, and Jamaica. Enjoy crystal-clear waters, ancient ruins, and vibrant island culture.', 'Miami, FL', 'Miami, FL', '2026-07-12', '2026-07-19', 7, 'upcoming', 'a0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001'),
('e0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000002', '5-Night Bahamas Escape', 'bahamas-5', 'A quick tropical getaway to the beautiful Bahamas. Visit Nassau, enjoy pristine beaches at CocoCay, and soak up the sun on perfect Caribbean shores.', 'Fort Lauderdale, FL', 'Fort Lauderdale, FL', '2026-08-02', '2026-08-07', 5, 'upcoming', 'a0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000002'),
('e0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000001', '10-Night Mediterranean Voyage', 'mediterranean-10', 'Discover the magic of the Mediterranean with visits to Barcelona, Marseille, Rome, Naples, Dubrovnik, and Venice. A journey through centuries of art, history, and cuisine.', 'Barcelona, Spain', 'Venice, Italy', '2026-09-15', '2026-09-25', 10, 'upcoming', NULL, NULL);

-- ITINERARY STOPS
-- Western Caribbean 7-night
INSERT INTO itinerary_stops (cruise_id, day_number, port_name, arrival_time, departure_time, is_sea_day, description, latitude, longitude) VALUES
('e0000000-0000-0000-0000-000000000001', 1, 'Miami, FL', NULL, '16:00', false, 'Embarkation day. Board the Ocean Majesty and set sail!', 25.7743, -80.1703),
('e0000000-0000-0000-0000-000000000001', 2, 'At Sea', NULL, NULL, true, 'A full day at sea to enjoy all the ship has to offer.', NULL, NULL),
('e0000000-0000-0000-0000-000000000001', 3, 'Cozumel, Mexico', '08:00', '17:00', false, 'Explore Mayan ruins at Tulum, snorkel in crystal-clear cenotes, or shop in town.', 20.4318, -86.9203),
('e0000000-0000-0000-0000-000000000001', 4, 'Grand Cayman', '07:00', '16:00', false, 'Visit Seven Mile Beach, swim with stingrays, or explore Georgetown.', 19.3133, -81.2546),
('e0000000-0000-0000-0000-000000000001', 5, 'Montego Bay, Jamaica', '09:00', '18:00', false, 'Experience Jamaica''s vibrant culture, visit Dunn''s River Falls, or relax on Doctor''s Cave Beach.', 18.4762, -77.8939),
('e0000000-0000-0000-0000-000000000001', 6, 'At Sea', NULL, NULL, true, 'Another relaxing day at sea. Perfect for spa treatments and poolside lounging.', NULL, NULL),
('e0000000-0000-0000-0000-000000000001', 7, 'At Sea', NULL, NULL, true, 'Last day at sea. Enjoy farewell dinner and pack for disembarkation.', NULL, NULL),
('e0000000-0000-0000-0000-000000000001', 8, 'Miami, FL', '07:00', NULL, false, 'Disembarkation. Welcome home!', 25.7743, -80.1703);

-- Bahamas 5-night
INSERT INTO itinerary_stops (cruise_id, day_number, port_name, arrival_time, departure_time, is_sea_day, description, latitude, longitude) VALUES
('e0000000-0000-0000-0000-000000000002', 1, 'Fort Lauderdale, FL', NULL, '17:00', false, 'Board the Caribbean Star and begin your Bahamas adventure!', 26.0934, -80.1167),
('e0000000-0000-0000-0000-000000000002', 2, 'At Sea', NULL, NULL, true, 'Enjoy the ship amenities as we sail to the Bahamas.', NULL, NULL),
('e0000000-0000-0000-0000-000000000002', 3, 'Nassau, Bahamas', '08:00', '18:00', false, 'Explore the colorful capital of the Bahamas. Visit the Atlantis resort, straw market, and Queen''s Staircase.', 25.0343, -77.3963),
('e0000000-0000-0000-0000-000000000002', 4, 'CocoCay, Bahamas', '07:00', '17:00', false, 'Enjoy a private island paradise with pristine beaches, water slides, and snorkeling.', 25.7617, -77.9250),
('e0000000-0000-0000-0000-000000000002', 5, 'At Sea', NULL, NULL, true, 'Final sea day. Don''t miss the farewell pool party!', NULL, NULL),
('e0000000-0000-0000-0000-000000000002', 6, 'Fort Lauderdale, FL', '07:00', NULL, false, 'Disembarkation. See you next time!', 26.0934, -80.1167);

-- Mediterranean 10-night
INSERT INTO itinerary_stops (cruise_id, day_number, port_name, arrival_time, departure_time, is_sea_day, description, latitude, longitude) VALUES
('e0000000-0000-0000-0000-000000000003', 1, 'Barcelona, Spain', NULL, '18:00', false, 'Embark in beautiful Barcelona. Explore La Rambla and Sagrada Familia before boarding.', 41.3784, 2.1925),
('e0000000-0000-0000-0000-000000000003', 2, 'At Sea', NULL, NULL, true, 'Cruising the Mediterranean. Enjoy the ship.', NULL, NULL),
('e0000000-0000-0000-0000-000000000003', 3, 'Marseille, France', '07:00', '18:00', false, 'Visit the Old Port, try bouillabaisse, or take a day trip to Provence.', 43.2965, 5.3698),
('e0000000-0000-0000-0000-000000000003', 4, 'At Sea', NULL, NULL, true, 'Sea day in the Mediterranean.', NULL, NULL),
('e0000000-0000-0000-0000-000000000003', 5, 'Rome (Civitavecchia), Italy', '07:00', '19:00', false, 'Visit the Eternal City: Colosseum, Vatican, Trevi Fountain. Full day ashore recommended.', 42.0930, 11.7972),
('e0000000-0000-0000-0000-000000000003', 6, 'Naples, Italy', '08:00', '18:00', false, 'Visit Pompeii, try authentic Neapolitan pizza, or take a day trip to the Amalfi Coast.', 40.8518, 14.2681),
('e0000000-0000-0000-0000-000000000003', 7, 'At Sea', NULL, NULL, true, 'Crossing the Adriatic Sea.', NULL, NULL),
('e0000000-0000-0000-0000-000000000003', 8, 'At Sea', NULL, NULL, true, 'Another sea day. Join the Mediterranean cooking class!', NULL, NULL),
('e0000000-0000-0000-0000-000000000003', 9, 'Dubrovnik, Croatia', '08:00', '17:00', false, 'Walk the ancient city walls, explore Old Town, and take the cable car for panoramic views.', 42.6507, 18.0944),
('e0000000-0000-0000-0000-000000000003', 10, 'At Sea', NULL, NULL, true, 'Final sea day before Venice.', NULL, NULL),
('e0000000-0000-0000-0000-000000000003', 11, 'Venice, Italy', '07:00', NULL, false, 'Arrive in magical Venice. Disembark and explore St. Mark''s Square and the Grand Canal.', 45.4408, 12.3155);

-- CRUISE PRICING
INSERT INTO cruise_pricing (cruise_id, cabin_category_id, price_per_person_cents, taxes_fees_cents) VALUES
-- Western Caribbean (Ocean Majesty)
('e0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 69900, 12500),
('e0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000002', 89900, 12500),
('e0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000003', 119900, 12500),
('e0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000004', 279900, 12500),
-- Bahamas (Caribbean Star)
('e0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000005', 39900, 8900),
('e0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000006', 54900, 8900),
('e0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000007', 74900, 8900),
('e0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000008', 149900, 8900),
-- Mediterranean (Ocean Majesty)
('e0000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000001', 99900, 18500),
('e0000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000002', 129900, 18500),
('e0000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000003', 179900, 18500),
('e0000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000004', 399900, 18500);

-- TIMEZONE SCHEDULE for Western Caribbean
INSERT INTO timezone_schedule (cruise_id, effective_from_day, effective_time, timezone_offset, timezone_name, iana_timezone, direction, minutes_change) VALUES
('e0000000-0000-0000-0000-000000000001', 1, '16:00', '-04:00', 'Eastern Daylight Time', 'America/New_York', NULL, NULL),
('e0000000-0000-0000-0000-000000000001', 3, '02:00', '-05:00', 'Central Daylight Time', 'America/Chicago', 'backward', -60),
('e0000000-0000-0000-0000-000000000001', 6, '02:00', '-04:00', 'Eastern Daylight Time', 'America/New_York', 'forward', 60);

-- TIMEZONE SCHEDULE for Bahamas
INSERT INTO timezone_schedule (cruise_id, effective_from_day, effective_time, timezone_offset, timezone_name, iana_timezone, direction, minutes_change) VALUES
('e0000000-0000-0000-0000-000000000002', 1, '17:00', '-04:00', 'Eastern Daylight Time', 'America/New_York', NULL, NULL);

-- TIMEZONE SCHEDULE for Mediterranean
INSERT INTO timezone_schedule (cruise_id, effective_from_day, effective_time, timezone_offset, timezone_name, iana_timezone, direction, minutes_change) VALUES
('e0000000-0000-0000-0000-000000000003', 1, '18:00', '+02:00', 'Central European Summer Time', 'Europe/Madrid', NULL, NULL),
('e0000000-0000-0000-0000-000000000003', 9, '02:00', '+02:00', 'Eastern European Summer Time', 'Europe/Athens', 'forward', 60);

-- EVENTS for Western Caribbean (Day 1-3 sample)
INSERT INTO events (cruise_id, day_number, title, description, category, start_time, end_time, location_name, is_free, requires_reservation) VALUES
-- Day 1
('e0000000-0000-0000-0000-000000000001', 1, 'Welcome Aboard Sail-Away Party', 'Join us on the Lido Deck for live music, dancing, and complimentary cocktails as we set sail!', 'party', '16:30', '18:00', 'Lido Deck - Pool Area', true, false),
('e0000000-0000-0000-0000-000000000001', 1, 'Safety Drill (Muster)', 'Mandatory safety drill for all passengers. Report to your assigned muster station.', 'other', '17:00', '17:30', 'Muster Stations', true, false),
('e0000000-0000-0000-0000-000000000001', 1, 'Welcome Dinner', 'First evening in the Grand Restaurant. Smart casual attire.', 'dining', '18:30', '20:30', 'The Grand Restaurant', true, false),
('e0000000-0000-0000-0000-000000000001', 1, 'Opening Night Show: Broadway Hits', 'A spectacular revue of Broadway''s greatest hits featuring our talented cast.', 'show', '20:30', '22:00', 'Starlight Theater', true, false),
('e0000000-0000-0000-0000-000000000001', 1, 'DJ Night at Sky Lounge', 'Dance the night away with our resident DJ spinning hits from the 80s to today.', 'music', '22:00', '01:00', 'Sky Lounge', true, false),
-- Day 2 (Sea Day)
('e0000000-0000-0000-0000-000000000001', 2, 'Sunrise Yoga', 'Start your morning with a rejuvenating yoga session on the Sports Deck.', 'fitness', '07:00', '08:00', 'Sports Court', true, false),
('e0000000-0000-0000-0000-000000000001', 2, 'Morning Trivia Challenge', 'Test your knowledge! Teams of up to 6. Prizes for the winners!', 'activity', '10:00', '11:00', 'Sky Lounge', true, false),
('e0000000-0000-0000-0000-000000000001', 2, 'Pool Party & BBQ', 'Live band, poolside BBQ, and tropical drinks. The ultimate sea day party!', 'party', '12:00', '15:00', 'Oasis Pool', true, false),
('e0000000-0000-0000-0000-000000000001', 2, 'Mixology Class', 'Learn to make tropical cocktails from our expert bartenders. Includes tastings!', 'enrichment', '15:00', '16:00', 'Tiki Bar', false, true),
('e0000000-0000-0000-0000-000000000001', 2, 'Formal Night Dinner', 'Captain''s Gala Dinner. Formal attire recommended.', 'dining', '18:30', '20:30', 'The Grand Restaurant', true, false),
('e0000000-0000-0000-0000-000000000001', 2, 'Comedy Show: Stand-Up Night', 'Laugh out loud with comedian Mike Harrison. Adults only (18+).', 'show', '20:30', '22:00', 'Starlight Theater', true, false),
('e0000000-0000-0000-0000-000000000001', 2, 'Jazz Under the Stars', 'Live jazz quartet performing on the open-air Sky Deck.', 'music', '21:00', '23:00', 'Sky Lounge', true, false),
('e0000000-0000-0000-0000-000000000001', 2, 'Kids Movie Night', 'Family-friendly movie screening with popcorn and snacks.', 'kids', '19:00', '21:00', 'Starlight Theater', true, false),
-- Day 3 (Cozumel)
('e0000000-0000-0000-0000-000000000001', 3, 'Port Talk: Cozumel', 'Learn about today''s port of call, shore excursion tips, and local highlights.', 'enrichment', '07:00', '07:30', 'Starlight Theater', true, false),
('e0000000-0000-0000-0000-000000000001', 3, 'Mexican Cooking Demo', 'Watch our chef prepare authentic Mexican dishes you can try at tonight''s dinner.', 'enrichment', '11:00', '12:00', 'Horizon Buffet', true, false),
('e0000000-0000-0000-0000-000000000001', 3, 'Margarita Madness', 'Poolside margarita tasting with 5 different varieties. Salud!', 'party', '17:30', '19:00', 'Tiki Bar', false, false),
('e0000000-0000-0000-0000-000000000001', 3, 'Latin Dance Night', 'Salsa, bachata, and merengue with live Latin band and dance lessons.', 'music', '21:00', '00:00', 'Sky Lounge', true, false),

-- Day 4-7 events (abbreviated)
('e0000000-0000-0000-0000-000000000001', 4, 'Morning Stretch & Swim', 'Wake up with a guided stretching session followed by pool laps.', 'fitness', '07:00', '08:00', 'Oasis Pool', true, false),
('e0000000-0000-0000-0000-000000000001', 4, 'Port Talk: Grand Cayman', 'Your guide to the best of Grand Cayman.', 'enrichment', '07:30', '08:00', 'Starlight Theater', true, false),
('e0000000-0000-0000-0000-000000000001', 4, 'Island BBQ Dinner', 'Caribbean-themed buffet dinner with island music.', 'dining', '18:30', '20:30', 'Horizon Buffet', true, false),
('e0000000-0000-0000-0000-000000000001', 4, 'Caribbean Nights Show', 'A musical celebration of Caribbean culture and rhythms.', 'show', '20:30', '22:00', 'Starlight Theater', true, false),
('e0000000-0000-0000-0000-000000000001', 5, 'Reggae Morning', 'Start the day with chill reggae vibes and Jamaican Blue Mountain coffee.', 'music', '08:00', '10:00', 'Tiki Bar', true, false),
('e0000000-0000-0000-0000-000000000001', 5, 'Jamaican Jerk Cook-Off', 'Watch passengers compete in a jerk chicken cooking contest!', 'activity', '12:00', '13:30', 'Horizon Buffet', true, false),
('e0000000-0000-0000-0000-000000000001', 5, 'Karaoke Night', 'Show off your singing skills at our popular karaoke night!', 'party', '21:00', '00:00', 'Sky Lounge', true, false),
('e0000000-0000-0000-0000-000000000001', 6, 'Spa Day Special', 'Half-price spa treatments on our final sea day. Book early!', 'activity', '09:00', '17:00', 'Serenity Spa', false, true),
('e0000000-0000-0000-0000-000000000001', 6, 'Farewell Dinner', 'Last formal dinner aboard. Celebrate an amazing voyage!', 'dining', '18:30', '20:30', 'The Grand Restaurant', true, false),
('e0000000-0000-0000-0000-000000000001', 6, 'Farewell Show: Best of the Voyage', 'Highlights from the week''s best performances.', 'show', '20:30', '22:00', 'Starlight Theater', true, false),
('e0000000-0000-0000-0000-000000000001', 7, 'Packing & Disembarkation Info', 'Important information about disembarkation procedures.', 'other', '10:00', '10:30', 'Starlight Theater', true, false),
('e0000000-0000-0000-0000-000000000001', 7, 'Last Chance Shopping', 'Final day for duty-free shopping. Special discounts!', 'activity', '09:00', '21:00', 'Boutique Row', true, false);

-- EVENTS for Bahamas cruise (sample)
INSERT INTO events (cruise_id, day_number, title, description, category, start_time, end_time, location_name, is_free) VALUES
('e0000000-0000-0000-0000-000000000002', 1, 'Welcome Aboard Party', 'Set sail with music and cocktails!', 'party', '17:30', '19:00', 'Sun Deck', true),
('e0000000-0000-0000-0000-000000000002', 1, 'Opening Dinner', 'First night dinner in the Coral Dining Room.', 'dining', '19:00', '21:00', 'Coral Dining Room', true),
('e0000000-0000-0000-0000-000000000002', 2, 'Morning Yoga', 'Sunrise yoga on the Vista Deck.', 'fitness', '07:00', '08:00', 'Vista Deck', true),
('e0000000-0000-0000-0000-000000000002', 2, 'Beach Ball Tournament', 'Pool volleyball tournament with prizes!', 'sports', '10:00', '12:00', 'Breeze Pool', true),
('e0000000-0000-0000-0000-000000000002', 2, 'Island Beats Live', 'Live Caribbean music and dancing.', 'music', '20:00', '23:00', 'Sunset Lounge', true),
('e0000000-0000-0000-0000-000000000002', 3, 'Nassau Shore Guide', 'Tips for exploring Nassau.', 'enrichment', '07:00', '07:30', 'Moonlight Theater', true),
('e0000000-0000-0000-0000-000000000002', 3, 'Bahamian Cooking Class', 'Learn to make conch fritters and other Bahamian delights.', 'enrichment', '17:30', '18:30', 'Island Grill', true),
('e0000000-0000-0000-0000-000000000002', 4, 'CocoCay Beach Day', 'All-day beach activities on our private island!', 'activity', '08:00', '17:00', 'CocoCay Beach', true),
('e0000000-0000-0000-0000-000000000002', 5, 'Farewell Sunset Party', 'Watch the last sunset of the cruise with cocktails and music.', 'party', '17:00', '19:00', 'Sunset Lounge', true),
('e0000000-0000-0000-0000-000000000002', 5, 'Farewell Dinner', 'Final dinner aboard the Caribbean Star.', 'dining', '19:00', '21:00', 'Coral Dining Room', true);

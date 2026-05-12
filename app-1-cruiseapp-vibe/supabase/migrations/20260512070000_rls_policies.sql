ALTER TABLE ships ENABLE ROW LEVEL SECURITY;
ALTER TABLE decks ENABLE ROW LEVEL SECURITY;
ALTER TABLE amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE cabin_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE cabins ENABLE ROW LEVEL SECURITY;
ALTER TABLE cruises ENABLE ROW LEVEL SECURITY;
ALTER TABLE itinerary_stops ENABLE ROW LEVEL SECURITY;
ALTER TABLE cruise_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE passengers ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_event_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE timezone_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE terminals ENABLE ROW LEVEL SECURITY;
ALTER TABLE transport_options ENABLE ROW LEVEL SECURITY;

-- Public read access for catalog data
CREATE POLICY "public_read_ships" ON ships FOR SELECT TO public USING (true);
CREATE POLICY "public_read_decks" ON decks FOR SELECT TO public USING (true);
CREATE POLICY "public_read_amenities" ON amenities FOR SELECT TO public USING (true);
CREATE POLICY "public_read_cabin_categories" ON cabin_categories FOR SELECT TO public USING (true);
CREATE POLICY "public_read_cabins" ON cabins FOR SELECT TO public USING (true);
CREATE POLICY "public_read_cruises" ON cruises FOR SELECT TO public USING (true);
CREATE POLICY "public_read_itinerary_stops" ON itinerary_stops FOR SELECT TO public USING (true);
CREATE POLICY "public_read_cruise_pricing" ON cruise_pricing FOR SELECT TO public USING (true);
CREATE POLICY "public_read_events" ON events FOR SELECT TO public USING (true);
CREATE POLICY "public_read_timezone_schedule" ON timezone_schedule FOR SELECT TO public USING (true);
CREATE POLICY "public_read_terminals" ON terminals FOR SELECT TO public USING (true);
CREATE POLICY "public_read_transport_options" ON transport_options FOR SELECT TO public USING (true);

-- Bookings: users can only see/manage their own
CREATE POLICY "users_read_own_bookings" ON bookings FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "users_insert_own_bookings" ON bookings FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "users_update_own_bookings" ON bookings FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- Passengers: users can manage passengers on their own bookings
CREATE POLICY "users_read_own_passengers" ON passengers FOR SELECT TO authenticated USING (booking_id IN (SELECT id FROM bookings WHERE user_id = auth.uid()));
CREATE POLICY "users_insert_own_passengers" ON passengers FOR INSERT TO authenticated WITH CHECK (booking_id IN (SELECT id FROM bookings WHERE user_id = auth.uid()));
CREATE POLICY "users_update_own_passengers" ON passengers FOR UPDATE TO authenticated USING (booking_id IN (SELECT id FROM bookings WHERE user_id = auth.uid()));

-- User event favorites: own only
CREATE POLICY "users_favorites_select" ON user_event_favorites FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "users_favorites_insert" ON user_event_favorites FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "users_favorites_update" ON user_event_favorites FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "users_favorites_delete" ON user_event_favorites FOR DELETE TO authenticated USING (user_id = auth.uid());

-- User profiles: own only
CREATE POLICY "users_read_own_profile" ON user_profiles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "users_insert_own_profile" ON user_profiles FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "users_update_own_profile" ON user_profiles FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- Enable PostGIS for location features
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Create specific schemas if needed, public is fine for MVP
-- USERS / AUTH EXTENSION
-- Profiles table extends auth.users
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  phone_number TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'driver', 'premium')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- RLS for Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- VEHICLES
CREATE TABLE vehicles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL, -- Keke, Bus, Taxi, Bolt
  icon_key TEXT, -- Frontend icon reference
  base_fare DECIMAL(10, 2) DEFAULT 0,
  per_km_rate DECIMAL(10, 2) DEFAULT 0,
  capacity INT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Vehicles are viewable by everyone" ON vehicles FOR SELECT USING (true);
CREATE POLICY "Admins can manage vehicles" ON vehicles FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- LOCATIONS / STOPS
CREATE TABLE stops (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location GEOGRAPHY(POINT, 4326) NOT NULL,
  type TEXT DEFAULT 'stop' CHECK (type IN ('stop', 'junction', 'terminal', 'landmark')),
  is_verified BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX stops_location_idx ON stops USING GIST (location);

ALTER TABLE stops ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Stops are viewable by everyone" ON stops FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create stops" ON stops FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- ROUTES
CREATE TABLE routes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL, -- e.g. "Rumuokoro - Choba via Uniport"
  description TEXT,
  start_stop_id UUID REFERENCES stops(id),
  end_stop_id UUID REFERENCES stops(id),
  total_distance_km DECIMAL,
  estimated_duration_min INT,
  popularity_score INT DEFAULT 0,
  is_verified BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Routes are viewable by everyone" ON routes FOR SELECT USING (true);

-- ROUTE SEGMENTS (The steps)
CREATE TABLE route_segments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  route_id UUID REFERENCES routes(id) ON DELETE CASCADE,
  from_stop_id UUID REFERENCES stops(id),
  to_stop_id UUID REFERENCES stops(id),
  vehicle_type_id UUID REFERENCES vehicles(id),
  segment_order INT NOT NULL, -- 1, 2, 3...
  distance_km DECIMAL,
  duration_min INT,
  cost_estimate_min DECIMAL,
  cost_estimate_max DECIMAL,
  instructions TEXT, -- "Walk to the junction"
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE route_segments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Segments are viewable by everyone" ON route_segments FOR SELECT USING (true);

-- USER REPORTS (Intelligence)
CREATE TABLE reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  report_type TEXT CHECK (report_type IN ('traffic', 'accident', 'police', 'road_closed', 'price_surge')),
  location GEOGRAPHY(POINT, 4326),
  description TEXT,
  upvotes INT DEFAULT 0,
  downvotes INT DEFAULT 0,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX reports_location_idx ON reports USING GIST (location);
CREATE INDEX reports_expires_idx ON reports (expires_at);

ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active reports are viewable" ON reports FOR SELECT USING (expires_at > NOW());
CREATE POLICY "Users can create reports" ON reports FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- ANALYTICS / SEARCH HISTORY
CREATE TABLE search_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  origin_text TEXT,
  destination_text TEXT,
  origin_geo GEOGRAPHY(POINT, 4326),
  destination_geo GEOGRAPHY(POINT, 4326),
  selected_route_id UUID REFERENCES routes(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE search_logs ENABLE ROW LEVEL SECURITY;
-- Only admins view logs usually
CREATE POLICY "Admins view logs" ON search_logs FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Users insert logs" ON search_logs FOR INSERT WITH CHECK (true);

-- Functions
-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS web/supabase/migrations
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
web/supabase/migrations LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

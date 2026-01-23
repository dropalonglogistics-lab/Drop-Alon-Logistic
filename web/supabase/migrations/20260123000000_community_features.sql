-- ROUTE SUGGESTIONS (Community Routes)
CREATE TABLE route_suggestions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  origin_text TEXT NOT NULL,
  destination_text TEXT NOT NULL,
  suggested_fare DECIMAL(10, 2),
  vehicle_type TEXT, -- Keke, Bus, Taxi
  instructions TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  votes INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE route_suggestions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Route suggestions are viewable by everyone" 
  ON route_suggestions FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create suggestions" 
  ON route_suggestions FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- FARE REPORTS (Price Updates)
CREATE TABLE fare_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  route_id UUID REFERENCES routes(id) ON DELETE CASCADE,
  reported_fare DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE fare_reports ENABLE ROW LEVEL SECURITY;

-- Everyone can see reports (transparency)
CREATE POLICY "Fare reports are viewable by everyone" 
  ON fare_reports FOR SELECT USING (true);

-- Only logged in users can report
CREATE POLICY "Authenticated users can report fares" 
  ON fare_reports FOR INSERT WITH CHECK (auth.role() = 'authenticated');
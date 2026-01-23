-- Seed Data for Drop Along Logistics
-- This script populates the database with sample routes for Port Harcourt

-- 1. Insert Vehicles
INSERT INTO vehicles (name, icon_key, base_fare, per_km_rate, capacity, description) VALUES
('Keke Napep', 'keke', 50, 30, 3, 'Three-wheeled motorcycle taxi'),
('Bus (Danfo)', 'bus', 100, 20, 14, 'Small commercial bus'),
('Taxi', 'taxi', 200, 100, 4, 'Private taxi service'),
('Sienna', 'sienna', 150, 50, 7, 'Executive minivan')
ON CONFLICT DO NOTHING;

-- 2. Insert Stops (Major locations in Port Harcourt)
INSERT INTO stops (name, location, type, is_verified) VALUES
('Rumuokoro Junction', ST_SetSRID(ST_MakePoint(6.996, 4.868), 4326), 'junction', true),
('Choba Park', ST_SetSRID(ST_MakePoint(6.901, 4.889), 4326), 'terminal', true),
('Uniport Gate', ST_SetSRID(ST_MakePoint(6.920, 4.895), 4326), 'stop', true),
('Mile 1 Market', ST_SetSRID(ST_MakePoint(7.009, 4.795), 4326), 'junction', true),
('Garrison Junction', ST_SetSRID(ST_MakePoint(7.037, 4.802), 4326), 'junction', true),
('Slaughter', ST_SetSRID(ST_MakePoint(7.042, 4.832), 4326), 'stop', true),
('Oil Mill Market', ST_SetSRID(ST_MakePoint(7.050, 4.840), 4326), 'terminal', true),
('Eleme Junction', ST_SetSRID(ST_MakePoint(7.100, 4.780), 4326), 'junction', true),
('Waterlines', ST_SetSRID(ST_MakePoint(6.980, 4.810), 4326), 'stop', true),
('Rumuola', ST_SetSRID(ST_MakePoint(6.990, 4.820), 4326), 'junction', true)
ON CONFLICT DO NOTHING;

-- 3. Insert Routes
WITH vehicle_ids AS (
  SELECT id, name FROM vehicles
),
stop_ids AS (
  SELECT id, name FROM stops
)
INSERT INTO routes (name, description, start_stop_id, end_stop_id, total_distance_km, estimated_duration_min, popularity_score, is_verified)
SELECT 
  ''Rumuokoro - Choba via Uniport'',
  ''Popular student route to University of Port Harcourt'',
  (SELECT id FROM stop_ids WHERE name = ''Rumuokoro Junction''),
  (SELECT id FROM stop_ids WHERE name = ''Choba Park''),
  8.5,
  45,
  95,
  true
UNION ALL
SELECT 
  ''Garrison - Oil Mill'',
  ''Direct route to Oil Mill Market'',
  (SELECT id FROM stop_ids WHERE name = ''Garrison Junction''),
  (SELECT id FROM stop_ids WHERE name = ''Oil Mill Market''),
  4.0,
  20,
  88,
  true
UNION ALL
SELECT 
  ''Mile 1 - Eleme Junction'',
  ''Main highway route'',
  (SELECT id FROM stop_ids WHERE name = ''Mile 1 Market''),
  (SELECT id FROM stop_ids WHERE name = ''Eleme Junction''),
  12.0,
  35,
  75,
  true
ON CONFLICT DO NOTHING;

-- 4. Insert Route Segments
-- Route 1: Rumuokoro - Choba via Uniport (2 segments)
WITH route_data AS (
  SELECT r.id as route_id, r.name as route_name
  FROM routes r
  WHERE r.name = ''Rumuokoro - Choba via Uniport''
  LIMIT 1
),
vehicle_data AS (
  SELECT id, name FROM vehicles
),
stop_data AS (
  SELECT id, name FROM stops
)
INSERT INTO route_segments (route_id, from_stop_id, to_stop_id, vehicle_type_id, segment_order, distance_km, duration_min, cost_estimate_min, cost_estimate_max, instructions)
SELECT 
  (SELECT route_id FROM route_data),
  (SELECT id FROM stop_data WHERE name = ''Rumuokoro Junction''),
  (SELECT id FROM stop_data WHERE name = ''Uniport Gate''),
  (SELECT id FROM vehicle_data WHERE name = ''Keke Napep''),
  1,
  5.0,
  25,
  150,
  200,
  ''Take Keke from Rumuokoro junction heading to Uniport. Tell the driver "Uniport Gate"''
UNION ALL
SELECT 
  (SELECT route_id FROM route_data),
  (SELECT id FROM stop_data WHERE name = ''Uniport Gate''),
  (SELECT id FROM stop_data WHERE name = ''Choba Park''),
  (SELECT id FROM vehicle_data WHERE name = ''Bus (Danfo)''),
  2,
  3.5,
  20,
  100,
  150,
  ''Board any bus heading to Choba. They usually park near the gate''
ON CONFLICT DO NOTHING;

-- Route 2: Garrison - Oil Mill (1 segment)
WITH route_data AS (
  SELECT r.id as route_id
  FROM routes r
  WHERE r.name = ''Garrison - Oil Mill''
  LIMIT 1
),
vehicle_data AS (
  SELECT id, name FROM vehicles
),
stop_data AS (
  SELECT id, name FROM stops
)
INSERT INTO route_segments (route_id, from_stop_id, to_stop_id, vehicle_type_id, segment_order, distance_km, duration_min, cost_estimate_min, cost_estimate_max, instructions)
SELECT 
  (SELECT route_id FROM route_data),
  (SELECT id FROM stop_data WHERE name = ''Garrison Junction''),
  (SELECT id FROM stop_data WHERE name = ''Oil Mill Market''),
  (SELECT id FROM vehicle_data WHERE name = ''Bus (Danfo)''),
  1,
  4.0,
  20,
  150,
  200,
  ''Direct bus from Garrison to Oil Mill. No stops in between''
ON CONFLICT DO NOTHING;

-- Route 3: Mile 1 - Eleme Junction (1 segment)
WITH route_data AS (
  SELECT r.id as route_id
  FROM routes r
  WHERE r.name = ''Mile 1 - Eleme Junction''
  LIMIT 1
),
vehicle_data AS (
  SELECT id, name FROM vehicles
),
stop_data AS (
  SELECT id, name FROM stops
)
INSERT INTO route_segments (route_id, from_stop_id, to_stop_id, vehicle_type_id, segment_order, distance_km, duration_min, cost_estimate_min, cost_estimate_max, instructions)
SELECT 
  (SELECT route_id FROM route_data),
  (SELECT id FROM stop_data WHERE name = ''Mile 1 Market''),
  (SELECT id FROM stop_data WHERE name = ''Eleme Junction''),
  (SELECT id FROM vehicle_data WHERE name = ''Taxi''),
  1,
  12.0,
  35,
  800,
  1000,
  ''Take a taxi from Mile 1. Negotiate fare before entering''
ON CONFLICT DO NOTHING;
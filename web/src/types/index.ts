export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  role: 'user' | 'admin' | 'driver' | 'premium';
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Stop {
  id: string;
  name: string;
  location: Coordinates;
  type: 'stop' | 'junction' | 'terminal' | 'landmark';
}

export interface Vehicle {
  id: string;
  name: string; // Keke, Bus, Taxi
  icon_key: string;
  base_fare: number;
  per_km_rate: number;
}

export interface RouteSegment {
  id: string;
  from_stop: Stop;
  to_stop: Stop;
  vehicle: Vehicle;
  distance_km: number;
  duration_min: number;
  cost_estimate: number;
  instructions: string;
}

export interface Route {
  id: string;
  name: string;
  segments: RouteSegment[];
  total_duration_min: number;
  total_cost_estimate: number;
  total_distance_km: number;
  popularity_score: number;
  tags?: string[]; // "Fastest", "Cheapest", "Direct"
}

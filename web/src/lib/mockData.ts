import { Route, Stop, Vehicle } from "@/types";

// Mock Stops
const STOPS: Record<string, Stop> = {
  rumuokoro: { id: "1", name: "Rumuokoro Junction", location: { lat: 4.868, lng: 6.996 }, type: "junction" },
  uniport: { id: "2", name: "Uniport Gate", location: { lat: 4.895, lng: 6.920 }, type: "stop" },
  choba: { id: "3", name: "Choba Park", location: { lat: 4.889, lng: 6.901 }, type: "terminal" },
  mile1: { id: "4", name: "Mile 1 Flyover", location: { lat: 4.795, lng: 7.009 }, type: "junction" },
  garrison: { id: "5", name: "Garrison Junction", location: { lat: 4.802, lng: 7.037 }, type: "junction" },
  slaughter: { id: "6", name: "Slaughter", location: { lat: 4.832, lng: 7.042 }, type: "stop" },
};

// Mock Vehicles
const VEHICLES: Record<string, Vehicle> = {
  keke: { id: "v1", name: "Keke", icon_key: "keke", base_fare: 50, per_km_rate: 30 },
  bus: { id: "v2", name: "Bus", icon_key: "bus", base_fare: 100, per_km_rate: 20 },
  taxi: { id: "v3", name: "Taxi", icon_key: "taxi", base_fare: 200, per_km_rate: 100 },
  walk: { id: "v4", name: "Walk", icon_key: "walk", base_fare: 0, per_km_rate: 0 },
};

// Mock Routes
export const MOCK_ROUTES: Route[] = [
  {
    id: "route_1",
    name: "Rumuokoro to Choba via Uniport",
    total_duration_min: 45,
    total_cost_estimate: 250,
    total_distance_km: 8.5,
    popularity_score: 95,
    tags: ["Cheapest", "Popular"],
    segments: [
      {
        id: "s1",
        from_stop: STOPS.rumuokoro,
        to_stop: STOPS.uniport,
        vehicle: VEHICLES.keke,
        distance_km: 5,
        duration_min: 25,
        cost_estimate: 150,
        instructions: "Take Keke from Rumuokoro junction to Uniport Gate",
      },
      {
        id: "s2",
        from_stop: STOPS.uniport,
        to_stop: STOPS.choba,
        vehicle: VEHICLES.bus,
        distance_km: 3.5,
        duration_min: 20,
        cost_estimate: 100,
        instructions: "Board Bus at Uniport Gate heading to Choba",
      }
    ]
  },
  {
    id: "route_2",
    name: "Rumuokoro to Choba (Direct Taxi)",
    total_duration_min: 25,
    total_cost_estimate: 800,
    total_distance_km: 8.0,
    popularity_score: 40,
    tags: ["Fastest"],
    segments: [
      {
        id: "s3",
        from_stop: STOPS.rumuokoro,
        to_stop: STOPS.choba,
        vehicle: VEHICLES.taxi,
        distance_km: 8.0,
        duration_min: 25,
        cost_estimate: 800,
        instructions: "Take a direct drop taxi from Rumuokoro",
      }
    ]
  },
    {
    id: "route_3",
    name: "Garrison to Slaughter",
    total_duration_min: 20,
    total_cost_estimate: 150,
    total_distance_km: 4.0,
    popularity_score: 88,
    tags: ["Direct"],
    segments: [
      {
        id: "s4",
        from_stop: STOPS.garrison,
        to_stop: STOPS.slaughter,
        vehicle: VEHICLES.bus,
        distance_km: 4.0,
        duration_min: 20,
        cost_estimate: 150,
        instructions: "Take bus from Garrison straight to Slaughter",
      }
    ]
  }
];

export async function searchRoutes(from: string, to: string): Promise<Route[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const fromL = from.toLowerCase();
  const toL = to.toLowerCase();

  // Simple filter logic for mock
  if (fromL.includes('rumuokoro') || toL.includes('choba')) {
    return MOCK_ROUTES.filter(r => r.id.includes('route_1') || r.id.includes('route_2'));
  }
  if (fromL.includes('garrison')) {
    return MOCK_ROUTES.filter(r => r.id.includes('route_3'));
  }

  // specific
  if (fromL === "" && toL === "") return MOCK_ROUTES;

  return MOCK_ROUTES;
}

export async function getRouteById(id: string): Promise<Route | undefined> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_ROUTES.find(r => r.id === id);
}

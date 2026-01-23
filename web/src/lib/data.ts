import { createClient } from "@/lib/supabase/server";
import { Route, RouteSegment, Stop, Vehicle } from "@/types";

export async function getRoutes(): Promise<Route[]> {
  const supabase = createClient();
  
  // Fetch routes with all related data
  // Note: PostgREST doesn't support deep nested mapping easily in one go to match our strict TS interfaces perfectly without some transformation
  // We will fetch the data and map it.
  
  const { data: routesData, error } = await (await supabase)
    .from('routes')
    .select(`
      *,
      start_stop:stops!routes_start_stop_id_fkey(*),
      end_stop:stops!routes_end_stop_id_fkey(*),
      route_segments(
        *,
        from_stop:stops!route_segments_from_stop_id_fkey(*),
        to_stop:stops!route_segments_to_stop_id_fkey(*),
        vehicle:vehicles(*)
      )
    `)
    .eq('is_verified', true);

  if (error) {
    console.error("Error fetching routes:", error);
    return [];
  }

  if (!routesData) return [];

  // Map database response to our UI Route interface
  return routesData.map((r: any) => ({
    id: r.id,
    name: r.name,
    total_duration_min: r.estimated_duration_min || 0,
    total_cost_estimate: 0, // We'll sum segments
    total_distance_km: r.total_distance_km || 0,
    popularity_score: r.popularity_score || 0,
    tags: r.popularity_score > 80 ? ['Popular'] : [], 
    segments: r.route_segments.sort((a: any, b: any) => a.segment_order - b.segment_order).map((s: any) => ({
      id: s.id,
      from_stop: mapStop(s.from_stop),
      to_stop: mapStop(s.to_stop),
      vehicle: mapVehicle(s.vehicle),
      distance_km: s.distance_km || 0,
      duration_min: s.duration_min || 0,
      cost_estimate: s.cost_estimate_min || 0,
      instructions: s.instructions || ''
    }))
  })).map(route => ({
    ...route,
    total_cost_estimate: route.segments.reduce((sum: number, seg: any) => sum + seg.cost_estimate, 0)
  }));
}

export async function getRouteById(id: string): Promise<Route | undefined> {
  const supabase = createClient();
  
  const { data: routeData, error } = await (await supabase)
    .from('routes')
    .select(`
      *,
      start_stop:stops!routes_start_stop_id_fkey(*),
      end_stop:stops!routes_end_stop_id_fkey(*),
      route_segments(
        *,
        from_stop:stops!route_segments_from_stop_id_fkey(*),
        to_stop:stops!route_segments_to_stop_id_fkey(*),
        vehicle:vehicles(*)
      )
    `)
    .eq('id', id)
    .single();

  if (error || !routeData) {
    return undefined;
  }

  const segments = routeData.route_segments.sort((a: any, b: any) => a.segment_order - b.segment_order).map((s: any) => ({
      id: s.id,
      from_stop: mapStop(s.from_stop),
      to_stop: mapStop(s.to_stop),
      vehicle: mapVehicle(s.vehicle),
      distance_km: s.distance_km || 0,
      duration_min: s.duration_min || 0,
      cost_estimate: s.cost_estimate_min || 0,
      instructions: s.instructions || ''
  }));

  return {
    id: routeData.id,
    name: routeData.name,
    total_duration_min: routeData.estimated_duration_min || 0,
    total_cost_estimate: segments.reduce((sum: number, seg: any) => sum + seg.cost_estimate, 0),
    total_distance_km: routeData.total_distance_km || 0,
    popularity_score: routeData.popularity_score || 0,
    tags: [],
    segments: segments
  };
}

// Helpers to map raw DB shapes to UI shapes
function mapStop(dbStop: any): Stop {
    // GeoJSON point handling might be needed depending on how pg returns it
    // For now assuming simplified return or we parse it. 
    // If PostGIS returns binary, we might need a stored proc or st_asgeojson.
    // For MVP, letting Supabase JS handle it or mocking the lat/lng if complex.
    
    return {
        id: dbStop.id,
        name: dbStop.name,
        location: { lat: 0, lng: 0 }, // TODO: Parse PostGIS point
        type: dbStop.type as any
    }
}

function mapVehicle(dbVehicle: any): Vehicle {
    return {
        id: dbVehicle.id,
        name: dbVehicle.name,
        icon_key: dbVehicle.icon_key || 'bus',
        base_fare: dbVehicle.base_fare || 0,
        per_km_rate: dbVehicle.per_km_rate || 0
    }
}
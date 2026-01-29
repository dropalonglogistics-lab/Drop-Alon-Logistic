import { createClient } from './server';
import { Route } from '@/types';

export async function searchRoutes(from?: string, to?: string) {
    const supabase = await createClient();

    let query = supabase
        .from('routes')
        .select(`
      *,
      start_stop:stops!routes_start_stop_id_fkey(id, name, location),
      end_stop:stops!routes_end_stop_id_fkey(id, name, location),
      segments:route_segments(
        *,
        from_stop:stops!route_segments_from_stop_id_fkey(id, name, location),
        to_stop:stops!route_segments_to_stop_id_fkey(id, name, location),
        vehicle:vehicles(*)
      )
    `)
        .eq('is_verified', true)
        .order('popularity_score', { ascending: false });

    // Apply filters if provided
    if (from) {
        query = query.ilike('start_stop.name', `%${from}%`);
    }

    if (to) {
        query = query.ilike('end_stop.name', `%${to}%`);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching routes:', error);
        return [];
    }

    return transformRoutes(data || []);
}

export async function getRouteById(id: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('routes')
        .select(`
      *,
      start_stop:stops!routes_start_stop_id_fkey(id, name, location),
      end_stop:stops!routes_end_stop_id_fkey(id, name, location),
      segments:route_segments(
        *,
        from_stop:stops!route_segments_from_stop_id_fkey(id, name, location),
        to_stop:stops!route_segments_to_stop_id_fkey(id, name, location),
        vehicle:vehicles(*)
      )
    `)
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching route:', error);
        return null;
    }

    return transformRoute(data);
}

export async function getAllRoutes() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('routes')
        .select(`
      *,
      start_stop:stops!routes_start_stop_id_fkey(id, name, location),
      end_stop:stops!routes_end_stop_id_fkey(id, name, location),
      segments:route_segments(
        *,
        from_stop:stops!route_segments_from_stop_id_fkey(id, name, location),
        to_stop:stops!route_segments_to_stop_id_fkey(id, name, location),
        vehicle:vehicles(*)
      )
    `)
        .eq('is_verified', true)
        .order('popularity_score', { ascending: false });

    if (error) {
        console.error('Error fetching routes:', error);
        return [];
    }

    return transformRoutes(data || []);
}

// Helper function to transform database routes to app format
function transformRoute(dbRoute: any): Route {
    const segments = (dbRoute.segments || [])
        .sort((a: any, b: any) => a.segment_order - b.segment_order)
        .map((seg: any) => ({
            id: seg.id,
            from_stop: {
                id: seg.from_stop.id,
                name: seg.from_stop.name,
                location: seg.from_stop.location,
                type: 'stop'
            },
            to_stop: {
                id: seg.to_stop.id,
                name: seg.to_stop.name,
                location: seg.to_stop.location,
                type: 'stop'
            },
            vehicle: {
                id: seg.vehicle.id,
                name: seg.vehicle.name,
                icon_key: seg.vehicle.icon_key,
                base_fare: parseFloat(seg.vehicle.base_fare),
                per_km_rate: parseFloat(seg.vehicle.per_km_rate)
            },
            distance_km: parseFloat(seg.distance_km),
            duration_min: seg.duration_min,
            cost_estimate: parseFloat(seg.cost_estimate_min),
            instructions: seg.instructions
        }));

    const totalCost = segments.reduce((sum: number, seg: any) => sum + seg.cost_estimate, 0);
    const totalDuration = segments.reduce((sum: number, seg: any) => sum + seg.duration_min, 0);

    return {
        id: dbRoute.id,
        name: dbRoute.name,
        total_duration_min: totalDuration,
        total_cost_estimate: totalCost,
        total_distance_km: parseFloat(dbRoute.total_distance_km),
        popularity_score: dbRoute.popularity_score,
        tags: dbRoute.popularity_score > 90 ? ['Popular'] : [],
        segments
    };
}

function transformRoutes(dbRoutes: any[]): Route[] {
    return dbRoutes.map(transformRoute);
}

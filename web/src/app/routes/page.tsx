import { Suspense } from "react";
import { Search, MapPin, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { RouteCard } from "@/components/routing/RouteCard";
import { searchRoutes, getAllRoutes } from "@/lib/supabase/queries";
import Link from "next/link";

interface RouteResultsPageProps {
    searchParams: { from?: string; to?: string };
}

async function RouteResults({ searchParams }: RouteResultsPageProps) {
    const from = searchParams.from || '';
    const to = searchParams.to || '';

    // Fetch routes from Supabase
    const routes = from || to ? await searchRoutes(from, to) : await getAllRoutes();

    return (
        <div className="px-4 py-2">
            <div className="flex justify-between items-center mb-4 px-2">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {routes.length} routes found
                </p>
                <button className="flex items-center gap-1 text-xs font-bold text-dal-gold px-3 py-1.5 rounded-full border border-dal-gold/20 bg-dal-gold/5">
                    <Filter className="w-3 h-3" />
                    Filter
                </button>
            </div>

            <div className="space-y-4">
                {routes.length > 0 ? (
                    routes.map((route, index) => (
                        <Link key={route.id} href={`/routes/${route.id}`}>
                            <RouteCard
                                id={route.id}
                                from={route.segments[0]?.from_stop.name || "Start"}
                                to={route.segments[route.segments.length - 1]?.to_stop.name || "End"}
                                duration={`${route.total_duration_min} min`}
                                price={route.total_cost_estimate}
                                segments={route.segments.map(s => s.vehicle.name)}
                                isBest={index === 0}
                            />
                        </Link>
                    ))
                ) : (
                    <div className="text-center py-20 px-6">
                        <div className="bg-gray-100 dark:bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="font-bold text-lg dark:text-white mb-2">No routes found</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search terms or check back later.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function RouteSearchHeader({ searchParams }: RouteResultsPageProps) {
    return (
        <div className="bg-dal-black p-6 pt-10 rounded-b-3xl shadow-lg sticky top-0 z-10">
            <form method="GET" className="flex flex-col gap-3">
                <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-dal-gold" />
                    <Input
                        name="from"
                        defaultValue={searchParams.from}
                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:bg-white/10"
                        placeholder="From: e.g. Rumuokoro"
                    />
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-dal-gold" />
                    <Input
                        name="to"
                        defaultValue={searchParams.to}
                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:bg-white/10"
                        placeholder="To: e.g. Choba"
                    />
                </div>
                <button type="submit" className="sr-only">Search</button>
            </form>
        </div>
    );
}

export default function RouteResultsPage({ searchParams }: RouteResultsPageProps) {
    return (
        <div className="flex flex-col gap-4 pb-20">
            <RouteSearchHeader searchParams={searchParams} />
            <Suspense fallback={
                <div className="px-4 py-10 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dal-gold mx-auto"></div>
                    <p className="mt-4 text-gray-500 dark:text-gray-400">Loading routes...</p>
                </div>
            }>
                <RouteResults searchParams={searchParams} />
            </Suspense>
        </div>
    );
}

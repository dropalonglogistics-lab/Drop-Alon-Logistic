'use client';

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, MapPin, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { RouteCard } from "@/components/routing/RouteCard";
import { searchRoutes } from "@/lib/mockData";
import { Route } from "@/types";
import Link from "next/link";

function RouteResultsContent() {
  const searchParams = useSearchParams();
  const [from, setFrom] = useState(searchParams.get("from") || "");
  const [to, setTo] = useState(searchParams.get("to") || "");
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoutes = async () => {
      setLoading(true);
      const results = await searchRoutes(from, to);
      setRoutes(results);
      setLoading(false);
    };

    fetchRoutes();
  }, [from, to]);

  return (
    <div className="flex flex-col gap-4">
      {/* Search Header */}
      <div className="bg-dal-black p-6 pt-10 rounded-b-3xl shadow-lg sticky top-0 z-10">
        <div className="flex flex-col gap-3">
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-4 h-4 text-dal-gold" />
            <Input 
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:bg-white/10" 
              placeholder="From: e.g. Rumuokoro" 
            />
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-dal-gold" />
            <Input 
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:bg-white/10" 
              placeholder="To: e.g. Choba" 
            />
          </div>
        </div>
      </div>

      <div className="px-4 py-2">
        <div className="flex justify-between items-center mb-4 px-2">
          <p className="text-sm font-medium text-gray-500">
            {loading ? "Searching..." : `${routes.length} routes found`}
          </p>
          <button className="flex items-center gap-1 text-xs font-bold text-dal-gold px-3 py-1.5 rounded-full border border-dal-gold/20 bg-dal-gold/5">
            <Filter className="w-3 h-3" />
            Filter
          </button>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : routes.length > 0 ? (
            routes.map((route, index) => (
              <Link key={route.id} href={`/routes/${route.id}`}>
                <RouteCard 
                  id={route.id}
                  from={route.name.split("-")[0]?.trim() || "Start"}
                  to={route.name.split("-")[1]?.trim() || "End"}
                  duration={`${route.total_duration_min} min`}
                  price={route.total_cost_estimate} 
                  segments={route.segments.map(s => s.vehicle.name)}
                  isBest={index === 0}
                />
              </Link>
            ))
          ) : (
            <div className="text-center py-20 px-6">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-bold text-lg mb-2">No routes found</h3>
              <p className="text-sm text-gray-500">Try adjusting your search terms or check back later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RouteResultsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading search results...</div>}>
      <RouteResultsContent />
    </Suspense>
  );
}
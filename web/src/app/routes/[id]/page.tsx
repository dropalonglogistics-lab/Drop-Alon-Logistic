import { ArrowLeft, Clock, MapPin, Navigation, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { StepByStep } from "@/components/routing/StepByStep";
import { UpdateFareForm } from "@/components/reporting/UpdateFareForm";
import { getRouteById } from "@/lib/data";

export default async function RouteDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const route = await getRouteById(id);

  if (!route) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold mb-4">Route not found</h2>
        <Link href="/routes">
          <Button variant="outline">Back to Search</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-dal-black text-white p-6 pt-10 rounded-b-3xl shadow-lg relative overflow-hidden">
        <Link href="/routes" className="flex items-center gap-2 text-dal-gold hover:text-white transition-colors mb-4 relative z-10">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-bold">Back to Results</span>
        </Link>
        <h1 className="text-2xl font-bold mb-2 relative z-10">{route.name}</h1>
        <div className="flex gap-4 text-xs text-gray-400 relative z-10">
           <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {route.total_duration_min} min</span>
           <span className="flex items-center gap-1"><Navigation className="w-3 h-3 border-r pr-4 border-gray-700" /> {route.total_distance_km} km</span>
           <span className="font-bold text-dal-gold text-sm">₦{route.total_cost_estimate}</span>
        </div>
        
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-dal-gold/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
      </div>

      <div className="p-4 space-y-6">
        {/* Fare Update Section */}
        <UpdateFareForm routeId={route.id} currentFare={route.total_cost_estimate} />

        {/* Itinerary */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-dal-black flex items-center gap-2">
              <MapPin className="w-5 h-5 text-dal-gold" />
              Step-by-Step Itinerary
            </h2>
          </div>
          <StepByStep segments={route.segments} />
        </section>

        {/* Info Alert */}
        <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl flex gap-3">
          <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-sm text-blue-900">Pro Tip</h3>
            <p className="text-[11px] text-blue-700 leading-relaxed">
              Traffic at **{route.name.split("-")[0]?.trim()}** is usually light at this time. Always carry smaller denominations for Keke operators.
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
           <Button variant="outline" className="border-gray-200 text-gray-600 hover:bg-white rounded-xl h-12 text-xs font-bold transition-all">
             SAVE ROUTE
           </Button>
           <Link href="/report">
             <Button variant="outline" className="w-full border-red-100 text-red-500 hover:bg-red-50 rounded-xl h-12 text-xs font-bold transition-all">
               REPORT ISSUE
             </Button>
           </Link>
        </div>
      </div>
    </div>
  );
}
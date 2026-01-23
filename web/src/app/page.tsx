import Link from "next/link";
import { TrendingUp, ShieldCheck, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { RouteSearchForm } from "@/components/routing/RouteSearchForm";
import { CommunityHub } from "@/components/community/CommunityHub";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 pb-20">
      {/* Hero Header */}
      <section className="bg-dal-black text-white p-8 pt-12 rounded-b-[2.5rem] shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold tracking-tight">
            Drop <span className="text-dal-gold italic font-black">Along</span>
          </h1>
          <div className="bg-white/10 p-2 rounded-full backdrop-blur-sm">
             <ShieldCheck className="w-5 h-5 text-dal-gold" />
          </div>
        </div>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          The smartest way to navigate Port Harcourt's public transport. Save time, save money, and commute with confidence.
        </p>
        
        <RouteSearchForm />
      </section>

      {/* Main Content Areas */}
      <div className="px-6 space-y-8">
        
        {/* Community Hub (Live Updates) */}
        <div className="pb-2">
           <CommunityHub />
        </div>

        {/* Recent Routes */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-dal-gold" />
              Popular Routes
            </h2>
            <Link href="/routes" className="text-xs font-bold text-dal-gold hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {[
              { id: '1', from: 'Rumuokoro', to: 'Choba', price: '₦300', time: '25m' },
              { id: '2', from: 'Garrison', to: 'Oil Mill', price: '₦500', time: '40m' }
            ].map((route) => (
              <Link key={route.id} href={`/routes/${route.id}`}>
                <Card className="hover:border-dal-gold transition-all hover:scale-[1.01] active:scale-[0.99] border-gray-100 bg-white">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-dal-grey p-2.5 rounded-xl">
                        <MapPin className="w-5 h-5 text-dal-black" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-dal-black">{route.from} → {route.to}</p>
                        <p className="text-xs text-gray-400">Fixed rate: {route.price}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-dal-gold">{route.time}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
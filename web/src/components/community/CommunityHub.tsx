"use client"

import * as React from "react"
import Link from "next/link"
import { AlertTriangle, MapPin, Users, PlusCircle, ChevronRight, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function CommunityHub() {
  return (
    <section className="bg-white rounded-[2rem] shadow-xl shadow-dal-slate/5 overflow-hidden">
      {/* Header with Seamless Gradient */}
      <div className="bg-gradient-to-r from-dal-black to-slate-900 p-5 pt-6 pb-6 text-white flex justify-between items-center relative overflow-hidden">
        <div className="flex items-center gap-3 relative z-10">
           <div className="p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/5">
             <Users className="w-5 h-5 text-dal-gold" />
           </div>
           <div>
             <h2 className="font-bold text-lg leading-none tracking-tight">Community Hub</h2>
             <span className="text-[10px] text-gray-400 font-medium tracking-wider mt-0.5 block">LIVE INTELLIGENCE</span>
           </div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-bold bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-full text-green-400 backdrop-blur-sm">
           <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
           <span>24 ONLINE</span>
        </div>
        
        {/* Background Subtle Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-dal-gold/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none"></div>
      </div>

      <div className="p-5 space-y-6">
         {/* Live Ticker - Seamless Scroll */}
         <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
            {[ 
               { icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50 border-red-100', text: 'Traffic at Eleme Junc.' },
               { icon: PlusCircle, color: 'text-blue-500', bg: 'bg-blue-50 border-blue-100', text: 'New Route: Choba' },
               { icon: MapPin, color: 'text-orange-500', bg: 'bg-orange-50 border-orange-100', text: 'Fare Update: Mile 1' }
            ].map((item, i) => (
               <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-xl whitespace-nowrap border ${item.bg} shadow-sm`}>
                  <item.icon className={`w-3 h-3 ${item.color}`} />
                  <span className="text-[11px] font-bold text-dal-black/80">{item.text}</span>
               </div>
            ))}
         </div>

         {/* Action Cards - Seamless Grid */}
         <div className="grid grid-cols-2 gap-4">
            <Link href="/suggest" className="group">
               <Card className="h-full border-0 bg-dal-grey/50 hover:bg-dal-gold/10 transition-all cursor-pointer shadow-none group-hover:scale-[1.02] duration-300">
                  <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                     <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:shadow-md transition-all">
                        <PlusCircle className="w-6 h-6 text-dal-gold group-hover:scale-110 transition-transform duration-300" />
                     </div>
                     <div>
                        <h3 className="font-bold text-sm text-dal-black">Suggest Route</h3>
                        <p className="text-[10px] text-dal-slate leading-tight mt-1">Add paths & earn points</p>
                     </div>
                  </CardContent>
               </Card>
            </Link>
            
            <Link href="/report" className="group">
               <Card className="h-full border-0 bg-dal-grey/50 hover:bg-red-50 transition-all cursor-pointer shadow-none group-hover:scale-[1.02] duration-300">
                  <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                     <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:shadow-md transition-all">
                        <AlertTriangle className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform duration-300" />
                     </div>
                     <div>
                        <h3 className="font-bold text-sm text-dal-black">Report Issue</h3>
                        <p className="text-[10px] text-dal-slate leading-tight mt-1">Flag traffic or alerts</p>
                     </div>
                  </CardContent>
               </Card>
            </Link>
         </div>

         <Button variant="ghost" className="w-full text-xs font-medium text-center text-dal-slate hover:text-dal-black p-0 h-auto hover:bg-transparent tracking-wide uppercase">
            View All Activity <ChevronRight className="w-3 h-3 ml-1" />
         </Button>
      </div>
    </section>
  )
}
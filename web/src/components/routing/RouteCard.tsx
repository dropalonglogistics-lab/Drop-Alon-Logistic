import * as React from "react"
import { Clock, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export interface RouteCardProps {
  id: string
  from: string
  to: string
  via?: string
  duration: string
  price: number
  segments: string[] 
  isBest?: boolean
}

export function RouteCard({ from, to, via, duration, price, segments, isBest }: RouteCardProps) {
  return (
    <Card className={`mb-3 cursor-pointer hover:border-dal-gold transition-colors ${isBest ? 'border-dal-gold ring-1 ring-dal-gold/20' : ''}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
           <div>
             <div className="flex items-center gap-2">
               <h3 className="font-semibold text-base">{from} <span className="text-gray-400">→</span> {to}</h3>
             </div>
             {via && <p className="text-xs text-muted-foreground mt-0.5">Via {via}</p>}
           </div>
           <div className="text-right">
             <span className="block font-bold text-lg">₦{price}</span>
             {isBest && <span className="text-[10px] uppercase font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">Best</span>}
           </div>
        </div>
        
        <div className="flex justify-between items-end mt-4">
          <div className="flex gap-2 text-xs text-muted-foreground items-center">
             <Clock className="w-3 h-3" />
             <span>{duration}</span>
             <span className="px-1">•</span>
             <div className="flex gap-1">
               {segments.map((seg, i) => (
                 <span key={i} className="bg-gray-100 px-1.5 py-0.5 rounded text-[10px] font-medium">{seg}</span>
               ))}
             </div>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
        </div>
      </CardContent>
    </Card>
  )
}
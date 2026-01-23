import * as React from "react"
import { MapPin, Navigation, Bus, ChevronRight, User } from "lucide-react"

export interface StepByStepProps {
  segments: {
    instructions: string
    duration_min: number
    vehicle: { name: string }
  }[]
}

export function StepByStep({ segments }: StepByStepProps) {
  return (
    <div className="space-y-0 relative before:absolute before:left-[1.35rem] before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-dal-gold before:to-gray-200">
      {segments.map((step, i) => (
        <div key={i} className="flex gap-4 relative group">
           <div className={`z-10 w-11 h-11 rounded-full flex items-center justify-center border-4 border-gray-50 transition-all group-hover:scale-110 shadow-sm ${i === 0 ? 'bg-dal-black text-dal-gold' : 'bg-white text-dal-black'}`}>
              {step.vehicle.name === "Walk" ? <User className="w-5 h-5" /> : <Bus className="w-5 h-5" />}
           </div>
           
           <div className="flex-1 pb-8">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-sm text-dal-black leading-tight">{step.instructions}</h3>
                <span className="text-[10px] font-black text-gray-400 whitespace-nowrap">{step.duration_min} MIN</span>
              </div>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                 via {step.vehicle.name}
                 {i < segments.length - 1 && <ChevronRight className="w-3 h-3 inline" />}
              </p>
           </div>
        </div>
      ))}
      
      {/* End Point */}
      <div className="flex gap-4 relative">
         <div className="z-10 w-11 h-11 rounded-full bg-dal-gold flex items-center justify-center border-4 border-gray-50 shadow-md">
            <MapPin className="w-5 h-5 text-dal-black" />
         </div>
         <div className="flex-1 pt-3">
            <h3 className="font-bold text-sm text-dal-black italic">Arrive at Destination</h3>
         </div>
      </div>
    </div>
  )
}
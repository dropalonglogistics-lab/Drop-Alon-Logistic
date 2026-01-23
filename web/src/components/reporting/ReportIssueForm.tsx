"use client"

import * as React from "react"
import { AlertTriangle, MapPin, Clock, Send, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

const ISSUE_TYPES = [
  { id: 'traffic', label: 'Heavy Traffic', color: 'text-orange-500', bg: 'bg-orange-50' },
  { id: 'accident', label: 'Accident', color: 'text-red-500', bg: 'bg-red-50' },
  { id: 'police', label: 'Police Check', color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 'road_closed', label: 'Road Closed', color: 'text-gray-700', bg: 'bg-gray-100' },
]

export function ReportIssueForm() {
  const [type, setType] = React.useState("")
  const [location, setLocation] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isDone, setIsDone] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsDone(true)
    }, 1500)
  }

  if (isDone) {
    return (
      <Card className="border-green-100 bg-green-50/30">
        <CardContent className="p-8 text-center space-y-4">
           <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
             <CheckCircle2 className="w-8 h-8 text-green-600" />
           </div>
           <h3 className="text-xl font-bold text-green-900">Report Submitted!</h3>
           <p className="text-sm text-green-700">Thank you for helping the community. Your report will be visible to others for the next 2 hours.</p>
           <Button onClick={() => setIsDone(false)} variant="outline" className="border-green-200 text-green-700 hover:bg-green-100">
             Submit Another
           </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-12">
      <div className="grid grid-cols-2 gap-3">
        {ISSUE_TYPES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setType(item.id)}
            className={`p-4 rounded-3xl border-2 transition-all text-left ${
              type === item.id 
                ? 'border-dal-gold bg-dal-gold/5 shadow-inner translate-y-0.5' 
                : 'border-gray-50 bg-white hover:border-gray-200'
            }`}
          >
            <AlertTriangle className={`w-6 h-6 mb-2 ${item.color}`} />
            <span className="text-xs font-bold block">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
          <Input 
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Where is this happening?" 
            className="pl-10 h-12 rounded-2xl border-gray-100 bg-white shadow-sm"
          />
        </div>

        <div className="relative">
          <Clock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
          <textarea 
            className="w-full pl-10 pt-3 min-h-[100px] text-sm rounded-2xl border border-gray-100 bg-white shadow-sm focus:ring-2 focus:ring-dal-gold/20 focus:outline-none placeholder:text-gray-400"
            placeholder="Add more details (optional)..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <Button 
        disabled={!type || !location || isSubmitting}
        className="w-full h-14 bg-dal-black hover:bg-black text-white rounded-2xl text-base font-bold flex gap-2 items-center justify-center shadow-xl disabled:opacity-50"
      >
        {isSubmitting ? "TRANSMITTING..." : (
          <>
            <Send className="w-5 h-5 text-dal-gold" />
            BROADCAST REPORT
          </>
        )}
      </Button>
    </form>
  )
}
"use client"

import * as React from "react"
import { Search, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function RouteSearchForm() {
  const router = useRouter()
  const [from, setFrom] = React.useState("")
  const [to, setTo] = React.useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!from || !to) return
    router.push(`/routes?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`)
  }

  return (
    <Card className="w-full bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
      <CardContent className="p-5">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative group">
            <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-dal-gold group-hover:scale-110 transition-transform" />
            <Input 
              placeholder="Where from?" 
              className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:bg-white/10 transition-all rounded-xl"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div className="relative group">
            <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400 group-hover:scale-110 transition-transform" />
            <Input 
              placeholder="Where to?" 
              className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20 transition-all rounded-xl"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full h-12 bg-dal-gold hover:bg-dal-gold-hover text-dal-black font-black text-base shadow-lg shadow-dal-gold/20 rounded-xl">
             FIND FASTEST ROUTE
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
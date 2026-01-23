'use client'

import * as React from "react";
import { AlertCircle, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { submitFareReport } from "@/app/actions/community";

export function UpdateFareForm({ routeId, currentFare }: { routeId: string, currentFare: number }) {
  // Simplification: We will just rely on standard form submission for now which reloads/redirects
  // In a polished app we would use useFormState
  
  return (
    <Card className="border-0 shadow-lg bg-white overflow-hidden">
      <CardHeader className="bg-red-50/50 border-b border-red-50 pb-4">
        <CardTitle className="flex items-center gap-2 text-base font-bold text-red-600">
          <AlertCircle className="w-5 h-5" />
          Report Price Change
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form action={submitFareReport} className="space-y-4">
          <input type="hidden" name="routeId" value={routeId} />
          
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-gray-400">New Fare Amount (₦)</label>
            <div className="relative">
              <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-600" />
              <Input 
                name="reportedFare"
                type="number" 
                placeholder={currentFare.toString()}
                className="pl-9 h-11 border-gray-200 focus:ring-red-500/20"
                required
              />
            </div>
            <p className="text-[10px] text-gray-400">Current recorded fare: <span className="font-bold text-gray-800">₦{currentFare}</span></p>
          </div>

          <Button type="submit" variant="destructive" className="w-full font-bold shadow-md hover:scale-[1.02] transition-transform">
            Submit Report
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
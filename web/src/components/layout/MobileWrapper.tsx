import * as React from "react"

export default function MobileWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl relative">
      {children}
    </div>
  )
}
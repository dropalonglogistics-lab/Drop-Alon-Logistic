import * as React from "react"

export default function MobileWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen bg-dal-grey dark:bg-dal-black">
      {/* Mobile-first container with desktop responsiveness */}
      <div className="max-w-md mx-auto min-h-screen bg-white dark:bg-dal-black shadow-2xl md:shadow-xl lg:max-w-2xl xl:max-w-4xl relative">
        {children}
      </div>
    </div>
  )
}

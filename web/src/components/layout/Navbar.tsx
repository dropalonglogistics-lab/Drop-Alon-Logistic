import Link from "next/link";
import { Home, Search, AlertCircle, User, PlusCircle, LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-lg border-t border-gray-200 px-6 py-3 flex justify-between items-center z-50 shadow-2xl">
      <Link href="/" className="flex flex-col items-center gap-1 text-dal-gold">
        <Home className="w-6 h-6" />
        <span className="text-[10px] font-bold">Home</span>
      </Link>
      <Link href="/routes" className="flex flex-col items-center gap-1 text-gray-400 hover:text-dal-black transition-colors">
        <Search className="w-6 h-6" />
        <span className="text-[10px] font-medium">Routes</span>
      </Link>
      <Link href="/suggest" className="flex flex-col items-center gap-1 text-gray-400 hover:text-dal-gold transition-colors">
        <PlusCircle className="w-6 h-6" />
        <span className="text-[10px] font-medium">Suggest</span>
      </Link>
      <Link href="/report" className="flex flex-col items-center gap-1 text-gray-400 hover:text-dal-black transition-colors">
        <AlertCircle className="w-6 h-6" />
        <span className="text-[10px] font-medium">Report</span>
      </Link>
      {user ? (
        <Link href="/profile" className="flex flex-col items-center gap-1 text-gray-400 hover:text-dal-black transition-colors">
          <div className="w-6 h-6 rounded-full bg-dal-gold/20 flex items-center justify-center">
            <User className="w-4 h-4 text-dal-gold" />
          </div>
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
      ) : (
        <Link href="/login" className="flex flex-col items-center gap-1 text-gray-400 hover:text-dal-gold transition-colors">
          <LogIn className="w-6 h-6" />
          <span className="text-[10px] font-medium">Login</span>
        </Link>
      )}
    </nav>
  )
}
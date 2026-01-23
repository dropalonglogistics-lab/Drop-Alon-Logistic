import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { User, MapPin, AlertCircle, LogOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/auth/actions";

export default async function ProfilePage() {
  const supabase = await createClient();
  
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    redirect("/login");
  }

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Fetch user''s route suggestions
  const { data: suggestions } = await supabase
    .from("route_suggestions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  // Fetch user''s fare reports
  const { data: fareReports } = await supabase
    .from("fare_reports")
    .select("*, routes(name)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="min-h-screen bg-dal-grey pb-20">
      {/* Header */}
      <div className="bg-dal-black text-white p-6 pt-10 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-dal-gold/20 flex items-center justify-center">
            <User className="w-8 h-8 text-dal-gold" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{profile?.full_name || "User"}</h1>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-dal-gold/10 text-dal-gold text-xs font-bold rounded-full border border-dal-gold/20">
            {profile?.role || "user"}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-lg bg-white rounded-2xl">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-black text-dal-black">{suggestions?.length || 0}</p>
              <p className="text-xs text-dal-slate font-medium mt-1">Route Suggestions</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white rounded-2xl">
            <CardContent className="p-4 text-center">
              <p className="text-3xl font-black text-dal-black">{fareReports?.length || 0}</p>
              <p className="text-xs text-dal-slate font-medium mt-1">Fare Reports</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Suggestions */}
        <Card className="border-0 shadow-lg bg-white rounded-2xl">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <MapPin className="w-4 h-4 text-dal-gold" />
              Your Route Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {suggestions && suggestions.length > 0 ? (
              <div className="space-y-3">
                {suggestions.map((suggestion) => (
                  <div key={suggestion.id} className="p-3 bg-dal-grey rounded-xl">
                    <p className="font-bold text-sm text-dal-black">
                      {suggestion.origin_text} → {suggestion.destination_text}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs text-dal-slate">₦{suggestion.suggested_fare}</span>
                      <span className="text-xs text-dal-slate">•</span>
                      <span className="text-xs text-dal-slate">{suggestion.vehicle_type}</span>
                      <span className="ml-auto text-xs font-bold text-orange-500">{suggestion.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-dal-slate text-center py-4">No suggestions yet</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Fare Reports */}
        <Card className="border-0 shadow-lg bg-white rounded-2xl">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              Your Fare Reports
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {fareReports && fareReports.length > 0 ? (
              <div className="space-y-3">
                {fareReports.map((report: any) => (
                  <div key={report.id} className="p-3 bg-dal-grey rounded-xl">
                    <p className="font-bold text-sm text-dal-black">
                      {report.routes?.name || "Route"}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs text-dal-slate">New fare: ₦{report.reported_fare}</span>
                      <span className="ml-auto text-xs font-bold text-orange-500">{report.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-dal-slate text-center py-4">No reports yet</p>
            )}
          </CardContent>
        </Card>

        {/* Logout Button */}
        <form action={logout}>
          <Button type="submit" variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50 rounded-xl font-bold">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </form>
      </div>
    </div>
  );
}
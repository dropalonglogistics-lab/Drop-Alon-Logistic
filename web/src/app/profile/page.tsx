'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, MapPin, AlertCircle, LogOut, Edit2, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/auth/actions";
import { ProfileEditForm } from "@/components/profile/ProfileEditForm";
import { createClient } from "@/lib/supabase/client";
import Image from 'next/image';

export default function ProfilePage() {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState<any>(null);
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [fareReports, setFareReports] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProfileData();
    }, []);

    const loadProfileData = async () => {
        const supabase = createClient();

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            router.push('/login');
            return;
        }

        // Fetch profile
        const { data: profileData } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

        setProfile({ ...profileData, email: user.email });

        // Fetch user's route suggestions
        const { data: suggestionsData } = await supabase
            .from("route_suggestions")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
            .limit(5);

        setSuggestions(suggestionsData || []);

        // Fetch user's fare reports
        const { data: fareReportsData } = await supabase
            .from("fare_reports")
            .select("*, routes(name)")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
            .limit(5);

        setFareReports(fareReportsData || []);
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-dal-grey dark:bg-dal-black flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dal-gold mx-auto"></div>
                    <p className="mt-4 text-gray-500 dark:text-gray-400">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dal-grey dark:bg-dal-black pb-20">
            {/* Header */}
            <div className="bg-dal-black text-white p-6 pt-10 rounded-b-3xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-dal-gold/20 flex items-center justify-center overflow-hidden">
                            {profile?.avatar_url ? (
                                <Image
                                    src={profile.avatar_url}
                                    alt="Profile"
                                    width={80}
                                    height={80}
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <User className="w-8 h-8 md:w-10 md:h-10 text-dal-gold" />
                            )}
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold">{profile?.full_name || "User"}</h1>
                            <p className="text-sm text-gray-400">{profile?.email}</p>
                            {profile?.phone_number && (
                                <p className="text-sm text-gray-400">{profile.phone_number}</p>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        {isEditing ? (
                            <X className="w-5 h-5 text-white" />
                        ) : (
                            <Edit2 className="w-5 h-5 text-dal-gold" />
                        )}
                    </button>
                </div>
                <div className="flex gap-2">
                    <span className="px-3 py-1 bg-dal-gold/10 text-dal-gold text-xs font-bold rounded-full border border-dal-gold/20">
                        {profile?.role || "user"}
                    </span>
                </div>
            </div>

            <div className="p-4 md:p-6 space-y-6">
                {/* Edit Form */}
                {isEditing && (
                    <Card className="border-0 shadow-lg dark:bg-card dark:text-card-foreground rounded-2xl">
                        <CardHeader className="border-b border-gray-100 dark:border-border">
                            <CardTitle className="text-base font-bold dark:text-white">Edit Profile</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 md:p-6">
                            <ProfileEditForm
                                profile={profile}
                                onCancel={() => setIsEditing(false)}
                                onSuccess={() => {
                                    setIsEditing(false);
                                    loadProfileData();
                                }}
                            />
                        </CardContent>
                    </Card>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <Card className="border-0 shadow-lg bg-white dark:bg-card rounded-2xl">
                        <CardContent className="p-4 text-center">
                            <p className="text-3xl font-black text-dal-black dark:text-white">{suggestions?.length || 0}</p>
                            <p className="text-xs text-dal-slate dark:text-gray-400 font-medium mt-1">Route Suggestions</p>
                        </CardContent>
                    </Card>
                    <Card className="border-0 shadow-lg bg-white dark:bg-card rounded-2xl">
                        <CardContent className="p-4 text-center">
                            <p className="text-3xl font-black text-dal-black dark:text-white">{fareReports?.length || 0}</p>
                            <p className="text-xs text-dal-slate dark:text-gray-400 font-medium mt-1">Fare Reports</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Suggestions */}
                <Card className="border-0 shadow-lg bg-white dark:bg-card rounded-2xl">
                    <CardHeader className="border-b border-gray-100 dark:border-border">
                        <CardTitle className="text-base font-bold flex items-center gap-2 dark:text-white">
                            <MapPin className="w-4 h-4 text-dal-gold" />
                            Your Route Suggestions
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        {suggestions && suggestions.length > 0 ? (
                            <div className="space-y-3">
                                {suggestions.map((suggestion) => (
                                    <div key={suggestion.id} className="p-3 bg-dal-grey dark:bg-muted rounded-xl">
                                        <p className="font-bold text-sm text-dal-black dark:text-white">
                                            {suggestion.origin_text} → {suggestion.destination_text}
                                        </p>
                                        <div className="flex gap-2 mt-2">
                                            <span className="text-xs text-dal-slate dark:text-gray-400">₦{suggestion.suggested_fare}</span>
                                            <span className="text-xs text-dal-slate dark:text-gray-400">•</span>
                                            <span className="text-xs text-dal-slate dark:text-gray-400">{suggestion.vehicle_type}</span>
                                            <span className="ml-auto text-xs font-bold text-orange-500">{suggestion.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-dal-slate dark:text-gray-400 text-center py-4">No suggestions yet</p>
                        )}
                    </CardContent>
                </Card>

                {/* Recent Fare Reports */}
                <Card className="border-0 shadow-lg bg-white dark:bg-card rounded-2xl">
                    <CardHeader className="border-b border-gray-100 dark:border-border">
                        <CardTitle className="text-base font-bold flex items-center gap-2 dark:text-white">
                            <AlertCircle className="w-4 h-4 text-red-500" />
                            Your Fare Reports
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        {fareReports && fareReports.length > 0 ? (
                            <div className="space-y-3">
                                {fareReports.map((report: any) => (
                                    <div key={report.id} className="p-3 bg-dal-grey dark:bg-muted rounded-xl">
                                        <p className="font-bold text-sm text-dal-black dark:text-white">
                                            {report.routes?.name || "Route"}
                                        </p>
                                        <div className="flex gap-2 mt-2">
                                            <span className="text-xs text-dal-slate dark:text-gray-400">New fare: ₦{report.reported_fare}</span>
                                            <span className="ml-auto text-xs font-bold text-orange-500">{report.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-dal-slate dark:text-gray-400 text-center py-4">No reports yet</p>
                        )}
                    </CardContent>
                </Card>

                {/* Logout Button */}
                <form action={logout}>
                    <Button type="submit" variant="outline" className="w-full border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl font-bold">
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
                </form>
            </div>
        </div>
    );
}

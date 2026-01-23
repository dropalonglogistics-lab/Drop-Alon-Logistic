import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AdminDashboardClient from './AdminDashboardClient';

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Check authentication
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }

  // Get user profile to check admin status
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    redirect('/');
  }

  // Fetch all statistics
  const [
    { count: totalRoutes },
    { count: verifiedRoutes },
    { count: totalUsers },
    { count: pendingSuggestions },
    { count: pendingFareReports },
    { data: recentReports },
    { data: routeSuggestions },
    { data: users }
  ] = await Promise.all([
    supabase.from('routes').select('*', { count: 'exact', head: true }),
    supabase.from('routes').select('*', { count: 'exact', head: true }).eq('is_verified', true),
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('route_suggestions').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('fare_reports').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10),
    supabase
      .from('route_suggestions')
      .select(`
        *,
        profiles:user_id (
          full_name,
          email
        )
      `)
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
      .limit(10),
    supabase
      .from('profiles')
      .select('id, full_name, email, role, created_at')
      .order('created_at', { ascending: false })
      .limit(20)
  ]);

  const stats = {
    totalRoutes: totalRoutes || 0,
    verifiedRoutes: verifiedRoutes || 0,
    activeReports: recentReports?.length || 0,
    totalUsers: totalUsers || 0,
    pendingSuggestions: pendingSuggestions || 0,
    pendingFareReports: pendingFareReports || 0
  };

  return (
    <AdminDashboardClient
      stats={stats}
      recentReports={recentReports || []}
      routeSuggestions={routeSuggestions || []}
      users={users || []}
    />
  );
}

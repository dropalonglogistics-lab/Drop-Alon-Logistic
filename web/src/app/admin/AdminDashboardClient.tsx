'use client'

import * as React from 'react';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  Users, 
  AlertTriangle, 
  Menu,
  X,
  CheckCircle2,
  XCircle,
  Clock,
  Shield,
  Loader2
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { updateUserRole } from '@/app/actions/admin-actions';

interface RouteReport {
  id: string;
  reported_fare: number;
  status: string;
  created_at: string;
  description: string | null;
  report_type: string | null;
  routes: { name: string } | null;
}

interface RouteSuggestion {
  id: string;
  origin_text: string;
  destination_text: string;
  suggested_fare: number;
  vehicle_type: string;
  status: string;
  instructions: string | null;
  created_at: string;
  profiles: { full_name: string | null; email: string | null } | null;
}

interface UserProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  role: string;
  created_at: string;
}

interface AdminDashboardClientProps {
  stats: {
    totalRoutes: number;
    verifiedRoutes: number;
    activeReports: number;
    totalUsers: number;
    pendingSuggestions: number;
    pendingFareReports: number;
  };
  recentReports: RouteReport[];
  routeSuggestions: RouteSuggestion[];
  users: UserProfile[];
}

export default function AdminDashboardClient({
  stats,
  recentReports,
  routeSuggestions,
  users
}: AdminDashboardClientProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('overview');
  const [loadingUserId, setLoadingUserId] = React.useState<string | null>(null);

  const handleRoleChange = async (userId: string, newRole: 'admin' | 'user') => {
    setLoadingUserId(userId);
    try {
      const result = await updateUserRole(userId, newRole);
      if (result.error) {
        alert('Error: ' + result.error);
      } else {
        // Refresh the page to show updated data
        window.location.reload();
      }
    } catch (err) {
      alert('Failed to update role');
      console.error(err);
    } finally {
      setLoadingUserId(null);
    }
  };

  return (
    <div className='flex min-h-screen bg-dal-grey'>
      {/* Mobile Header */}
      <div className='md:hidden fixed top-0 left-0 right-0 bg-dal-black text-white p-4 flex items-center justify-between z-50 shadow-lg'>
        <h1 className='text-lg font-black'>DAL <span className='text-dal-gold'>ADMIN</span></h1>
        <Button variant='ghost' size='icon' onClick={() => setSidebarOpen(!sidebarOpen)} className='text-white'>
          {sidebarOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 h-screen w-64 bg-dal-black text-white p-6 z-40
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className='mb-8 hidden md:block'>
          <h1 className='text-xl font-black italic'>DAL <span className='text-dal-gold'>ADMIN</span></h1>
        </div>
        
        <nav className='space-y-2 flex-1 mt-16 md:mt-0'>
          <Button 
            variant='ghost' 
            onClick={() => setActiveTab('overview')}
            className={`w-full justify-start rounded-xl ${
              activeTab === 'overview' 
                ? 'text-dal-gold bg-white/10' 
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className='w-4 h-4 mr-3' />
            Overview
          </Button>
          <Button 
            variant='ghost'
            onClick={() => setActiveTab('suggestions')}
            className={`w-full justify-start rounded-xl ${
              activeTab === 'suggestions' 
                ? 'text-dal-gold bg-white/10' 
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <MapIcon className='w-4 h-4 mr-3' />
            Route Suggestions
          </Button>
          <Button 
            variant='ghost'
            onClick={() => setActiveTab('users')}
            className={`w-full justify-start rounded-xl ${
              activeTab === 'users' 
                ? 'text-dal-gold bg-white/10' 
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className='w-4 h-4 mr-3' />
            User Management
          </Button>
          <Button 
            variant='ghost'
            onClick={() => setActiveTab('reports')}
            className={`w-full justify-start rounded-xl ${
              activeTab === 'reports' 
                ? 'text-dal-gold bg-white/10' 
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <AlertTriangle className='w-4 h-4 mr-3' />
            Reports
          </Button>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className='fixed inset-0 bg-black/50 z-30 md:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className='flex-1 p-4 md:p-8 overflow-y-auto mt-16 md:mt-0'>
        {activeTab === 'overview' && (
          <>
            <header className='mb-8'>
              <h2 className='text-2xl font-bold text-dal-black'>Intelligence Overview</h2>
              <p className='text-sm text-dal-slate'>Real-time status of the transport network</p>
            </header>

            {/* Stats Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8'>
              {[
                { 
                  label: 'Total Routes', 
                  value: stats.totalRoutes.toString(), 
                  subtitle: `${stats.verifiedRoutes} verified`, 
                  icon: MapIcon 
                },
                { 
                  label: 'Active Reports', 
                  value: stats.activeReports.toString(), 
                  subtitle: 'Last 24 hours', 
                  icon: AlertTriangle, 
                  color: 'text-red-500' 
                },
                { 
                  label: 'Total Users', 
                  value: stats.totalUsers.toString(), 
                  subtitle: 'Registered', 
                  icon: Users 
                },
                { 
                  label: 'Pending Suggestions', 
                  value: stats.pendingSuggestions.toString(), 
                  subtitle: 'Awaiting review', 
                  icon: Clock, 
                  color: 'text-orange-500' 
                },
                { 
                  label: 'Pending Fare Reports', 
                  value: stats.pendingFareReports.toString(), 
                  subtitle: 'Awaiting review', 
                  icon: Clock, 
                  color: 'text-blue-500' 
                }
              ].map((stat, i) => (
                <Card key={i} className='border-0 shadow-lg bg-white rounded-2xl'>
                  <CardContent className='p-6'>
                    <div className='flex justify-between items-start'>
                      <div>
                        <p className='text-xs font-bold text-dal-slate uppercase tracking-wider mb-1'>{stat.label}</p>
                        <h4 className='text-3xl font-black text-dal-black'>{stat.value}</h4>
                        <span className='text-[10px] text-gray-500 font-medium mt-1 block'>{stat.subtitle}</span>
                      </div>
                      <div className={`p-3 bg-dal-grey rounded-2xl ${stat.color || 'text-dal-gold'}`}>
                        <stat.icon className='w-6 h-6' />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {activeTab === 'suggestions' && (
          <>
            <header className='mb-8'>
              <h2 className='text-2xl font-bold text-dal-black'>Route Suggestions</h2>
              <p className='text-sm text-dal-slate'>Review and approve community route suggestions</p>
            </header>

            <Card className='border-0 shadow-lg bg-white rounded-2xl'>
              <CardContent className='p-6'>
                {routeSuggestions.length === 0 ? (
                  <p className='text-center text-dal-slate py-8'>No pending suggestions</p>
                ) : (
                  <div className='space-y-4'>
                    {routeSuggestions.map((suggestion: RouteSuggestion) => (
                      <div key={suggestion.id} className='border border-gray-200 rounded-xl p-4'>
                        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                          <div className='flex-1'>
                            <h3 className='font-bold text-dal-black'>{suggestion.origin_text} to {suggestion.destination_text}</h3>
                            <p className='text-sm text-dal-slate mt-1'>
                              Route Suggestion via {suggestion.vehicle_type}
                            </p>
                            <p className='text-xs text-gray-500 mt-2'>
                              Submitted by: {suggestion.profiles?.full_name || suggestion.profiles?.email || 'Unknown'}
                            </p>
                            {suggestion.instructions && (
                              <p className='text-sm text-gray-600 mt-2'>{suggestion.instructions}</p>
                            )}
                          </div>
                          <div className='flex gap-2'>
                            <Button 
                              size='sm' 
                              className='bg-green-500 hover:bg-green-600 text-white rounded-xl'
                            >
                              <CheckCircle2 className='w-4 h-4 mr-1' />
                              Approve
                            </Button>
                            <Button 
                              size='sm' 
                              variant='outline'
                              className='border-red-500 text-red-500 hover:bg-red-50 rounded-xl'
                            >
                              <XCircle className='w-4 h-4 mr-1' />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'users' && (
          <>
            <header className='mb-8'>
              <h2 className='text-2xl font-bold text-dal-black'>User Management</h2>
              <p className='text-sm text-dal-slate'>Manage registered users</p>
            </header>

            <Card className='border-0 shadow-lg bg-white rounded-2xl'>
              <CardContent className='p-0'>
                <div className='overflow-x-auto'>
                  <Table>
                    <TableHeader>
                      <TableRow className='bg-dal-grey/50 hover:bg-dal-grey/50'>
                        <TableHead className='font-bold'>Name</TableHead>
                        <TableHead className='font-bold'>Email</TableHead>
                        <TableHead className='font-bold'>Role</TableHead>
                        <TableHead className='font-bold'>Joined</TableHead>
                        <TableHead className='font-bold text-right'>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user: UserProfile) => (
                        <TableRow key={user.id} className='hover:bg-dal-grey/30'>
                          <TableCell className='font-medium'>{user.full_name || 'N/A'}</TableCell>
                          <TableCell className='text-sm'>{user.email}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                              user.role === 'admin' 
                                ? 'bg-dal-gold/20 text-dal-gold' 
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {user.role || 'user'}
                            </span>
                          </TableCell>
                          <TableCell className='text-sm text-dal-slate'>
                            {new Date(user.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell className='text-right'>
                            {loadingUserId === user.id ? (
                              <Loader2 className='w-4 h-4 animate-spin inline-block' />
                            ) : user.role === 'admin' ? (
                              <Button
                                size='sm'
                                variant='outline'
                                onClick={() => handleRoleChange(user.id, 'user')}
                                className='text-xs border-gray-300 hover:bg-gray-50 rounded-xl'
                              >
                                <Shield className='w-3 h-3 mr-1' />
                                Demote
                              </Button>
                            ) : (
                              <Button
                                size='sm'
                                onClick={() => handleRoleChange(user.id, 'admin')}
                                className='text-xs bg-dal-gold hover:bg-dal-gold/90 text-dal-black rounded-xl'
                              >
                                <Shield className='w-3 h-3 mr-1' />
                                Promote
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'reports' && (
          <>
            <header className='mb-8'>
              <h2 className='text-2xl font-bold text-dal-black'>Recent Reports</h2>
              <p className='text-sm text-dal-slate'>User-submitted reports and issues</p>
            </header>

            <Card className='border-0 shadow-lg bg-white rounded-2xl'>
              <CardContent className='p-6'>
                {recentReports.length === 0 ? (
                  <p className='text-center text-dal-slate py-8'>No recent reports</p>
                ) : (
                  <div className='space-y-4'>
                    {recentReports.map((report: RouteReport) => (
                      <div key={report.id} className='border border-gray-200 rounded-xl p-4'>
                        <div className='flex items-start justify-between'>
                          <div>
                            <span className='px-2 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-bold'>
                              {report.report_type || 'General'}
                            </span>
                            <p className='text-sm text-dal-slate mt-2'>
                              {report.description || 'No description provided'}
                            </p>
                            <p className='text-xs text-gray-500 mt-2'>
                              {new Date(report.created_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}




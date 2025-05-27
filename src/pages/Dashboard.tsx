
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, LogOut, Settings, User, Crown, Shield, BarChart3, Zap, Database, Globe, FileText, Calendar, TrendingUp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { User as SupabaseUser, Session } from '@supabase/supabase-js';

const Dashboard = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<'admin' | 'user'>('user');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session?.user) {
          navigate('/auth');
        } else {
          // Check user role - for demo purposes, admin is determined by email domain
          const isAdmin = session.user.email?.includes('@extrox.dev') || 
                          session.user.email?.includes('@admin.') ||
                          session.user.user_metadata?.role === 'admin';
          setUserRole(isAdmin ? 'admin' : 'user');
        }
        setIsLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate('/auth');
      } else {
        // Check user role
        const isAdmin = session.user.email?.includes('@extrox.dev') || 
                        session.user.email?.includes('@admin.') ||
                        session.user.user_metadata?.role === 'admin';
        setUserRole(isAdmin ? 'admin' : 'user');
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Signed Out",
        description: "You have been signed out successfully.",
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Sign Out Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth page
  }

  const userName = user.user_metadata?.full_name || 
                   `${user.user_metadata?.first_name || ''} ${user.user_metadata?.last_name || ''}`.trim() ||
                   user.email?.split('@')[0] || 
                   'User';

  const userInitials = user.user_metadata?.first_name?.[0]?.toUpperCase() + 
                       user.user_metadata?.last_name?.[0]?.toUpperCase() ||
                       user.email?.[0]?.toUpperCase() || 
                       'U';

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-10" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-emerald-500/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-400/5 rounded-full blur-3xl" />

      {/* Header */}
      <header className="relative border-b border-gray-800/30 bg-black/60 backdrop-blur-xl z-50">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Code className="w-4 h-4 text-black" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Extrox.dev</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/30">
                <span className="text-emerald-400 font-semibold text-sm">{userInitials}</span>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-white font-medium text-sm">{userName}</p>
                <div className="flex items-center space-x-2">
                  {userRole === 'admin' ? (
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs px-2 py-0">
                      <Crown className="w-3 h-3 mr-1" />
                      Admin
                    </Badge>
                  ) : (
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs px-2 py-0">
                      <User className="w-3 h-3 mr-1" />
                      User
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            <Button
              onClick={handleSignOut}
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-gray-800/50 font-medium px-4 py-2 h-9"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Welcome back, {userName.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-400 text-lg">
            {userRole === 'admin' 
              ? 'Manage your platform and monitor all user activities from your admin dashboard.'
              : 'Continue building amazing projects with your AI development team.'
            }
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-gray-900/40 border-gray-700/40 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400">
              Overview
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400">
              Projects
            </TabsTrigger>
            {userRole === 'admin' && (
              <TabsTrigger value="admin" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400">
                Admin Panel
              </TabsTrigger>
            )}
            <TabsTrigger value="settings" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-900/40 border-gray-700/40 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">Total Projects</p>
                      <p className="text-2xl font-bold text-white">12</p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-emerald-400" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-green-400">+2 this month</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/40 border-gray-700/40 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">Active Deployments</p>
                      <p className="text-2xl font-bold text-white">8</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Globe className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-green-400">100% uptime</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/40 border-gray-700/40 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">API Requests</p>
                      <p className="text-2xl font-bold text-white">1.2k</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-purple-400" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-green-400">+15% from last week</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/40 border-gray-700/40 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">Database Queries</p>
                      <p className="text-2xl font-bold text-white">890</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <Database className="w-6 h-6 text-orange-400" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-green-400">Optimized performance</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-gray-900/40 border-gray-700/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-emerald-400" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-800/40 rounded-lg">
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                      <Code className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">New project created</p>
                      <p className="text-gray-400 text-xs">E-commerce Dashboard - 2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-800/40 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Globe className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">Deployment successful</p>
                      <p className="text-gray-400 text-xs">Portfolio Website - 5 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-800/40 rounded-lg">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <Database className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">Database updated</p>
                      <p className="text-gray-400 text-xs">User management system - 1 day ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/40 border-gray-700/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-emerald-400" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <Code className="w-4 h-4 mr-2" />
                    Create New Project
                  </Button>
                  
                  <Button className="w-full justify-start bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    <Globe className="w-4 h-4 mr-2" />
                    Deploy to Production
                  </Button>
                  
                  <Button className="w-full justify-start bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/30">
                    <Database className="w-4 h-4 mr-2" />
                    Manage Database
                  </Button>
                  
                  <Button className="w-full justify-start bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card className="bg-gray-900/40 border-gray-700/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Your Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Code className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No Projects Yet</h3>
                  <p className="text-gray-400 mb-6">Start building your first AI-powered application</p>
                  <Link to="/">
                    <Button className="bg-emerald-500 hover:bg-emerald-600 text-black">
                      Create Your First Project
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {userRole === 'admin' && (
            <TabsContent value="admin" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-gray-900/40 border-gray-700/40 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <User className="w-5 h-5 mr-2 text-emerald-400" />
                      User Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 text-sm mb-4">Manage users, roles, and permissions</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Total Users:</span>
                        <span className="text-white font-semibold">1,234</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Active Today:</span>
                        <span className="text-white font-semibold">89</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">New This Week:</span>
                        <span className="text-white font-semibold">23</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30">
                      Manage Users
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/40 border-gray-700/40 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-emerald-400" />
                      System Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 text-sm mb-4">Monitor system performance and usage</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Server Load:</span>
                        <span className="text-green-400 font-semibold">23%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Memory Usage:</span>
                        <span className="text-yellow-400 font-semibold">67%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Uptime:</span>
                        <span className="text-green-400 font-semibold">99.9%</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30">
                      View Analytics
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/40 border-gray-700/40 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-emerald-400" />
                      Security & Logs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 text-sm mb-4">Monitor security events and system logs</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Failed Logins:</span>
                        <span className="text-red-400 font-semibold">3</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Active Sessions:</span>
                        <span className="text-white font-semibold">156</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Security Score:</span>
                        <span className="text-green-400 font-semibold">98/100</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30">
                      View Security Logs
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gray-900/40 border-gray-700/40 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gray-800/40 rounded-lg">
                      <div className="w-3 h-3 bg-green-400 rounded-full mx-auto mb-2"></div>
                      <p className="text-white font-medium">API Gateway</p>
                      <p className="text-green-400 text-sm">Operational</p>
                    </div>
                    <div className="text-center p-4 bg-gray-800/40 rounded-lg">
                      <div className="w-3 h-3 bg-green-400 rounded-full mx-auto mb-2"></div>
                      <p className="text-white font-medium">Database</p>
                      <p className="text-green-400 text-sm">Operational</p>
                    </div>
                    <div className="text-center p-4 bg-gray-800/40 rounded-lg">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full mx-auto mb-2"></div>
                      <p className="text-white font-medium">Auth Service</p>
                      <p className="text-yellow-400 text-sm">Degraded</p>
                    </div>
                    <div className="text-center p-4 bg-gray-800/40 rounded-lg">
                      <div className="w-3 h-3 bg-green-400 rounded-full mx-auto mb-2"></div>
                      <p className="text-white font-medium">File Storage</p>
                      <p className="text-green-400 text-sm">Operational</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-gray-900/40 border-gray-700/40 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-emerald-400" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-white font-semibold">Profile Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-1">Full Name</label>
                        <p className="text-white bg-gray-800/40 p-3 rounded-lg">{userName}</p>
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-1">Email</label>
                        <p className="text-white bg-gray-800/40 p-3 rounded-lg">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-white font-semibold">Account Type</h3>
                    <div className="flex items-center space-x-3">
                      {userRole === 'admin' ? (
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-3 py-2">
                          <Crown className="w-4 h-4 mr-2" />
                          Administrator Account
                        </Badge>
                      ) : (
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-3 py-2">
                          <User className="w-4 h-4 mr-2" />
                          Standard User Account
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-white font-semibold">Account Actions</h3>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="outline" className="border-gray-600/40 text-white hover:bg-gray-800/40">
                        Change Password
                      </Button>
                      <Button variant="outline" className="border-gray-600/40 text-white hover:bg-gray-800/40">
                        Update Profile
                      </Button>
                      <Button variant="outline" className="border-red-600/40 text-red-400 hover:bg-red-500/10">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;

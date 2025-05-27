
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Globe, 
  Database, 
  Zap, 
  FileText, 
  BarChart3, 
  TrendingUp,
  Calendar,
  MessageSquare,
  Users,
  Server,
  Activity
} from "lucide-react";
import { Link } from "react-router-dom";
import type { Database as DatabaseType } from '@/integrations/supabase/types';

type UserRole = DatabaseType['public']['Enums']['app_role'];

interface DashboardOverviewProps {
  userRole: UserRole;
}

export function DashboardOverview({ userRole }: DashboardOverviewProps) {
  const isAdmin = userRole === 'admin';

  return (
    <div className="p-6 space-y-8">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-10" />
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-emerald-500/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-400/5 rounded-full blur-3xl" />

      <div className="relative">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Dashboard Overview
          </h1>
          <p className="text-gray-400 text-lg">
            {isAdmin 
              ? 'Monitor your platform and manage all user activities from your admin dashboard.'
              : 'Continue building amazing projects with your AI development team.'
            }
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                <Activity className="w-4 h-4 text-green-400 mr-1" />
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
                <Server className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400">Optimized performance</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Activity */}
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

          {/* Quick Actions */}
          <Card className="bg-gray-900/40 border-gray-700/40 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-emerald-400" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/dashboard/chat">
                <Button className="w-full justify-start bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Start New Chat
                </Button>
              </Link>
              
              <Link to="/dashboard/projects">
                <Button className="w-full justify-start bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  <Code className="w-4 h-4 mr-2" />
                  Create New Project
                </Button>
              </Link>
              
              <Link to="/dashboard/deployments">
                <Button className="w-full justify-start bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  <Globe className="w-4 h-4 mr-2" />
                  Deploy to Production
                </Button>
              </Link>
              
              <Link to="/dashboard/analytics">
                <Button className="w-full justify-start bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Admin Panel for Admin Users */}
        {isAdmin && (
          <Card className="bg-gray-900/40 border-gray-700/40 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Users className="w-5 h-5 mr-2 text-emerald-400" />
                Admin Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-800/40 rounded-lg">
                  <div className="text-2xl font-bold text-white mb-1">1,234</div>
                  <p className="text-gray-400 text-sm">Total Users</p>
                  <Badge className="mt-2 bg-green-500/20 text-green-400 border-green-500/30">
                    +12% this month
                  </Badge>
                </div>
                <div className="text-center p-4 bg-gray-800/40 rounded-lg">
                  <div className="text-2xl font-bold text-white mb-1">89</div>
                  <p className="text-gray-400 text-sm">Active Today</p>
                  <Badge className="mt-2 bg-blue-500/20 text-blue-400 border-blue-500/30">
                    +5% from yesterday
                  </Badge>
                </div>
                <div className="text-center p-4 bg-gray-800/40 rounded-lg">
                  <div className="text-2xl font-bold text-white mb-1">99.9%</div>
                  <p className="text-gray-400 text-sm">System Uptime</p>
                  <Badge className="mt-2 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    All systems operational
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

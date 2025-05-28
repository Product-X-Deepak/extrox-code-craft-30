
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Database, Activity, Users, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage your AI development platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">247</div>
              <p className="text-xs text-green-400">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Daily Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,429</div>
              <p className="text-xs text-blue-400">API calls today</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-purple-400">Online now</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">System Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">All systems operational</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Model Providers */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Model Providers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <div>
                  <div className="font-medium">OpenAI</div>
                  <div className="text-xs text-gray-400">GPT-4, GPT-3.5</div>
                </div>
                <Badge className="bg-green-500/20 text-green-400">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <div>
                  <div className="font-medium">Anthropic</div>
                  <div className="text-xs text-gray-400">Claude 3</div>
                </div>
                <Badge className="bg-gray-500/20 text-gray-400">Inactive</Badge>
              </div>
              <Button variant="outline" className="w-full mt-4">
                <Settings className="w-4 h-4 mr-2" />
                Manage Providers
              </Button>
            </CardContent>
          </Card>

          {/* User Tiers */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                User Tiers & Limits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-gray-800/50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Free Tier</span>
                  <Badge variant="outline">10/day</Badge>
                </div>
                <div className="text-xs text-gray-400">Basic access to frontend engineer</div>
              </div>
              <div className="p-3 bg-gray-800/50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Premium</span>
                  <Badge variant="outline">50/day</Badge>
                </div>
                <div className="text-xs text-gray-400">All engineers + advanced models</div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                <Database className="w-4 h-4 mr-2" />
                Configure Tiers
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Analytics */}
        <Card className="bg-gray-900/50 border-gray-700 mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Platform Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-gray-400 mb-1">Avg. Time to Plan</div>
                <div className="text-xl font-semibold">2.3s</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Completion Rate</div>
                <div className="text-xl font-semibold">94.2%</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">User Satisfaction</div>
                <div className="text-xl font-semibold">4.8/5</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};


import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Home, 
  MessageSquare, 
  Code, 
  Settings, 
  User, 
  LogOut, 
  Crown,
  BarChart3,
  FileText,
  Database,
  Globe,
  Zap,
  Plus,
  Search,
  CreditCard,
  HelpCircle
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { User as SupabaseUser } from '@supabase/supabase-js';
import type { Database as DatabaseType } from '@/integrations/supabase/types';

type UserRole = DatabaseType['public']['Enums']['app_role'];

interface AppSidebarProps {
  user: SupabaseUser;
  userRole: UserRole;
}

export function AppSidebar({ user, userRole }: AppSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const userName = user.user_metadata?.full_name || 
                   `${user.user_metadata?.first_name || ''} ${user.user_metadata?.last_name || ''}`.trim() ||
                   user.email?.split('@')[0] || 
                   'User';

  const userInitials = user.user_metadata?.first_name?.[0]?.toUpperCase() + 
                       user.user_metadata?.last_name?.[0]?.toUpperCase() ||
                       user.email?.[0]?.toUpperCase() || 
                       'U';

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

  const mainNavItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Start New Chat",
      url: "/dashboard/chat",
      icon: MessageSquare,
    },
    {
      title: "Projects",
      url: "/dashboard/projects",
      icon: Code,
      subItems: [
        { title: "All Projects", url: "/dashboard/projects" },
        { title: "Active Deployments", url: "/dashboard/projects/deployments" },
        { title: "Templates", url: "/dashboard/projects/templates" },
      ]
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: BarChart3,
    },
    {
      title: "Database",
      url: "/dashboard/database",
      icon: Database,
    },
    {
      title: "Deployments",
      url: "/dashboard/deployments",
      icon: Globe,
    },
  ];

  const bottomNavItems = [
    {
      title: "Documentation",
      url: "/dashboard/docs",
      icon: FileText,
    },
    {
      title: "Help Center",
      url: "/dashboard/help",
      icon: HelpCircle,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ];

  const adminNavItems = userRole === 'admin' ? [
    {
      title: "Admin Panel",
      url: "/dashboard/admin",
      icon: Crown,
      subItems: [
        { title: "User Management", url: "/dashboard/admin/users" },
        { title: "System Analytics", url: "/dashboard/admin/analytics" },
        { title: "Security Logs", url: "/dashboard/admin/security" },
      ]
    },
  ] : [];

  return (
    <Sidebar variant="inset" className="border-r border-gray-800/30">
      <SidebarHeader className="p-4">
        <Link to="/dashboard" className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Code className="w-4 h-4 text-black" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">Extrox.dev</span>
        </Link>
        
        <Button 
          className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-black font-medium"
          onClick={() => navigate('/dashboard/chat')}
        >
          <Plus className="w-4 h-4 mr-2" />
          Start New Chat
        </Button>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider">
            Your Chats
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="p-3 text-center">
              <p className="text-gray-500 text-sm">No previous conversations</p>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="bg-gray-800/30" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="text-gray-300 hover:text-white hover:bg-gray-800/50"
                  >
                    <Link to={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.subItems && (
                    <SidebarMenuSub>
                      {item.subItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton 
                            asChild 
                            isActive={location.pathname === subItem.url}
                          >
                            <Link to={subItem.url}>{subItem.title}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
              
              {adminNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
                  >
                    <Link to={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.subItems && (
                    <SidebarMenuSub>
                      {item.subItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton 
                            asChild 
                            isActive={location.pathname === subItem.url}
                          >
                            <Link to={subItem.url}>{subItem.title}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="bg-gray-800/30" />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="text-gray-300 hover:text-white hover:bg-gray-800/50"
                  >
                    <Link to={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-800/30">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/30">
            <span className="text-emerald-400 font-semibold text-sm">{userInitials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium text-sm truncate">{userName}</p>
            <div className="flex items-center space-x-2">
              {userRole === 'admin' ? (
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs px-2 py-0">
                  <Crown className="w-3 h-3 mr-1" />
                  Admin
                </Badge>
              ) : (
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs px-2 py-0">
                  <User className="w-3 h-3 mr-1" />
                  Personal Plan
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-gray-300 hover:text-white hover:bg-gray-800/50">
              <Zap className="w-4 h-4" />
              <span>Get free tokens</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-gray-300 hover:text-white hover:bg-gray-800/50">
              <CreditCard className="w-4 h-4" />
              <span>My Subscription</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={handleSignOut}
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

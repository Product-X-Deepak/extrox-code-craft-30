
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Plus, 
  Clock, 
  FolderOpen, 
  Users, 
  Settings, 
  HelpCircle, 
  CreditCard,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useProjects } from "@/hooks/useProjects";
import { useUserData } from "@/hooks/useUserData";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AppSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ isCollapsed, onToggle }: AppSidebarProps) {
  const [activeSection, setActiveSection] = useState("recents");
  const { user } = useAuth();
  const { projects, isLoading } = useProjects();
  const { profile, subscription } = useUserData();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign out.",
        variant: "destructive",
      });
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  const displayProjects = projects?.slice(0, 3) || [];

  return (
    <div className={`fixed left-0 top-0 h-full bg-gray-900/98 border-r border-gray-700/50 backdrop-blur-xl shadow-2xl transition-all duration-300 ease-in-out z-50 flex flex-col ${
      isCollapsed ? 'w-16' : 'w-80'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700/30">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/25">
                <MessageSquare className="w-4 h-4 text-black" />
              </div>
              <div>
                <h2 className="text-white font-semibold text-sm">Extrox.dev</h2>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 text-xs px-2 py-0">
                    {subscription?.plan_type || 'Trial'}
                  </Badge>
                </div>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-gray-400 hover:text-white hover:bg-gray-800/60 p-1.5 h-8 w-8 rounded-md transition-colors"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>

        {!isCollapsed && (
          <Button className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold h-9 shadow-lg shadow-emerald-500/20 transition-all">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        )}
        
        {isCollapsed && (
          <Button className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold h-9 shadow-lg shadow-emerald-500/20 transition-all p-0">
            <Plus className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        {!isCollapsed ? (
          <div className="p-4 space-y-6">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full bg-gray-800/50 border border-gray-600/50 rounded-lg px-3 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
              />
            </div>

            {/* Quick Actions */}
            <div className="space-y-1">
              <button
                onClick={() => setActiveSection("recents")}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeSection === "recents" 
                    ? "bg-emerald-500/15 text-emerald-400 shadow-sm" 
                    : "text-gray-300 hover:text-white hover:bg-gray-800/60"
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Recent Projects</span>
              </button>
              
              <button
                onClick={() => setActiveSection("projects")}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeSection === "projects" 
                    ? "bg-emerald-500/15 text-emerald-400 shadow-sm" 
                    : "text-gray-300 hover:text-white hover:bg-gray-800/60"
                }`}
              >
                <FolderOpen className="w-4 h-4" />
                <span>All Projects</span>
              </button>

              <button
                onClick={() => setActiveSection("team")}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeSection === "team" 
                    ? "bg-emerald-500/15 text-emerald-400 shadow-sm" 
                    : "text-gray-300 hover:text-white hover:bg-gray-800/60"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Team</span>
              </button>
            </div>

            <Separator className="bg-gray-700/50" />

            {/* Project List */}
            <div className="space-y-3">
              <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                {activeSection === "recents" ? "Recent Projects" : 
                 activeSection === "projects" ? "All Projects" : "Team Projects"}
              </h3>
              
              <div className="space-y-1">
                {isLoading ? (
                  <div className="text-gray-500 text-sm">Loading projects...</div>
                ) : displayProjects.length > 0 ? (
                  displayProjects.map((project) => (
                    <button
                      key={project.id}
                      className="w-full text-left px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/60 text-sm transition-all group"
                    >
                      <div className="truncate font-medium group-hover:text-emerald-400 transition-colors">{project.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {formatTimeAgo(project.created_at)}
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-gray-500 text-sm px-3 py-2">No projects yet</div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-2 space-y-2 mt-4">
            <Button
              variant="ghost"
              size="sm"
              className="w-full h-10 text-gray-400 hover:text-white hover:bg-gray-800/60 rounded-lg transition-all"
              onClick={() => setActiveSection("recents")}
            >
              <Clock className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full h-10 text-gray-400 hover:text-white hover:bg-gray-800/60 rounded-lg transition-all"
              onClick={() => setActiveSection("projects")}
            >
              <FolderOpen className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full h-10 text-gray-400 hover:text-white hover:bg-gray-800/60 rounded-lg transition-all"
              onClick={() => setActiveSection("team")}
            >
              <Users className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700/30 space-y-2">
        {!isCollapsed ? (
          <>
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/60 text-sm transition-all">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/60 text-sm transition-all">
              <HelpCircle className="w-4 h-4" />
              <span>Help Center</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/60 text-sm transition-all">
              <CreditCard className="w-4 h-4" />
              <span>Billing</span>
            </button>
            <Separator className="bg-gray-700/50" />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/25">
                  <User className="w-3.5 h-3.5 text-black" />
                </div>
                <div className="text-xs">
                  <div className="text-white font-medium">
                    {profile?.first_name || user?.email?.split('@')[0] || 'User'}
                  </div>
                  <div className="text-gray-400">{subscription?.plan_type || 'Trial'} Plan</div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-gray-400 hover:text-white hover:bg-gray-800/60 p-1.5 h-7 w-7 rounded-md transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
              </Button>
            </div>
          </>
        ) : (
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full h-9 text-gray-400 hover:text-white hover:bg-gray-800/60 rounded-lg transition-all"
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="w-full h-9 text-gray-400 hover:text-white hover:bg-gray-800/60 rounded-lg transition-all"
            >
              <LogOut className="w-4 h-4" />
            </Button>
            <div className="flex justify-center pt-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/25">
                <User className="w-4 h-4 text-black" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

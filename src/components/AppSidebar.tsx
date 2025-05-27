
import { useState } from "react";
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

interface AppSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ isCollapsed, onToggle }: AppSidebarProps) {
  const [activeSection, setActiveSection] = useState("recents");

  const recentProjects = [
    "Web Application",
    "Mobile App", 
    "API Service",
    "Database Schema"
  ];

  return (
    <div className={`bg-gray-900/95 border-r border-gray-700/50 backdrop-blur-sm transition-all duration-300 flex flex-col h-full ${
      isCollapsed ? 'w-16' : 'w-80'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700/50">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-black" />
              </div>
              <div>
                <h2 className="text-white font-semibold text-sm">Extrox.dev</h2>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs px-2 py-0">
                    Pro
                  </Badge>
                </div>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-gray-400 hover:text-white hover:bg-gray-800/50 p-1 h-8 w-8"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>

        {!isCollapsed && (
          <Button className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold h-9">
            <Plus className="w-4 h-4 mr-2" />
            New Project
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
                className="w-full bg-gray-800/40 border border-gray-600/40 rounded-lg px-3 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <button
                onClick={() => setActiveSection("recents")}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === "recents" 
                    ? "bg-emerald-500/10 text-emerald-400" 
                    : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Recent Projects</span>
              </button>
              
              <button
                onClick={() => setActiveSection("projects")}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === "projects" 
                    ? "bg-emerald-500/10 text-emerald-400" 
                    : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                <FolderOpen className="w-4 h-4" />
                <span>All Projects</span>
              </button>

              <button
                onClick={() => setActiveSection("team")}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === "team" 
                    ? "bg-emerald-500/10 text-emerald-400" 
                    : "text-gray-300 hover:text-white hover:bg-gray-800/50"
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
                {recentProjects.map((project, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 text-sm transition-colors"
                  >
                    <div className="truncate">{project}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {Math.floor(Math.random() * 7) + 1} days ago
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-2 space-y-2 mt-4">
            <Button
              variant="ghost"
              size="sm"
              className="w-full h-10 text-gray-400 hover:text-white hover:bg-gray-800/50"
              onClick={() => setActiveSection("recents")}
            >
              <Clock className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full h-10 text-gray-400 hover:text-white hover:bg-gray-800/50"
              onClick={() => setActiveSection("projects")}
            >
              <FolderOpen className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full h-10 text-gray-400 hover:text-white hover:bg-gray-800/50"
              onClick={() => setActiveSection("team")}
            >
              <Users className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700/50 space-y-2">
        {!isCollapsed ? (
          <>
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 text-sm transition-colors">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 text-sm transition-colors">
              <HelpCircle className="w-4 h-4" />
              <span>Help Center</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 text-sm transition-colors">
              <CreditCard className="w-4 h-4" />
              <span>Billing</span>
            </button>
            <Separator className="bg-gray-700/50" />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 text-black" />
                </div>
                <div className="text-xs">
                  <div className="text-white font-medium">User</div>
                  <div className="text-gray-400">Pro Plan</div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-gray-800/50 p-1 h-6 w-6"
              >
                <LogOut className="w-3 h-3" />
              </Button>
            </div>
          </>
        ) : (
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full h-8 text-gray-400 hover:text-white hover:bg-gray-800/50"
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full h-8 text-gray-400 hover:text-white hover:bg-gray-800/50"
            >
              <User className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

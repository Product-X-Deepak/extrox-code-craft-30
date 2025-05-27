
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Database, 
  Github, 
  Rocket, 
  Settings, 
  Save,
  Play,
  Download,
  GitFork
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProjectDeleteDialog } from "./ProjectDeleteDialog";
import { useProjectActions } from "@/hooks/useProjectActions";

interface IntegrationBarProps {
  project: {
    id: string;
    title: string;
    description: string | null;
    type: string;
    status: string;
    updated_at: string;
  };
}

export function IntegrationBar({ project }: IntegrationBarProps) {
  const { toast } = useToast();
  const { forkProject, isForking, exportProject } = useProjectActions();

  const handleSupabaseConnect = () => {
    toast({
      title: "Supabase Integration",
      description: "Opening Supabase connection dialog...",
    });
  };

  const handleGithubConnect = () => {
    toast({
      title: "GitHub Integration",
      description: "Connecting to GitHub repository...",
    });
  };

  const handleVercelDeploy = () => {
    toast({
      title: "Vercel Deployment",
      description: "Initiating deployment to Vercel...",
    });
  };

  const handleSave = () => {
    toast({
      title: "Project Saved",
      description: "All changes have been saved successfully.",
    });
  };

  const handlePreview = () => {
    toast({
      title: "Running Preview",
      description: "Updating live preview...",
    });
  };

  const handleForkProject = async () => {
    try {
      await forkProject(project);
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleExportProject = () => {
    exportProject(project);
  };

  return (
    <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-xl">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Project Info */}
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-lg font-semibold text-white truncate max-w-64">
              {project.title}
            </h1>
            <p className="text-xs text-gray-400">
              Last saved: {new Date(project.updated_at).toLocaleTimeString()}
            </p>
          </div>
          <Badge 
            variant={project.status === 'active' ? 'default' : 'secondary'}
            className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
          >
            {project.status}
          </Badge>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Save & Preview */}
          <div className="flex items-center space-x-1 border-r border-gray-700 pr-3">
            <Button
              onClick={handleSave}
              size="sm"
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-gray-800/50"
            >
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
            <Button
              onClick={handlePreview}
              size="sm"
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-gray-800/50"
            >
              <Play className="w-4 h-4 mr-1" />
              Preview
            </Button>
          </div>

          {/* Project Actions */}
          <div className="flex items-center space-x-1 border-r border-gray-700 pr-3">
            <Button
              onClick={handleForkProject}
              disabled={isForking}
              size="sm"
              variant="ghost"
              className="text-gray-300 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
            >
              <GitFork className="w-4 h-4 mr-1" />
              {isForking ? 'Forking...' : 'Fork'}
            </Button>
            <Button
              onClick={handleExportProject}
              size="sm"
              variant="ghost"
              className="text-gray-300 hover:text-green-400 hover:bg-green-500/10 transition-colors"
            >
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
          </div>

          {/* Integrations */}
          <div className="flex items-center space-x-1 border-r border-gray-700 pr-3">
            <Button
              onClick={handleSupabaseConnect}
              size="sm"
              variant="ghost"
              className="text-gray-300 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
            >
              <Database className="w-4 h-4 mr-1" />
              Supabase
            </Button>
            <Button
              onClick={handleGithubConnect}
              size="sm"
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-gray-800/50"
            >
              <Github className="w-4 h-4 mr-1" />
              GitHub
            </Button>
            <Button
              onClick={handleVercelDeploy}
              size="sm"
              className="bg-black hover:bg-gray-900 text-white border border-gray-700"
            >
              <Rocket className="w-4 h-4 mr-1" />
              Deploy
            </Button>
          </div>

          {/* Settings & Delete */}
          <div className="flex items-center space-x-1">
            <Button
              size="sm"
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-gray-800/50"
            >
              <Settings className="w-4 h-4" />
            </Button>
            
            <ProjectDeleteDialog project={project} />
          </div>
        </div>
      </div>
    </header>
  );
}

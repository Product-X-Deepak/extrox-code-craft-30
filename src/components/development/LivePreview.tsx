
import { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Monitor, 
  Smartphone, 
  Tablet, 
  RefreshCw,
  ExternalLink,
  Eye,
  Settings,
  Download
} from "lucide-react";

interface LivePreviewProps {
  project: {
    id: string;
    title: string;
  };
  width: number;
}

export function LivePreview({ project, width }: LivePreviewProps) {
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getViewportStyles = () => {
    switch (viewportMode) {
      case 'mobile':
        return { width: '375px', height: '667px' };
      case 'tablet':
        return { width: '768px', height: '1024px' };
      default:
        return { width: '100%', height: '100%' };
    }
  };

  return (
    <div 
      className="bg-gray-900/10 border-l border-gray-800 flex flex-col"
      style={{ width: `${width}%` }}
    >
      {/* Preview Header */}
      <div className="p-3 border-b border-gray-800 bg-gray-900/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">Live Preview</h3>
          </div>
          
          {/* Viewport Controls */}
          <div className="flex items-center space-x-1">
            <Button
              onClick={() => setViewportMode('desktop')}
              size="sm"
              variant={viewportMode === 'desktop' ? 'default' : 'ghost'}
              className="h-7 w-7 p-0"
            >
              <Monitor className="w-3 h-3" />
            </Button>
            <Button
              onClick={() => setViewportMode('tablet')}
              size="sm"
              variant={viewportMode === 'tablet' ? 'default' : 'ghost'}
              className="h-7 w-7 p-0"
            >
              <Tablet className="w-3 h-3" />
            </Button>
            <Button
              onClick={() => setViewportMode('mobile')}
              size="sm"
              variant={viewportMode === 'mobile' ? 'default' : 'ghost'}
              className="h-7 w-7 p-0"
            >
              <Smartphone className="w-3 h-3" />
            </Button>
            
            <div className="w-px h-4 bg-gray-700 mx-2" />
            
            <Button
              onClick={handleRefresh}
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 text-gray-400 hover:text-white"
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 text-gray-400 hover:text-white"
            >
              <ExternalLink className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 text-gray-400 hover:text-white"
            >
              <Settings className="w-3 h-3" />
            </Button>
          </div>
        </div>
        
        {/* URL Bar */}
        <div className="mt-2 flex items-center space-x-2">
          <div className="flex-1 bg-gray-800/50 rounded px-3 py-1 text-xs text-gray-400 border border-gray-700">
            https://preview-{project.id}.extrox.dev
          </div>
          <span className="text-xs text-emerald-400 font-medium">
            {viewportMode}
          </span>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 p-4 overflow-auto bg-gray-100">
        <div className="h-full flex items-center justify-center">
          <div 
            className="bg-white rounded-lg shadow-xl border transition-all duration-300 mx-auto"
            style={getViewportStyles()}
          >
            {/* Mock Preview Content */}
            <div className="h-full w-full bg-white rounded-lg flex flex-col">
              {/* Mock App Header */}
              <div className="bg-emerald-500 text-white p-4 rounded-t-lg">
                <h1 className="text-xl font-bold">{project.title}</h1>
                <p className="text-emerald-100 text-sm">Live preview of your application</p>
              </div>
              
              {/* Mock App Content */}
              <div className="flex-1 p-6 space-y-4">
                <div className="bg-gray-100 h-4 rounded animate-pulse" />
                <div className="bg-gray-100 h-4 rounded animate-pulse w-3/4" />
                <div className="bg-gray-100 h-4 rounded animate-pulse w-1/2" />
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-blue-50 p-4 rounded border">
                    <div className="bg-blue-200 h-3 rounded mb-2" />
                    <div className="bg-blue-100 h-2 rounded w-2/3" />
                  </div>
                  <div className="bg-green-50 p-4 rounded border">
                    <div className="bg-green-200 h-3 rounded mb-2" />
                    <div className="bg-green-100 h-2 rounded w-2/3" />
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="bg-emerald-500 text-white px-4 py-2 rounded w-fit">
                    Sample Button
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

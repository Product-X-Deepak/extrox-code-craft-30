
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { DevelopmentSidebar } from '@/components/development/DevelopmentSidebar';
import { CodeEditor } from '@/components/development/CodeEditor';
import { LivePreview } from '@/components/development/LivePreview';
import { IntegrationBar } from '@/components/development/IntegrationBar';
import { useProject } from '@/hooks/useProject';

const Development = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { project, isLoading, error } = useProject(projectId);
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [editorWidth, setEditorWidth] = useState(50); // percentage

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!isLoading && !project && projectId) {
      navigate('/home');
    }
  }, [project, isLoading, projectId, navigate]);

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-lg">Loading development environment...</div>
      </div>
    );
  }

  if (!user || !project) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Integration Bar */}
      <IntegrationBar project={project} />
      
      {/* Main Development Interface */}
      <div className="flex-1 flex">
        {/* Chat Sidebar */}
        <DevelopmentSidebar 
          project={project}
          width={sidebarWidth}
          onWidthChange={setSidebarWidth}
        />
        
        {/* Code Editor */}
        <CodeEditor 
          project={project}
          width={editorWidth}
          onWidthChange={setEditorWidth}
        />
        
        {/* Live Preview */}
        <LivePreview 
          project={project}
          width={100 - editorWidth}
        />
      </div>
    </div>
  );
};

export default Development;

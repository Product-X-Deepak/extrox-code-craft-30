
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';
import { useNavigate } from 'react-router-dom';

export const useProjectActions = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteProjectMutation = useMutation({
    mutationFn: async (projectId: string) => {
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId)
        .eq('user_id', user.id);

      if (error) throw error;
      return projectId;
    },
    onSuccess: (projectId) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      toast({
        title: "Project Deleted",
        description: "Your project has been permanently deleted.",
      });
      navigate('/home');
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete project.",
        variant: "destructive",
      });
    },
  });

  const forkProjectMutation = useMutation({
    mutationFn: async (project: { id: string; title: string; description: string | null; type: string }) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('projects')
        .insert([{
          title: `${project.title} (Fork)`,
          description: project.description,
          type: project.type,
          user_id: user.id
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (newProject) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: "Project Forked",
        description: "Your project has been forked successfully.",
      });
      navigate(`/development/${newProject.id}`);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to fork project.",
        variant: "destructive",
      });
    },
  });

  const exportProject = async (project: { id: string; title: string }) => {
    try {
      // Create a basic project structure for export
      const projectFiles = {
        'package.json': JSON.stringify({
          name: project.title.toLowerCase().replace(/\s+/g, '-'),
          version: '1.0.0',
          description: `Exported project: ${project.title}`,
          type: 'module',
          scripts: {
            dev: 'vite',
            build: 'vite build',
            preview: 'vite preview'
          },
          dependencies: {
            'react': '^18.3.1',
            'react-dom': '^18.3.1',
            'vite': '^5.0.0'
          }
        }, null, 2),
        'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${project.title}</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>`,
        'src/main.jsx': `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`,
        'src/App.jsx': `import React from 'react'

function App() {
  return (
    <div className="App">
      <h1>${project.title}</h1>
      <p>Welcome to your exported project!</p>
    </div>
  )
}

export default App`,
        'README.md': `# ${project.title}

This project was exported from Lovable.

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Build for production:
   \`\`\`bash
   npm run build
   \`\`\`
`
      };

      // Create and download ZIP file
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();

      // Add files to ZIP
      Object.entries(projectFiles).forEach(([path, content]) => {
        zip.file(path, content);
      });

      // Generate ZIP file
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      
      // Create download link
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${project.title.toLowerCase().replace(/\s+/g, '-')}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Project Exported",
        description: "Your project has been exported as a ZIP file.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export project. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    deleteProject: deleteProjectMutation.mutateAsync,
    isDeleting: deleteProjectMutation.isPending,
    forkProject: forkProjectMutation.mutateAsync,
    isForking: forkProjectMutation.isPending,
    exportProject,
  };
};

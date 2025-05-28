
import { ChatInterface } from './ChatInterface';
import type { Project } from '@/types/workflow';

interface DevelopmentSidebarProps {
  project: Project;
  width: number;
  onWidthChange: (width: number) => void;
}

export function DevelopmentSidebar({ project, width, onWidthChange }: DevelopmentSidebarProps) {
  return (
    <div 
      className="bg-gray-900/30 border-r border-gray-800 flex flex-col"
      style={{ width: `${width}px` }}
    >
      <ChatInterface 
        projectId={project.id}
        projectStatus={project.status}
        projectType={project.type}
      />
    </div>
  );
}


import { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FolderOpen, 
  File, 
  ChevronRight, 
  ChevronDown,
  FileText,
  Settings,
  Plus,
  Search
} from "lucide-react";

interface CodeEditorProps {
  project: {
    id: string;
    title: string;
  };
  width: number;
  onWidthChange: (width: number) => void;
}

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  content?: string;
}

const mockFileStructure: FileNode[] = [
  {
    name: 'src',
    type: 'folder',
    children: [
      {
        name: 'components',
        type: 'folder',
        children: [
          { name: 'App.tsx', type: 'file', content: 'import React from "react";\n\nfunction App() {\n  return (\n    <div className="App">\n      <h1>Hello World</h1>\n    </div>\n  );\n}\n\nexport default App;' },
          { name: 'Button.tsx', type: 'file', content: 'import React from "react";\n\ninterface ButtonProps {\n  children: React.ReactNode;\n  onClick?: () => void;\n}\n\nexport function Button({ children, onClick }: ButtonProps) {\n  return (\n    <button onClick={onClick}>\n      {children}\n    </button>\n  );\n}' }
        ]
      },
      { name: 'index.tsx', type: 'file', content: 'import React from "react";\nimport ReactDOM from "react-dom/client";\nimport App from "./components/App";\n\nconst root = ReactDOM.createRoot(\n  document.getElementById("root") as HTMLElement\n);\nroot.render(<App />);' }
    ]
  },
  { name: 'package.json', type: 'file', content: '{\n  "name": "my-project",\n  "version": "1.0.0",\n  "dependencies": {\n    "react": "^18.0.0",\n    "react-dom": "^18.0.0"\n  }\n}' },
  { name: 'README.md', type: 'file', content: '# My Project\n\nThis is my awesome project built with React.' }
];

export function CodeEditor({ project, width }: CodeEditorProps) {
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src', 'src/components']));

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const renderFileTree = (nodes: FileNode[], basePath: string = '') => {
    return nodes.map((node) => {
      const fullPath = basePath ? `${basePath}/${node.name}` : node.name;
      const isExpanded = expandedFolders.has(fullPath);
      
      return (
        <div key={fullPath}>
          <div
            className={`flex items-center space-x-2 py-1 px-2 hover:bg-gray-800/50 cursor-pointer rounded text-sm ${
              selectedFile?.name === node.name ? 'bg-emerald-500/10 text-emerald-400' : 'text-gray-300'
            }`}
            onClick={() => {
              if (node.type === 'folder') {
                toggleFolder(fullPath);
              } else {
                setSelectedFile(node);
              }
            }}
            style={{ paddingLeft: `${(basePath.split('/').length - 1) * 16 + 8}px` }}
          >
            {node.type === 'folder' ? (
              <>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
                <FolderOpen className="w-4 h-4 text-blue-400" />
              </>
            ) : (
              <>
                <div className="w-4" />
                <FileText className="w-4 h-4 text-gray-400" />
              </>
            )}
            <span>{node.name}</span>
          </div>
          {node.type === 'folder' && isExpanded && node.children && (
            <div>
              {renderFileTree(node.children, fullPath)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="flex-1 flex bg-gray-900/20">
      {/* File Explorer */}
      <div className="w-64 border-r border-gray-800 bg-gray-900/30">
        <div className="p-3 border-b border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-white">Explorer</h3>
            <div className="flex space-x-1">
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-gray-400 hover:text-white">
                <Plus className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-gray-400 hover:text-white">
                <Search className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
        <div className="p-2 overflow-y-auto">
          {renderFileTree(mockFileStructure)}
        </div>
      </div>

      {/* Code Editor */}
      <div className="flex-1 flex flex-col">
        {selectedFile ? (
          <>
            {/* Editor Header */}
            <div className="px-4 py-2 border-b border-gray-800 bg-gray-900/20">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-white">{selectedFile.name}</span>
                <div className="flex-1" />
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-gray-400 hover:text-white">
                  <Settings className="w-3 h-3" />
                </Button>
              </div>
            </div>
            
            {/* Code Content */}
            <div className="flex-1 p-4 overflow-auto">
              <Card className="h-full bg-gray-800/30 border-gray-700">
                <CardContent className="p-4 h-full">
                  <pre className="text-sm text-gray-100 font-mono whitespace-pre-wrap h-full overflow-auto">
                    <code>{selectedFile.content}</code>
                  </pre>
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <File className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No file selected</h3>
              <p className="text-sm">Select a file from the explorer to view its contents</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

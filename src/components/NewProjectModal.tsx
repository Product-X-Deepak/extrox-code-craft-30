
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { useToast } from "@/hooks/use-toast";

interface NewProjectModalProps {
  isCollapsed?: boolean;
}

export function NewProjectModal({ isCollapsed = false }: NewProjectModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'frontend' as 'frontend' | 'backend' | 'fullstack'
  });
  
  const { createProject, isCreating } = useProjects();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Project title is required.",
        variant: "destructive",
      });
      return;
    }

    try {
      await createProject({
        title: formData.title,
        description: formData.description || null,
        type: formData.type,
        role: formData.type
      });
      
      setFormData({ title: '', description: '', type: 'frontend' });
      setOpen(false);
    } catch (error) {
      // Error is handled in the hook
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isCollapsed ? (
          <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold h-9 shadow-lg shadow-emerald-500/20 transition-all p-0">
            <Plus className="w-4 h-4" />
          </Button>
        ) : (
          <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold h-9 shadow-lg shadow-emerald-500/20 transition-all">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="My Awesome Project"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Project Type</Label>
            <Select value={formData.type} onValueChange={(value: 'frontend' | 'backend' | 'fullstack') => setFormData(prev => ({ ...prev, type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="frontend">Frontend Application</SelectItem>
                <SelectItem value="backend">Backend Service</SelectItem>
                <SelectItem value="fullstack">Full-Stack Application</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your project..."
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isCreating}>
              {isCreating ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

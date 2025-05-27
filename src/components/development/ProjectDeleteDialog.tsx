
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, AlertTriangle } from "lucide-react";
import { useProjectActions } from "@/hooks/useProjectActions";

interface ProjectDeleteDialogProps {
  project: {
    id: string;
    title: string;
  };
}

export function ProjectDeleteDialog({ project }: ProjectDeleteDialogProps) {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [step, setStep] = useState(1);
  const { deleteProject, isDeleting } = useProjectActions();

  const expectedText = `DELETE ${project.title}`;
  const isConfirmValid = confirmText === expectedText;

  const handleFirstConfirm = () => {
    setStep(2);
  };

  const handleFinalDelete = async () => {
    if (!isConfirmValid) return;
    
    try {
      await deleteProject(project.id);
      setOpen(false);
      setStep(1);
      setConfirmText('');
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setStep(1);
    setConfirmText('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="w-5 h-5" />
            Delete Project
          </DialogTitle>
          <DialogDescription>
            {step === 1 ? (
              "This action cannot be undone. This will permanently delete your project and all associated data."
            ) : (
              `To confirm deletion, type "${expectedText}" in the field below:`
            )}
          </DialogDescription>
        </DialogHeader>

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="confirm-text" className="text-sm font-medium">
                Confirmation Text
              </Label>
              <Input
                id="confirm-text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder={expectedText}
                className="mt-1"
                autoComplete="off"
              />
            </div>
          </div>
        )}

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          
          {step === 1 ? (
            <Button 
              variant="destructive" 
              onClick={handleFirstConfirm}
            >
              Continue to Delete
            </Button>
          ) : (
            <Button 
              variant="destructive" 
              onClick={handleFinalDelete}
              disabled={!isConfirmValid || isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete Project'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

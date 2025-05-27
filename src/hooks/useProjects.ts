
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

interface Project {
  id: string;
  title: string;
  description: string | null;
  type: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export const useProjects = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: projects = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['projects', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Project[];
    },
    enabled: !!user,
  });

  const createProjectMutation = useMutation({
    mutationFn: async (projectData: { title: string; description?: string; type: string }) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('projects')
        .insert([{
          ...projectData,
          user_id: user.id
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: "Project Created",
        description: "Your new project has been created successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create project.",
        variant: "destructive",
      });
    },
  });

  return {
    projects,
    isLoading,
    error,
    createProject: createProjectMutation.mutate,
    isCreating: createProjectMutation.isPending,
  };
};

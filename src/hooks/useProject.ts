
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import type { Project } from '@/types/workflow';

export const useProject = (projectId: string | undefined) => {
  const { user } = useAuth();

  const {
    data: project,
    isLoading,
    error
  } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      if (!user || !projectId) return null;
      
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      return data as Project | null;
    },
    enabled: !!user && !!projectId,
  });

  return {
    project,
    isLoading,
    error
  };
};

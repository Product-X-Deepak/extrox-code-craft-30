
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface Project {
  id: string;
  title: string;
  description: string | null;
  type: string;
  status: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

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

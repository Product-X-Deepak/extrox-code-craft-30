
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface AnalyticsData {
  project_id: string;
  time_to_plan_generation?: number;
  time_to_first_reply?: number;
  prompt_length: number;
  follow_up_questions_count: number;
  completion_rate: boolean;
}

export const useProjectAnalytics = () => {
  const { user } = useAuth();

  const trackAnalyticsMutation = useMutation({
    mutationFn: async (analytics: AnalyticsData) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('project_analytics')
        .insert([analytics])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  });

  const trackPlanGeneration = (projectId: string, timeMs: number) => {
    trackAnalyticsMutation.mutate({
      project_id: projectId,
      time_to_plan_generation: timeMs,
      prompt_length: 0,
      follow_up_questions_count: 0,
      completion_rate: false
    });
  };

  const trackFirstReply = (projectId: string, timeMs: number) => {
    trackAnalyticsMutation.mutate({
      project_id: projectId,
      time_to_first_reply: timeMs,
      prompt_length: 0,
      follow_up_questions_count: 0,
      completion_rate: false
    });
  };

  const trackCompletion = (projectId: string, promptLength: number, questionsCount: number) => {
    trackAnalyticsMutation.mutate({
      project_id: projectId,
      prompt_length: promptLength,
      follow_up_questions_count: questionsCount,
      completion_rate: true
    });
  };

  return {
    trackPlanGeneration,
    trackFirstReply,
    trackCompletion,
    isTracking: trackAnalyticsMutation.isPending
  };
};

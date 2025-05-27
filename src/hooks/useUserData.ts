
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  full_name: string | null;
}

interface UserSubscription {
  plan_type: string;
  status: string;
  current_period_end: string;
}

export const useUserData = () => {
  const { user } = useAuth();

  const {
    data: profile,
    isLoading: profileLoading
  } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data as UserProfile;
    },
    enabled: !!user,
  });

  const {
    data: subscription,
    isLoading: subscriptionLoading
  } = useQuery({
    queryKey: ['subscription', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .rpc('get_user_subscription', { _user_id: user.id });

      if (error) throw error;
      return data?.[0] as UserSubscription || { plan_type: 'trial', status: 'active', current_period_end: '' };
    },
    enabled: !!user,
  });

  const {
    data: dailyUsage = 0,
    isLoading: dailyUsageLoading
  } = useQuery({
    queryKey: ['dailyUsage', user?.id],
    queryFn: async () => {
      if (!user) return 0;
      
      const { data, error } = await supabase
        .rpc('get_daily_usage', { _user_id: user.id });

      if (error) throw error;
      return data || 0;
    },
    enabled: !!user,
  });

  const {
    data: monthlyUsage = 0,
    isLoading: monthlyUsageLoading
  } = useQuery({
    queryKey: ['monthlyUsage', user?.id],
    queryFn: async () => {
      if (!user) return 0;
      
      const { data, error } = await supabase
        .rpc('get_monthly_usage', { _user_id: user.id });

      if (error) throw error;
      return data || 0;
    },
    enabled: !!user,
  });

  return {
    profile,
    subscription,
    dailyUsage,
    monthlyUsage,
    isLoading: profileLoading || subscriptionLoading || dailyUsageLoading || monthlyUsageLoading,
  };
};

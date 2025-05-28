
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';
import type { ChatMessage } from '@/types/workflow';

export const useChat = (projectId: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: messages = [],
    isLoading: messagesLoading
  } = useQuery({
    queryKey: ['chat-messages', projectId],
    queryFn: async () => {
      if (!user || !projectId) return [];
      
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('project_id', projectId)
        .order('timestamp', { ascending: true });

      if (error) throw error;
      return data as ChatMessage[];
    },
    enabled: !!user && !!projectId,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async ({ content, messageType }: { content: string; messageType?: string }) => {
      if (!user || !projectId) throw new Error('User not authenticated or project not found');

      // Save user message
      const { data: userMessage, error: userError } = await supabase
        .from('chat_messages')
        .insert([{
          project_id: projectId,
          sender: 'user',
          content,
          message_type: messageType || 'general',
          timestamp: new Date().toISOString()
        }])
        .select()
        .single();

      if (userError) throw userError;

      // Update project status to in_progress
      await supabase
        .from('projects')
        .update({ 
          status: 'in_progress',
          updated_at: new Date().toISOString()
        })
        .eq('id', projectId);

      // Call LLM API - this would integrate with actual LLM service
      const llmResponse = await simulateLLMResponse(content, projectId);

      // Save LLM response
      const { data: llmMessage, error: llmError } = await supabase
        .from('chat_messages')
        .insert([{
          project_id: projectId,
          sender: 'llm1',
          content: llmResponse.content,
          message_type: llmResponse.type,
          timestamp: new Date().toISOString()
        }])
        .select()
        .single();

      if (llmError) throw llmError;

      return { userMessage, llmMessage };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-messages', projectId] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message.",
        variant: "destructive",
      });
    },
  });

  return {
    messages,
    messagesLoading,
    sendMessage: sendMessageMutation.mutateAsync,
    isSending: sendMessageMutation.isPending,
  };
};

// Simulate LLM response - this would be replaced with actual LLM integration
async function simulateLLMResponse(userInput: string, projectId: string) {
  // Get project details to determine role
  const { data: project } = await supabase
    .from('projects')
    .select('type, initial_prompt, role')
    .eq('id', projectId)
    .single();

  const role = project?.role || project?.type || 'frontend';
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  if (userInput.length < 50) {
    return {
      content: `I need more details to create a comprehensive ${role} solution. Could you please provide more information about:\n\n1. What specific features do you want?\n2. Who is your target audience?\n3. What's the main goal of this application?\n4. Do you have any design preferences or existing brand guidelines?`,
      type: "question"
    };
  }

  return {
    content: `Based on your requirements, I'll create a ${role} solution. Here's my development plan:

## Project Overview
I'll build a modern, responsive application with the following architecture:

### ${role.charAt(0).toUpperCase() + role.slice(1)} Components
${role === 'frontend' ? '- Modern React components with TypeScript\n- Responsive design with Tailwind CSS\n- Component library integration\n- Accessibility features' : 
  role === 'backend' ? '- RESTful API endpoints\n- Database schema design\n- Authentication system\n- Serverless functions' :
  '- Full-stack application\n- Frontend with React/TypeScript\n- Backend API with database\n- Complete user authentication'}

### Technical Implementation
1. Set up project structure and dependencies
2. Create core ${role} architecture
3. Implement main features and functionality
4. Add testing and optimization
5. Deploy and configure production environment

### Next Steps
I'm ready to start building this step by step. Would you like me to begin with the implementation, or do you have any specific requirements to add?`,
    type: "plan"
  };
}

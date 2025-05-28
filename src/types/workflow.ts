
export interface Project {
  id: string;
  title: string;
  description: string | null;
  type: 'frontend' | 'backend' | 'fullstack';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
  user_id: string;
  initial_prompt: string | null;
  plan_draft?: string | null;
  role?: 'frontend' | 'backend' | 'fullstack' | null;
}

export interface ChatMessage {
  id: string;
  project_id: string;
  sender: 'user' | 'llm1' | 'system';
  content: string;
  timestamp: string;
  message_type?: string | null;
  created_at: string;
}

export interface ModelProvider {
  id: string;
  name: string;
  provider: 'openai' | 'deepseek' | 'qwen' | 'openrouter' | 'anthropic' | 'ollama' | 'lmstudio' | 'groq' | 'huggingface' | 'gemini';
  api_key: string | null;
  endpoint_url?: string | null;
  default_parameters?: Record<string, any> | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProjectAnalytics {
  id: string;
  project_id: string;
  time_to_plan_generation?: number | null;
  time_to_first_reply?: number | null;
  prompt_length: number;
  follow_up_questions_count: number;
  completion_rate: boolean;
  created_at: string;
}

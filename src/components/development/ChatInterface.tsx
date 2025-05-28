
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Clock, CheckCircle, AlertCircle, Brain, Server, Layers } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { useProjectAnalytics } from '@/hooks/useProjectAnalytics';
import type { ChatMessage } from '@/types/workflow';

interface ChatInterfaceProps {
  projectId: string;
  projectStatus: string;
  projectType: 'frontend' | 'backend' | 'fullstack';
}

export const ChatInterface = ({ projectId, projectStatus, projectType }: ChatInterfaceProps) => {
  const [message, setMessage] = useState('');
  const { messages, messagesLoading, sendMessage, isSending } = useChat(projectId);
  const { trackFirstReply, trackCompletion } = useProjectAnalytics();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim() || isSending) return;

    const messageContent = message.trim();
    const isFirstReply = messages.filter(m => m.sender === 'user').length === 0;
    
    setMessage('');

    try {
      await sendMessage({ 
        content: messageContent,
        messageType: 'general'
      });

      if (isFirstReply) {
        const timeToFirstReply = Date.now() - startTimeRef.current;
        trackFirstReply(projectId, timeToFirstReply);
      }

      // Track completion metrics
      const userMessages = messages.filter(m => m.sender === 'user');
      const questionsCount = messages.filter(m => m.message_type === 'question').length;
      
      trackCompletion(projectId, messageContent.length, questionsCount);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getMessageIcon = (sender: ChatMessage['sender']) => {
    switch (sender) {
      case 'user':
        return <User className="w-4 h-4 text-blue-400" />;
      case 'llm1':
        return <Bot className="w-4 h-4 text-emerald-400" />;
      case 'system':
        return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      default:
        return <Bot className="w-4 h-4 text-emerald-400" />;
    }
  };

  const getStatusIcon = () => {
    switch (projectStatus) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'in_progress':
        return <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getRoleIcon = () => {
    switch (projectType) {
      case 'frontend':
        return <Brain className="w-5 h-5 text-blue-400" />;
      case 'backend':
        return <Server className="w-5 h-5 text-green-400" />;
      case 'fullstack':
        return <Layers className="w-5 h-5 text-purple-400" />;
      default:
        return <Bot className="w-5 h-5 text-emerald-400" />;
    }
  };

  const getRoleDescription = () => {
    switch (projectType) {
      case 'frontend':
        return 'Generating production-grade UI with responsive design and best practices';
      case 'backend':
        return 'Building robust backend architecture with APIs and database design';
      case 'fullstack':
        return 'Delivering complete end-to-end development solution';
      default:
        return 'AI-powered development assistant';
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-900/50">
      {/* Enhanced Header */}
      <div className="p-4 border-b border-gray-700/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {getRoleIcon()}
            <div>
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                {getStatusIcon()}
                {projectType.charAt(0).toUpperCase() + projectType.slice(1)} Engineer
              </h3>
              <p className="text-xs text-gray-400">{getRoleDescription()}</p>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={`text-xs ${
              projectStatus === 'completed' ? 'border-green-500 text-green-400' :
              projectStatus === 'in_progress' ? 'border-blue-500 text-blue-400' :
              projectStatus === 'failed' ? 'border-red-500 text-red-400' :
              'border-yellow-500 text-yellow-400'
            }`}
          >
            {projectStatus.replace('_', ' ').toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messagesLoading ? (
            <div className="text-center text-gray-400 py-8">
              <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              Loading conversation...
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h4 className="text-lg font-medium mb-2">Ready to Build</h4>
              <p className="text-sm">Start the conversation to begin developing your project.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] ${msg.sender === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className="flex items-center space-x-2 mb-1">
                    {getMessageIcon(msg.sender)}
                    <span className="text-xs text-gray-400">
                      {msg.sender === 'llm1' ? `${projectType.charAt(0).toUpperCase() + projectType.slice(1)} Engineer` : 
                       msg.sender === 'user' ? 'You' : 'System'}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {msg.message_type === 'question' && (
                      <Badge variant="outline" className="text-xs border-yellow-500 text-yellow-400">
                        Question
                      </Badge>
                    )}
                    {msg.message_type === 'plan' && (
                      <Badge variant="outline" className="text-xs border-green-500 text-green-400">
                        Plan
                      </Badge>
                    )}
                  </div>
                  <div className={`rounded-lg p-4 ${
                    msg.sender === 'user' 
                      ? 'bg-blue-500/10 border border-blue-500/30' 
                      : msg.message_type === 'question'
                        ? 'bg-yellow-500/10 border border-yellow-500/30'
                        : msg.message_type === 'plan'
                          ? 'bg-green-500/10 border border-green-500/30'
                          : 'bg-gray-800/50 border border-gray-700'
                  }`}>
                    <p className="text-sm text-gray-100 whitespace-pre-wrap leading-relaxed">
                      {msg.content}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
          
          {isSending && (
            <div className="flex justify-start">
              <div className="max-w-[85%]">
                <div className="flex items-center space-x-2 mb-1">
                  <Bot className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-gray-400">{projectType.charAt(0).toUpperCase() + projectType.slice(1)} Engineer</span>
                </div>
                <div className="rounded-lg p-4 bg-gray-800/50 border border-gray-700">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    </div>
                    <span className="text-xs text-gray-400">Analyzing and planning...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Enhanced Input */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex space-x-3">
          <div className="flex-1">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Describe what you want to build or modify with your ${projectType} engineer...`}
              className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 resize-none min-h-12 max-h-32"
              disabled={isSending}
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim() || isSending}
            className="bg-emerald-500 hover:bg-emerald-600 text-black px-4 h-12"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
};

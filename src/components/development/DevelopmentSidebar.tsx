
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare, 
  Send, 
  Trash2, 
  ChevronRight,
  Bot,
  User,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface DevelopmentSidebarProps {
  project: {
    id: string;
    title: string;
    description: string | null;
  };
  width: number;
  onWidthChange: (width: number) => void;
}

export function DevelopmentSidebar({ project, width, onWidthChange }: DevelopmentSidebarProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Initialize with project description as first message
  useEffect(() => {
    if (project.description && messages.length === 0) {
      setMessages([{
        id: '1',
        content: project.description,
        sender: 'user',
        timestamp: new Date()
      }]);
    }
  }, [project.description, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: currentMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'll help you implement that feature. Let me analyze your request and update the code accordingly.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    toast({
      title: "Chat Cleared",
      description: "All messages have been removed.",
    });
  };

  return (
    <div 
      className="bg-gray-900/30 border-r border-gray-800 flex flex-col"
      style={{ width: `${width}px` }}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            <h2 className="font-semibold text-white">Development Chat</h2>
          </div>
          <Button
            onClick={clearChat}
            size="sm"
            variant="ghost"
            className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Collaborate with AI to build and modify your project
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
              <div className="flex items-center space-x-2 mb-1">
                {message.sender === 'ai' ? (
                  <Bot className="w-4 h-4 text-emerald-400" />
                ) : (
                  <User className="w-4 h-4 text-blue-400" />
                )}
                <span className="text-xs text-gray-400">
                  {message.sender === 'ai' ? 'AI Assistant' : 'You'}
                </span>
                <span className="text-xs text-gray-500 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <Card className={`${
                message.sender === 'user' 
                  ? 'bg-blue-500/10 border-blue-500/30' 
                  : 'bg-gray-800/50 border-gray-700'
              }`}>
                <CardContent className="p-3">
                  <p className="text-sm text-gray-100 whitespace-pre-wrap">
                    {message.content}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[85%]">
              <div className="flex items-center space-x-2 mb-1">
                <Bot className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-gray-400">AI Assistant</span>
              </div>
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    </div>
                    <span className="text-xs text-gray-400">Thinking...</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex space-x-2">
          <Textarea
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Describe what you want to build or modify..."
            className="flex-1 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 resize-none min-h-12 max-h-32"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!currentMessage.trim() || isLoading}
            className="bg-emerald-500 hover:bg-emerald-600 text-black px-3"
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
}

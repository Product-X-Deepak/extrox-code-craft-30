import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, Paperclip, Image, FileArchive, Sparkles, Code, X, ArrowRight, Brain, Server, Layers } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useUserData } from "@/hooks/useUserData";
import { useProjects } from "@/hooks/useProjects";
import { supabase } from "@/integrations/supabase/client";

export function HomeContent() {
  const [prompt, setPrompt] = useState("");
  const [selectedRole, setSelectedRole] = useState("frontend");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const { profile, subscription, dailyUsage, monthlyUsage } = useUserData();
  const { createProject, isCreating } = useProjects();

  const wordCount = prompt.trim().split(/\s+/).filter(word => word.length > 0).length;
  const maxWords = subscription?.plan_type === "trial" ? 800 : 2000;

  const dailyLimits = {
    trial: 1,
    premium: 15,
    pro: 30,
    enterprise: Infinity
  };

  const monthlyLimits = {
    trial: 20,
    premium: 300,
    pro: 500,
    enterprise: Infinity
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/') || 
                         file.type === 'application/zip' ||
                         file.type === 'application/x-zip-compressed';
      return isValidType && file.size <= 10 * 1024 * 1024;
    });

    if (validFiles.length !== files.length) {
      toast({
        title: "Some files were rejected",
        description: "Only images and ZIP files under 10MB are allowed.",
        variant: "destructive"
      });
    }

    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const handleSubmit = async () => {
    const userTier = subscription?.plan_type || 'trial';
    const dailyLimit = dailyLimits[userTier as keyof typeof dailyLimits];
    const monthlyLimit = monthlyLimits[userTier as keyof typeof monthlyLimits];

    if (dailyUsage >= dailyLimit) {
      toast({
        title: "Daily Limit Reached",
        description: `You've reached your daily limit of ${dailyLimit} requests. Please upgrade or try again tomorrow.`,
        variant: "destructive"
      });
      return;
    }

    if (monthlyUsage >= monthlyLimit) {
      toast({
        title: "Monthly Limit Reached",
        description: `You've reached your monthly limit of ${monthlyLimit} requests. Please upgrade your plan.`,
        variant: "destructive"
      });
      return;
    }

    if (!prompt.trim() || !selectedRole) {
      toast({
        title: "Missing Information",
        description: "Please enter your prompt and select a role.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Create project with enhanced data
      const projectTitle = prompt.split(' ').slice(0, 5).join(' ').substring(0, 50);
      const newProject = await createProject({
        title: projectTitle,
        description: prompt,
        type: selectedRole as 'frontend' | 'backend' | 'fullstack',
        initial_prompt: prompt,
        role: selectedRole as 'frontend' | 'backend' | 'fullstack'
      });

      // Track usage
      if (user) {
        await supabase.from('usage_tracking').insert({
          user_id: user.id,
          request_type: selectedRole,
          tokens_used: wordCount
        });
      }

      // Reset form
      setPrompt("");
      setSelectedRole("frontend");
      setUploadedFiles([]);

      // Navigate to development page
      if (newProject?.id) {
        window.location.href = `/development/${newProject.id}`;
      }
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit request.",
        variant: "destructive"
      });
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const userDisplayName = profile?.first_name || user?.email?.split('@')[0] || 'there';
  const userPlan = subscription?.plan_type || 'trial';

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'frontend':
        return <Brain className="w-4 h-4" />;
      case 'backend':
        return <Server className="w-4 h-4" />;
      case 'fullstack':
        return <Layers className="w-4 h-4" />;
      default:
        return <Code className="w-4 h-4" />;
    }
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'frontend':
        return 'Generate a fully-fledged, production-grade UI with best practices (responsive layout, accessibility, component library, etc.)';
      case 'backend':
        return 'Scaffold a minimal front end, then implement full backend: workflows, serverless functions or REST endpoints, and database schema/migrations';
      case 'fullstack':
        return 'Deliver end-to-end code: frontend components, backend services, and database models + seed data';
      default:
        return 'AI-powered development assistant';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto h-screen">
      {/* Compact Premium Header */}
      <header className="border-b border-gray-700/20 bg-gray-900/40 backdrop-blur-xl sticky top-0 z-40">
        <div className="px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/25">
                <Code className="w-3.5 h-3.5 text-black" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white tracking-tight">Welcome back, {userDisplayName}</h1>
                <p className="text-xs text-gray-400">Let's build something amazing today</p>
              </div>
            </div>
            <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 px-2.5 py-1 text-xs font-medium">
              <Sparkles className="w-3 h-3 mr-1" />
              {userPlan.charAt(0).toUpperCase() + userPlan.slice(1)} Plan
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4 text-xs text-gray-400">
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              <span>Daily: {dailyUsage}/{dailyLimits[userPlan as keyof typeof dailyLimits] === Infinity ? '∞' : dailyLimits[userPlan as keyof typeof dailyLimits]}</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              <span>Monthly: {monthlyUsage}/{monthlyLimits[userPlan as keyof typeof monthlyLimits] === Infinity ? '∞' : monthlyLimits[userPlan as keyof typeof monthlyLimits]}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Compact Hero Section */}
        <section className="mb-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight tracking-tight">
              What should we
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-white bg-clip-text text-transparent block">
                build today?
              </span>
            </h2>
            
            <p className="text-base text-gray-400 mb-6 leading-relaxed font-light">
              Your AI development team with specialized 
              <span className="text-white font-medium"> frontend</span>, 
              <span className="text-white font-medium"> backend</span>, and 
              <span className="text-white font-medium"> full-stack engineers</span> ready to build your vision.
            </p>
          </div>
        </section>

        {/* Enhanced Input Section */}
        <section className="max-w-3xl mx-auto">
          <Card className="bg-gray-900/50 border-gray-700/40 backdrop-blur-sm shadow-xl shadow-black/20">
            <CardContent className="p-5">
              <div className="space-y-4">
                {/* Enhanced Role Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">Choose Your AI Engineer</label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="w-full bg-gray-800/50 border-gray-600/50 text-white h-12 text-sm">
                      <div className="flex items-center gap-3">
                        {getRoleIcon(selectedRole)}
                        <SelectValue placeholder="Choose your engineer" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600 backdrop-blur-xl">
                      <SelectItem value="frontend" className="text-white hover:bg-gray-700">
                        <div className="flex items-center gap-3 py-2">
                          <Brain className="w-4 h-4 text-blue-400" />
                          <div>
                            <div className="font-medium">Frontend Engineer</div>
                            <div className="text-xs text-gray-400">Production-grade UI with best practices</div>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="backend" className="text-white hover:bg-gray-700">
                        <div className="flex items-center gap-3 py-2">
                          <Server className="w-4 h-4 text-green-400" />
                          <div>
                            <div className="font-medium">Backend Engineer</div>
                            <div className="text-xs text-gray-400">APIs, databases, and serverless functions</div>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="fullstack" className="text-white hover:bg-gray-700">
                        <div className="flex items-center gap-3 py-2">
                          <Layers className="w-4 h-4 text-purple-400" />
                          <div>
                            <div className="font-medium">Full-Stack Engineer</div>
                            <div className="text-xs text-gray-400">End-to-end development solution</div>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {/* Role Description */}
                  <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700/30">
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {getRoleDescription(selectedRole)}
                    </p>
                  </div>
                </div>

                {/* Improved Input Box with Better Layout */}
                <div 
                  className={`relative border-2 border-dashed rounded-lg transition-all duration-300 ${
                    dragActive 
                      ? 'border-emerald-400 bg-emerald-500/5 shadow-lg shadow-emerald-500/15' 
                      : 'border-gray-600/50 hover:border-gray-500/50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {/* Uploaded Files Display */}
                  {uploadedFiles.length > 0 && (
                    <div className="p-3 border-b border-gray-600/40">
                      <div className="flex flex-wrap gap-2">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center gap-2 bg-gray-800/50 rounded-md px-2.5 py-1.5 backdrop-blur-sm">
                            {file.type.startsWith('image/') ? (
                              <Image className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <FileArchive className="w-3 h-3 text-emerald-400" />
                            )}
                            <span className="text-xs text-gray-300 truncate max-w-20 font-medium">
                              {file.name}
                            </span>
                            <button
                              onClick={() => removeFile(index)}
                              className="text-gray-400 hover:text-red-400 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Text Input Area - Larger and Better Spaced */}
                  <div className="relative">
                    <Textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe what you want to build... Be specific about features, design, and functionality."
                      className="min-h-36 bg-transparent border-none text-white placeholder-gray-500 resize-none focus:ring-0 focus:border-none text-sm leading-relaxed pb-12"
                      maxLength={maxWords * 6}
                    />
                    
                    {/* Bottom Controls Bar - Fixed at Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-3 bg-gray-900/20 backdrop-blur-sm rounded-b-lg border-t border-gray-700/30">
                      {/* Upload Options */}
                      <div className="flex items-center space-x-1">
                        <label className="cursor-pointer p-1.5 rounded-md hover:bg-gray-800/50 transition-colors group">
                          <Paperclip className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                          <input
                            type="file"
                            multiple
                            accept="image/*,.zip"
                            className="hidden"
                            onChange={(e) => handleFiles(Array.from(e.target.files || []))}
                          />
                        </label>
                        
                        <label className="cursor-pointer p-1.5 rounded-md hover:bg-gray-800/50 transition-colors group">
                          <Image className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFiles(Array.from(e.target.files || []))}
                          />
                        </label>
                      </div>

                      {/* Word Count */}
                      <div className="text-xs text-gray-500 font-medium">
                        {wordCount}/{maxWords}
                      </div>
                    </div>
                  </div>

                  {/* Drag & Drop Overlay */}
                  {dragActive && (
                    <div className="absolute inset-0 bg-emerald-500/10 border-2 border-emerald-400 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                        <p className="text-emerald-400 font-semibold text-sm">Drop files here</p>
                        <p className="text-emerald-300/80 text-xs mt-1">Images and ZIP files supported</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <div className="flex justify-end items-center">
                  <Button
                    onClick={handleSubmit}
                    disabled={!prompt.trim() || !selectedRole || wordCount > maxWords || isCreating}
                    className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-6 py-2 h-11 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/35 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    {isCreating ? 'Creating...' : "Let's Build This!"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, Paperclip, Image, FileArchive, Sparkles, Code, X, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useUserData } from "@/hooks/useUserData";
import { useProjects } from "@/hooks/useProjects";
import { supabase } from "@/integrations/supabase/client";

export function HomeContent() {
  const [prompt, setPrompt] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
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
      // Create project
      const projectTitle = prompt.split(' ').slice(0, 5).join(' ').substring(0, 50);
      createProject({
        title: projectTitle,
        description: prompt,
        type: selectedRole
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
      setSelectedRole("");
      setUploadedFiles([]);
      
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

      {/* Main Content - More Compact */}
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

        {/* Premium Input Section */}
        <section className="max-w-4xl mx-auto">
          <Card className="bg-gray-900/60 border-gray-700/30 backdrop-blur-lg shadow-2xl shadow-black/40">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Role Selection - Enhanced */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Choose Your AI Engineer</h3>
                    <p className="text-sm text-gray-400">Select the specialist for your project</p>
                  </div>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="w-64 bg-gray-800/60 border-gray-600/40 text-white h-11 text-sm shadow-lg">
                      <SelectValue placeholder="Select engineer type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600 backdrop-blur-xl z-50">
                      <SelectItem value="frontend" className="text-white hover:bg-gray-700">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>Frontend Engineer</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="backend" className="text-white hover:bg-gray-700">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span>Backend Engineer</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="fullstack" className="text-white hover:bg-gray-700">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>Full-Stack Engineer</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Premium Input Container */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Project Description</h3>
                    <p className="text-sm text-gray-400 mb-4">Describe your vision in detail. The more specific you are, the better results you'll get.</p>
                  </div>

                  <div 
                    className={`relative border-2 border-dashed rounded-xl transition-all duration-300 overflow-hidden ${
                      dragActive 
                        ? 'border-emerald-400 bg-emerald-500/10 shadow-lg shadow-emerald-500/20' 
                        : 'border-gray-600/40 hover:border-gray-500/50 bg-gray-800/30'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {/* Uploaded Files Display - Enhanced */}
                    {uploadedFiles.length > 0 && (
                      <div className="p-4 border-b border-gray-600/30 bg-gray-800/20">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-gray-300">Attached Files</span>
                          <span className="text-xs text-gray-500">{uploadedFiles.length} file{uploadedFiles.length > 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {uploadedFiles.map((file, index) => (
                            <div key={index} className="flex items-center gap-3 bg-gray-800/60 rounded-lg px-3 py-2 backdrop-blur-sm border border-gray-700/30">
                              <div className="flex items-center gap-2">
                                {file.type.startsWith('image/') ? (
                                  <Image className="w-4 h-4 text-emerald-400" />
                                ) : (
                                  <FileArchive className="w-4 h-4 text-emerald-400" />
                                )}
                                <span className="text-sm text-gray-300 font-medium max-w-32 truncate">
                                  {file.name}
                                </span>
                              </div>
                              <button
                                onClick={() => removeFile(index)}
                                className="text-gray-400 hover:text-red-400 transition-colors p-1 rounded-md hover:bg-red-500/10"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Enhanced Text Input Area */}
                    <div className="relative">
                      <Textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe what you want to build... Be specific about features, design, and functionality. Include details about user interface, interactions, and any special requirements."
                        className="min-h-48 bg-transparent border-none text-white placeholder-gray-500 resize-none focus:ring-0 focus:border-none text-base leading-relaxed p-6 pb-20"
                        maxLength={maxWords * 6}
                      />
                      
                      {/* Enhanced Bottom Controls Bar */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/80 to-transparent backdrop-blur-sm">
                        <div className="flex items-center justify-between p-4 border-t border-gray-700/20">
                          {/* Upload Options - Enhanced */}
                          <div className="flex items-center space-x-3">
                            <span className="text-xs text-gray-400 font-medium">Attach:</span>
                            <label className="cursor-pointer flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-800/50 transition-colors group">
                              <Paperclip className="w-4 h-4 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                              <span className="text-xs text-gray-400 group-hover:text-emerald-400 transition-colors">Files</span>
                              <input
                                type="file"
                                multiple
                                accept="image/*,.zip"
                                className="hidden"
                                onChange={(e) => handleFiles(Array.from(e.target.files || []))}
                              />
                            </label>
                            
                            <label className="cursor-pointer flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-800/50 transition-colors group">
                              <Image className="w-4 h-4 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                              <span className="text-xs text-gray-400 group-hover:text-emerald-400 transition-colors">Images</span>
                              <input
                                type="file"
                                multiple
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleFiles(Array.from(e.target.files || []))}
                              />
                            </label>
                          </div>

                          {/* Word Count - Enhanced */}
                          <div className="flex items-center space-x-3">
                            <div className={`text-sm font-medium ${
                              wordCount > maxWords * 0.9 
                                ? 'text-orange-400' 
                                : wordCount > maxWords * 0.7 
                                  ? 'text-yellow-400' 
                                  : 'text-gray-400'
                            }`}>
                              {wordCount.toLocaleString()} / {maxWords.toLocaleString()}
                            </div>
                            <div className="w-20 h-1 bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className={`h-full transition-all duration-300 ${
                                  wordCount > maxWords 
                                    ? 'bg-red-500' 
                                    : wordCount > maxWords * 0.9 
                                      ? 'bg-orange-500' 
                                      : 'bg-emerald-500'
                                }`}
                                style={{ width: `${Math.min((wordCount / maxWords) * 100, 100)}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Drag & Drop Overlay */}
                    {dragActive && (
                      <div className="absolute inset-0 bg-emerald-500/15 border-2 border-emerald-400 rounded-xl flex items-center justify-center backdrop-blur-sm z-10">
                        <div className="text-center">
                          <Upload className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                          <p className="text-emerald-400 font-semibold text-lg">Drop your files here</p>
                          <p className="text-emerald-300/80 text-sm mt-2">Images and ZIP files up to 10MB</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Enhanced Action Button */}
                <div className="flex justify-between items-center pt-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      <span>Daily: {dailyUsage}/{dailyLimits[userPlan as keyof typeof dailyLimits] === Infinity ? '∞' : dailyLimits[userPlan as keyof typeof dailyLimits]}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Monthly: {monthlyUsage}/{monthlyLimits[userPlan as keyof typeof monthlyLimits] === Infinity ? '∞' : monthlyLimits[userPlan as keyof typeof monthlyLimits]}</span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleSubmit}
                    disabled={!prompt.trim() || !selectedRole || wordCount > maxWords || isCreating}
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-black font-semibold px-8 py-3 h-12 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    {isCreating ? 'Creating Project...' : "Build My Project"}
                    <ArrowRight className="w-5 h-5 ml-2" />
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

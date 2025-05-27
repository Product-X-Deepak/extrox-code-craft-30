
import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Paperclip, Image, FileArchive, Sparkles, ArrowRight, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InputSectionProps {
  userTier: string;
  dailyUsage: number;
  monthlyUsage: number;
  onSubmit: () => void;
}

const InputSection = ({ userTier, dailyUsage, monthlyUsage, onSubmit }: InputSectionProps) => {
  const [prompt, setPrompt] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const wordCount = prompt.trim().split(/\s+/).filter(word => word.length > 0).length;
  const maxWords = userTier === "trial" ? 800 : 2000;

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

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = [...e.dataTransfer.files];
    handleFiles(files);
  }, []);

  const handleFiles = (files) => {
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

  const handleSubmit = () => {
    const dailyLimit = dailyLimits[userTier];
    const monthlyLimit = monthlyLimits[userTier];

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

    onSubmit();
    
    toast({
      title: "Request Submitted",
      description: "Your development request is being processed!",
    });
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <section className="pb-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 border border-white/10 backdrop-blur-xl shadow-2xl shadow-black/20 rounded-2xl overflow-hidden">
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Header with Role Selection and Usage Stats */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Start Building</h3>
                  <p className="text-gray-400 text-sm">Describe your project and let our AI engineers bring it to life</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="w-64 bg-white/5 border-white/20 text-white h-11 backdrop-blur-sm hover:bg-white/10 transition-colors">
                      <SelectValue placeholder="Choose your AI engineer" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900/95 border-white/20 backdrop-blur-xl rounded-xl">
                      <SelectItem value="frontend" className="text-white hover:bg-white/10 rounded-lg m-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                          <span>Frontend Engineer</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="backend" className="text-white hover:bg-white/10 rounded-lg m-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full" />
                          <span>Backend Engineer</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="fullstack" className="text-white hover:bg-white/10 rounded-lg m-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full" />
                          <span>Full-Stack Engineer</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center space-x-2 bg-white/5 rounded-full px-3 py-1.5">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="text-gray-300">Daily: {dailyUsage}/{dailyLimits[userTier] === Infinity ? '∞' : dailyLimits[userTier]}</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/5 rounded-full px-3 py-1.5">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                      <span className="text-gray-300">Monthly: {monthlyUsage}/{monthlyLimits[userTier] === Infinity ? '∞' : monthlyLimits[userTier]}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Input Area */}
              <div 
                className={`relative border-2 border-dashed rounded-xl transition-all duration-300 ${
                  dragActive 
                    ? 'border-emerald-400 bg-emerald-500/5 shadow-xl shadow-emerald-500/25' 
                    : 'border-white/20 hover:border-white/30'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {/* Uploaded Files Display */}
                {uploadedFiles.length > 0 && (
                  <div className="p-4 border-b border-white/10">
                    <div className="flex flex-wrap gap-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                          {file.type.startsWith('image/') ? (
                            <Image className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <FileArchive className="w-3 h-3 text-emerald-400" />
                          )}
                          <span className="text-xs text-gray-300 truncate max-w-32 font-medium">
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

                {/* Text Input Area */}
                <div className="relative">
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your project in detail... Include features, design preferences, functionality requirements, and any specific technologies you'd like to use."
                    className="min-h-36 bg-transparent border-none text-white placeholder-gray-500 resize-none focus:ring-0 focus:border-none text-base leading-relaxed p-6"
                    maxLength={maxWords * 6}
                  />
                  
                  {/* Upload Options and Word Count */}
                  <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                    <label className="cursor-pointer p-2 rounded-lg hover:bg-white/10 transition-colors group">
                      <Paperclip className="w-4 h-4 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                      <input
                        type="file"
                        multiple
                        accept="image/*,.zip"
                        className="hidden"
                        onChange={(e) => handleFiles([...e.target.files])}
                      />
                    </label>
                    
                    <label className="cursor-pointer p-2 rounded-lg hover:bg-white/10 transition-colors group">
                      <Image className="w-4 h-4 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFiles([...e.target.files])}
                      />
                    </label>
                  </div>

                  <div className="absolute bottom-4 right-4 text-xs text-gray-500 font-medium">
                    {wordCount}/{maxWords} words
                  </div>
                </div>

                {/* Drag & Drop Overlay */}
                {dragActive && (
                  <div className="absolute inset-0 bg-emerald-500/10 border-2 border-emerald-400 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <div className="text-center">
                      <Upload className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                      <p className="text-emerald-400 font-bold text-lg">Drop files here</p>
                      <p className="text-emerald-300/80 text-sm mt-1">Images and ZIP files supported</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="flex justify-end pt-2">
                <Button
                  onClick={handleSubmit}
                  disabled={!prompt.trim() || !selectedRole || wordCount > maxWords}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-black font-bold px-8 py-3 h-12 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-base"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Build My Project
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default InputSection;

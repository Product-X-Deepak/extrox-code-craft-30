
import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Upload, Paperclip, Image, FileArchive, Sparkles, Code, Check, X, ArrowRight, Zap, Shield, Rocket, Star, Brain, Cpu, Network } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [userTier, setUserTier] = useState("trial");
  const [dailyUsage, setDailyUsage] = useState(0);
  const [monthlyUsage, setMonthlyUsage] = useState(0);
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

  const pricing = {
    USD: {
      premium: 20,
      pro: 50
    },
    INR: {
      premium: 1650,
      pro: 4150
    }
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

    setDailyUsage(prev => prev + 1);
    setMonthlyUsage(prev => prev + 1);
    
    toast({
      title: "Request Submitted",
      description: "Your development request is being processed!",
    });
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black relative overflow-hidden">
      {/* Sophisticated Background */}
      <div className="absolute inset-0">
        {/* Animated Grid with Depth */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-20" />
        
        {/* Multi-layered Orbs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-500/30 via-emerald-400/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-32 w-80 h-80 bg-gradient-to-tl from-slate-300/10 via-white/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-r from-emerald-400/20 to-slate-200/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjEiLz48L2ZpbHRlcj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] repeat" />
      </div>

      {/* Ultra-Premium Header */}
      <header className="relative border-b border-white/5 bg-black/20 backdrop-blur-3xl z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-7xl">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-2xl shadow-emerald-500/40">
                <Code className="w-5 h-5 text-black font-bold" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-xl blur animate-pulse" />
            </div>
            <span className="text-2xl font-black text-white tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Extrox.dev
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/5 font-medium text-sm px-6 py-2.5 h-auto transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-white/10">
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-emerald-500 via-emerald-500 to-emerald-600 hover:from-emerald-400 hover:via-emerald-500 hover:to-emerald-600 text-black font-semibold px-6 py-2.5 h-auto text-sm shadow-2xl shadow-emerald-500/50 hover:shadow-emerald-500/70 transition-all duration-500 transform hover:scale-105 border border-emerald-400/50">
              <Sparkles className="w-4 h-4 mr-2" />
              Get Started Free
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <section className="pt-16 pb-12 px-6">
          <div className="container mx-auto text-center max-w-5xl">
            <Badge className="mb-8 bg-emerald-500/10 text-emerald-300 border-emerald-500/20 px-4 py-2 text-sm font-medium backdrop-blur-xl shadow-lg shadow-emerald-500/10">
              <Brain className="w-4 h-4 mr-2" />
              Intelligent Development Platform
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.9] tracking-tight">
              What should we
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-white bg-clip-text text-transparent block mt-2">
                build today?
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-400 max-w-4xl mx-auto mb-16 leading-relaxed font-light">
              Choose your AI engineer specialization and watch our adaptive models craft your vision. 
              <span className="text-white font-medium"> Frontend specialists</span>, 
              <span className="text-white font-medium"> backend experts</span>, or 
              <span className="text-white font-medium"> full-stack architects</span> — each optimized for precision.
            </p>
          </div>
        </section>

        {/* Premium Input Section */}
        <section className="pb-16 px-6">
          <div className="container mx-auto max-w-4xl">
            {/* Ultra-Premium Card with Advanced Glassmorphism */}
            <Card className="relative bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] border border-white/10 backdrop-blur-3xl shadow-2xl shadow-black/50 overflow-hidden group">
              {/* Animated Border Glow */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-emerald-500/20 via-transparent to-emerald-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Inner Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.03] via-transparent to-slate-200/[0.02] rounded-lg" />
              
              <CardContent className="p-8 relative">
                <div className="space-y-6">
                  {/* Compact Header */}
                  <div className="flex flex-wrap gap-6 items-center justify-between">
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger className="w-72 bg-black/20 border-white/15 text-white h-11 text-sm backdrop-blur-xl hover:bg-black/30 transition-all duration-300 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20">
                        <SelectValue placeholder="Select AI Engineer Type" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/95 border-white/20 backdrop-blur-3xl shadow-2xl">
                        <SelectItem value="frontend" className="text-white hover:bg-white/10 focus:bg-white/10">
                          <div className="flex items-center space-x-2">
                            <Cpu className="w-4 h-4 text-emerald-400" />
                            <span>Frontend Engineer</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="backend" className="text-white hover:bg-white/10 focus:bg-white/10">
                          <div className="flex items-center space-x-2">
                            <Network className="w-4 h-4 text-emerald-400" />
                            <span>Backend Engineer</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="fullstack" className="text-white hover:bg-white/10 focus:bg-white/10">
                          <div className="flex items-center space-x-2">
                            <Brain className="w-4 h-4 text-emerald-400" />
                            <span>Full-Stack Engineer</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div className="flex items-center space-x-6 text-xs text-slate-400">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="font-medium">Daily: {dailyUsage}/{dailyLimits[userTier] === Infinity ? '∞' : dailyLimits[userTier]}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                        <span className="font-medium">Monthly: {monthlyUsage}/{monthlyLimits[userTier] === Infinity ? '∞' : monthlyLimits[userTier]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Input Area */}
                  <div 
                    className={`relative border-2 border-dashed rounded-2xl transition-all duration-500 ${
                      dragActive 
                        ? 'border-emerald-400/70 bg-emerald-500/5 shadow-2xl shadow-emerald-500/20 scale-[1.02]' 
                        : 'border-white/15 hover:border-white/25'
                    } backdrop-blur-xl group/input`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {/* File Previews */}
                    {uploadedFiles.length > 0 && (
                      <div className="p-6 border-b border-white/10">
                        <div className="flex flex-wrap gap-3">
                          {uploadedFiles.map((file, index) => (
                            <div key={index} className="flex items-center gap-3 bg-black/30 rounded-xl px-4 py-3 backdrop-blur-sm border border-white/10 group hover:bg-black/40 transition-all duration-300">
                              {file.type.startsWith('image/') ? (
                                <Image className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <FileArchive className="w-4 h-4 text-emerald-400" />
                              )}
                              <span className="text-sm text-slate-300 truncate max-w-32 font-medium">
                                {file.name}
                              </span>
                              <button
                                onClick={() => removeFile(index)}
                                className="text-slate-400 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Text Input */}
                    <div className="relative">
                      <Textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe your project vision in detail... Include features, design preferences, and technical requirements."
                        className="min-h-40 bg-transparent border-none text-white placeholder-slate-500 resize-none focus:ring-0 focus:border-none text-base leading-relaxed p-6 pr-16"
                        maxLength={maxWords * 6}
                      />
                      
                      {/* Upload Controls */}
                      <div className="absolute bottom-4 left-6 flex items-center space-x-3">
                        <label className="cursor-pointer p-2.5 rounded-lg hover:bg-white/10 transition-all duration-300 group/upload">
                          <Paperclip className="w-4 h-4 text-slate-400 group-hover/upload:text-emerald-400 transition-colors" />
                          <input
                            type="file"
                            multiple
                            accept="image/*,.zip"
                            className="hidden"
                            onChange={(e) => handleFiles([...e.target.files])}
                          />
                        </label>
                        
                        <label className="cursor-pointer p-2.5 rounded-lg hover:bg-white/10 transition-all duration-300 group/upload">
                          <Image className="w-4 h-4 text-slate-400 group-hover/upload:text-emerald-400 transition-colors" />
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFiles([...e.target.files])}
                          />
                        </label>
                      </div>

                      {/* Word Counter */}
                      <div className="absolute bottom-4 right-6 text-xs text-slate-500 font-medium bg-black/20 px-3 py-1 rounded-lg backdrop-blur-sm">
                        {wordCount}/{maxWords}
                      </div>
                    </div>

                    {/* Drag Overlay */}
                    {dragActive && (
                      <div className="absolute inset-0 bg-emerald-500/10 border-2 border-emerald-400 rounded-2xl flex items-center justify-center backdrop-blur-xl z-10">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <Upload className="w-8 h-8 text-emerald-400" />
                          </div>
                          <p className="text-emerald-400 font-semibold text-lg">Drop files here</p>
                          <p className="text-emerald-300/80 text-sm mt-1">Images and ZIP files supported</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Row */}
                  <div className="flex justify-between items-center pt-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowPricing(!showPricing)}
                      className="border-white/20 text-white hover:bg-white/5 hover:border-white/30 font-medium text-sm px-6 py-2.5 h-auto backdrop-blur-sm transition-all duration-300"
                    >
                      <Star className="w-4 h-4 mr-2" />
                      View Pricing
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={!prompt.trim() || !selectedRole || wordCount > maxWords}
                      className="bg-gradient-to-r from-emerald-500 via-emerald-500 to-emerald-600 hover:from-emerald-400 hover:via-emerald-500 hover:to-emerald-600 text-black font-semibold px-8 py-2.5 h-auto shadow-2xl shadow-emerald-500/50 hover:shadow-emerald-500/70 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm transform hover:scale-105"
                    >
                      <Rocket className="w-4 h-4 mr-2" />
                      Let's Build This!
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Sophisticated Pricing Section */}
        {showPricing && (
          <section className="pb-20 px-6">
            <div className="container mx-auto max-w-7xl">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Choose Your Plan</h2>
                <p className="text-xl text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed">Start free and scale as you grow. All plans include hosting and database infrastructure.</p>
                <div className="flex items-center justify-center space-x-4">
                  <span className={`text-sm font-medium transition-colors ${currency === 'USD' ? 'text-white' : 'text-slate-400'}`}>USD</span>
                  <Switch
                    checked={currency === 'INR'}
                    onCheckedChange={(checked) => setCurrency(checked ? 'INR' : 'USD')}
                    className="data-[state=checked]:bg-emerald-500 scale-110"
                  />
                  <span className={`text-sm font-medium transition-colors ${currency === 'INR' ? 'text-white' : 'text-slate-400'}`}>INR</span>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-8">
                {/* Trial Plan */}
                <Card className="bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent border border-white/10 backdrop-blur-3xl relative overflow-hidden group hover:border-white/20 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.02] to-transparent" />
                  <CardContent className="p-8 relative">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-white mb-4">Trial</h3>
                      <div className="text-4xl font-bold text-emerald-400 mb-3">Free</div>
                      <p className="text-slate-400 text-sm">Forever</p>
                    </div>
                    <ul className="space-y-4 text-sm mb-8">
                      <li className="flex items-center text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                        1 request per day
                      </li>
                      <li className="flex items-center text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                        20 requests per month
                      </li>
                      <li className="flex items-center text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                        Free Vercel hosting
                      </li>
                      <li className="flex items-center text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                        Free Supabase database
                      </li>
                    </ul>
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold py-3 text-sm h-auto transition-all duration-300 transform hover:scale-105">
                      Get Started
                    </Button>
                  </CardContent>
                </Card>

                {/* Premium Plan */}
                <Card className="bg-gradient-to-br from-white/10 via-white/[0.05] to-transparent border border-emerald-500/30 backdrop-blur-3xl relative overflow-hidden transform scale-105 shadow-2xl shadow-emerald-500/20">
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-black px-4 py-1.5 font-semibold text-xs z-10">
                    Most Popular
                  </Badge>
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.05] to-transparent" />
                  <CardContent className="p-8 relative">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-white mb-4">Premium</h3>
                      <div className="text-4xl font-bold text-emerald-400 mb-3">
                        {currency === 'USD' ? '$' : '₹'}{pricing[currency].premium}
                      </div>
                      <p className="text-slate-400 text-sm">per month</p>
                    </div>
                    <ul className="space-y-4 text-sm mb-8">
                      <li className="flex items-center text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                        15 requests per day
                      </li>
                      <li className="flex items-center text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                        300 requests per month
                      </li>
                      <li className="flex items-center text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                        Free Vercel hosting
                      </li>
                      <li className="flex items-center text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                        Free Supabase database
                      </li>
                      <li className="flex items-center text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                        Priority support
                      </li>
                    </ul>
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold py-3 text-sm h-auto transition-all duration-300 transform hover:scale-105">
                      Upgrade Now
                    </Button>
                  </CardContent>
                </Card>

                {/* Pro Plan */}
                <Card className="bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent border border-white/10 backdrop-blur-3xl relative overflow-hidden group hover:border-white/20 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
                  <CardContent className="p-8 relative">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-white mb-4">Pro</h3>
                      <div className="text-4xl font-bold text-white mb-3">
                        {currency === 'USD' ? '$' : '₹'}{pricing[currency].pro}
                      </div>
                      <p className="text-slate-400 text-sm">per month</p>
                    </div>
                    <ul className="space-y-4 text-sm mb-8">
                      <li className="flex items-center text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                        30 requests per day
                      </li>
                      <li className="flex items-center text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                        500 requests per month
                      </li>
                      <li className="flex items-center text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                        Free Vercel hosting
                      </li>
                      <li className="flex items-center text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                        Free Supabase database
                      </li>
                      <li className="flex items-center text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                        Advanced features
                      </li>
                    </ul>
                    <Button className="w-full bg-white hover:bg-slate-100 text-black font-semibold py-3 text-sm h-auto transition-all duration-300 transform hover:scale-105">
                      Upgrade Now
                    </Button>
                  </CardContent>
                </Card>

                {/* Enterprise Plan */}
                <Card className="bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent border border-white/10 backdrop-blur-3xl relative overflow-hidden group hover:border-white/20 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-500/[0.02] to-transparent" />
                  <CardContent className="p-8 relative">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-white mb-4">Enterprise</h3>
                      <div className="text-3xl font-bold text-white mb-3">Custom</div>
                      <p className="text-slate-400 text-sm">Contact us</p>
                    </div>
                    <ul className="space-y-4 text-sm mb-8">
                      <li className="flex items-center text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                        Unlimited requests
                      </li>
                      <li className="flex items-center text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                        Custom solutions
                      </li>
                      <li className="flex items-center text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                        Dedicated support
                      </li>
                      <li className="flex items-center text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                        Custom integrations
                      </li>
                      <li className="flex items-center text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-3 flex-shrink-0" />
                        SLA guarantee
                      </li>
                    </ul>
                    <Button className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 text-sm h-auto transition-all duration-300 transform hover:scale-105">
                      Contact Sales
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <p className="text-center text-slate-500 text-sm mt-8 max-w-3xl mx-auto">
                * Additional costs may apply if scaling beyond free limits of Vercel and Supabase
              </p>
            </div>
          </section>
        )}
      </main>

      {/* Sophisticated Footer */}
      <footer className="border-t border-white/5 bg-black/30 backdrop-blur-3xl">
        <div className="container mx-auto px-6 py-12 max-w-7xl">
          <div className="grid md:grid-cols-4 gap-10">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Code className="w-4 h-4 text-black" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-xl blur animate-pulse" />
                </div>
                <span className="text-xl font-bold text-white">Extrox.dev</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-sm">
                The next generation of AI-powered development. Build, deploy, and scale with intelligent precision.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6 text-base">Product</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors duration-300">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6 text-base">Company</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors duration-300">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6 text-base">Support</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors duration-300">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/5 mt-12 pt-8 text-center text-slate-500 text-sm">
            <p>&copy; 2025 Extrox.dev. All rights reserved. Built with intelligence for developers worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

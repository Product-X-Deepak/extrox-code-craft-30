
import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Upload, Paperclip, Image, FileArchive, Sparkles, Code, Database, Globe, Check, Star, X, ArrowRight, Zap, Shield, Rocket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-10" />
      
      {/* Multiple Animated Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-emerald-500/15 via-emerald-400/10 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-emerald-400/12 via-cyan-400/8 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-r from-emerald-600/8 to-transparent rounded-full blur-3xl animate-pulse delay-2000" />
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-gradient-to-l from-emerald-300/6 to-transparent rounded-full blur-3xl animate-pulse delay-3000" />

      {/* Sparkle Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/5 w-1 h-1 bg-emerald-400 rounded-full animate-ping" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-emerald-300 rounded-full animate-ping delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-emerald-500 rounded-full animate-ping delay-2000" />
        <div className="absolute bottom-1/3 right-1/5 w-1 h-1 bg-emerald-400 rounded-full animate-ping delay-3000" />
      </div>

      {/* Enhanced Header with Shine Effects */}
      <header className="relative border-b border-gray-800/40 bg-black/70 backdrop-blur-xl z-50 shadow-xl shadow-emerald-500/5">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-xl shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-110">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl" />
              <Code className="w-5 h-5 text-black relative z-10" />
            </div>
            <span className="text-2xl font-black text-white tracking-tight bg-gradient-to-r from-white to-emerald-100 bg-clip-text">Extrox.dev</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800/60 font-medium px-5 py-2 h-10 transition-all duration-200">
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-black font-bold px-6 py-2 h-10 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/35 transition-all duration-300 hover:scale-105">
              Get Started Free
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        {/* Enhanced Hero Section */}
        <section className="pt-20 pb-12 px-6">
          <div className="container mx-auto text-center max-w-5xl">
            <Badge className="mb-8 bg-gradient-to-r from-emerald-500/15 to-emerald-400/10 text-emerald-300 border-emerald-500/30 px-4 py-2 text-sm font-semibold shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300">
              <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
              AI-Powered Development Platform
            </Badge>
            
            <h1 className="text-6xl md:text-7xl font-black text-white mb-8 leading-[0.85] tracking-tight">
              What should we
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-white bg-clip-text text-transparent block mt-2 relative">
                build today?
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-emerald-300/20 to-white/20 blur-2xl -z-10" />
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-16 leading-relaxed font-light">
              Your AI development team with specialized 
              <span className="text-emerald-300 font-semibold"> frontend</span>, 
              <span className="text-emerald-300 font-semibold"> backend</span>, and 
              <span className="text-emerald-300 font-semibold"> full-stack engineers</span> ready to build your vision.
            </p>
          </div>
        </section>

        {/* Enhanced Input Section */}
        <section className="pb-16 px-6">
          <div className="container mx-auto max-w-4xl">
            <Card className="bg-gradient-to-br from-gray-900/60 via-gray-900/50 to-gray-800/60 border-gray-700/50 backdrop-blur-xl shadow-2xl shadow-black/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-400/5 pointer-events-none" />
              <CardContent className="p-8 relative z-10">
                <div className="space-y-6">
                  {/* Enhanced Role Selection and Usage Stats */}
                  <div className="flex flex-wrap gap-6 items-center justify-between">
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger className="w-72 bg-gray-800/60 border-gray-600/50 text-white h-12 text-base font-medium shadow-lg hover:bg-gray-800/80 transition-all duration-200">
                        <SelectValue placeholder="Choose your engineer" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800/95 border-gray-600/50 backdrop-blur-xl shadow-xl">
                        <SelectItem value="frontend" className="text-white hover:bg-gray-700/80 py-3">🎨 Frontend Engineer</SelectItem>
                        <SelectItem value="backend" className="text-white hover:bg-gray-700/80 py-3">⚙️ Backend Engineer</SelectItem>
                        <SelectItem value="fullstack" className="text-white hover:bg-gray-700/80 py-3">🚀 Full-Stack Engineer</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-300">
                      <div className="flex items-center space-x-2 bg-gray-800/40 px-3 py-2 rounded-lg border border-gray-700/40">
                        <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full animate-pulse" />
                        <span className="font-medium">Daily: {dailyUsage}/{dailyLimits[userTier] === Infinity ? '∞' : dailyLimits[userTier]}</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-800/40 px-3 py-2 rounded-lg border border-gray-700/40">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse" />
                        <span className="font-medium">Monthly: {monthlyUsage}/{monthlyLimits[userTier] === Infinity ? '∞' : monthlyLimits[userTier]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Input Box */}
                  <div 
                    className={`relative border-2 border-dashed rounded-xl transition-all duration-300 ${
                      dragActive 
                        ? 'border-emerald-400 bg-emerald-500/10 shadow-xl shadow-emerald-500/20' 
                        : 'border-gray-600/50 hover:border-gray-500/60 hover:bg-gray-800/20'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {/* Uploaded Files Display */}
                    {uploadedFiles.length > 0 && (
                      <div className="p-6 border-b border-gray-600/50">
                        <div className="flex flex-wrap gap-3">
                          {uploadedFiles.map((file, index) => (
                            <div key={index} className="flex items-center gap-3 bg-gradient-to-r from-gray-800/60 to-gray-700/60 rounded-lg px-4 py-3 backdrop-blur-sm border border-gray-600/30 shadow-lg">
                              {file.type.startsWith('image/') ? (
                                <Image className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <FileArchive className="w-4 h-4 text-emerald-400" />
                              )}
                              <span className="text-sm text-gray-200 truncate max-w-32 font-medium">
                                {file.name}
                              </span>
                              <button
                                onClick={() => removeFile(index)}
                                className="text-gray-400 hover:text-red-400 transition-colors hover:scale-110"
                              >
                                <X className="w-4 h-4" />
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
                        placeholder="Describe what you want to build... Be specific about features, design, and functionality."
                        className="min-h-40 bg-transparent border-none text-white placeholder-gray-400 resize-none focus:ring-0 focus:border-none text-lg leading-relaxed font-light"
                        maxLength={maxWords * 6}
                      />
                      
                      {/* Enhanced Upload Options Bar */}
                      <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                        <label className="cursor-pointer p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-200 group border border-gray-700/30 hover:border-emerald-500/30">
                          <Paperclip className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                          <input
                            type="file"
                            multiple
                            accept="image/*,.zip"
                            className="hidden"
                            onChange={(e) => handleFiles([...e.target.files])}
                          />
                        </label>
                        
                        <label className="cursor-pointer p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-200 group border border-gray-700/30 hover:border-emerald-500/30">
                          <Image className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFiles([...e.target.files])}
                          />
                        </label>
                      </div>

                      {/* Enhanced Word Count */}
                      <div className="absolute bottom-4 right-4 text-sm text-gray-400 font-medium bg-gray-800/40 px-3 py-2 rounded-lg border border-gray-700/30">
                        {wordCount}/{maxWords} words
                      </div>
                    </div>

                    {/* Enhanced Drag & Drop Overlay */}
                    {dragActive && (
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/15 via-emerald-400/10 to-emerald-500/15 border-2 border-emerald-400 rounded-xl flex items-center justify-center backdrop-blur-md">
                        <div className="text-center">
                          <Upload className="w-12 h-12 text-emerald-400 mx-auto mb-4 animate-bounce" />
                          <p className="text-emerald-300 font-bold text-lg">Drop files here</p>
                          <p className="text-emerald-200 text-sm mt-2">Images and ZIP files supported</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Enhanced Action Button */}
                  <div className="flex justify-end pt-2">
                    <Button
                      onClick={handleSubmit}
                      disabled={!prompt.trim() || !selectedRole || wordCount > maxWords}
                      className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-black font-bold px-8 py-3 h-12 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 text-lg"
                    >
                      <Sparkles className="w-5 h-5 mr-3" />
                      Let's Build This!
                      <ArrowRight className="w-5 h-5 ml-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Always Visible Enhanced Pricing Section */}
        <section className="pb-16 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text">Choose Your Plan</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-light">Start free and scale as you grow. All plans include hosting and database.</p>
              <div className="flex items-center justify-center space-x-4 bg-gray-800/40 rounded-xl p-3 border border-gray-700/40 max-w-xs mx-auto">
                <span className={`text-sm font-semibold transition-colors ${currency === 'USD' ? 'text-emerald-400' : 'text-gray-400'}`}>USD</span>
                <Switch
                  checked={currency === 'INR'}
                  onCheckedChange={(checked) => setCurrency(checked ? 'INR' : 'USD')}
                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-emerald-500 data-[state=checked]:to-emerald-600"
                />
                <span className={`text-sm font-semibold transition-colors ${currency === 'INR' ? 'text-emerald-400' : 'text-gray-400'}`}>INR</span>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {/* Enhanced Trial Plan */}
              <Card className="bg-gradient-to-br from-gray-900/70 via-gray-900/60 to-gray-800/70 border-gray-700/50 backdrop-blur-xl relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 via-transparent to-gray-400/5" />
                <CardContent className="p-8 relative z-10">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">Trial</h3>
                    <div className="text-4xl font-black text-emerald-400 mb-2">Free</div>
                    <p className="text-gray-400 text-base">Forever</p>
                  </div>
                  <ul className="space-y-4 text-base mb-8">
                    <li className="flex items-center text-gray-200">
                      <Check className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                      1 request per day
                    </li>
                    <li className="flex items-center text-gray-200">
                      <Check className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                      20 requests per month
                    </li>
                    <li className="flex items-center text-gray-200">
                      <Check className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                      Free Vercel hosting
                    </li>
                    <li className="flex items-center text-gray-200">
                      <Check className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                      Free Supabase database
                    </li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-black font-bold py-3 h-12 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300">
                    Get Started
                  </Button>
                  <p className="text-xs text-gray-500 mt-4 text-center">
                    * Extra costs may apply if scaling beyond free limits
                  </p>
                </CardContent>
              </Card>

              {/* Enhanced Premium Plan */}
              <Card className="bg-gradient-to-br from-emerald-900/30 via-emerald-800/20 to-gray-900/70 border-emerald-500/50 backdrop-blur-xl relative overflow-hidden transform scale-110 shadow-2xl shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-emerald-400/5 to-transparent" />
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-black px-4 py-2 font-bold text-sm shadow-lg shadow-emerald-500/30">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
                <CardContent className="p-8 relative z-10">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">Premium</h3>
                    <div className="text-4xl font-black text-emerald-400 mb-2">
                      {currency === 'USD' ? '$' : '₹'}{pricing[currency].premium}
                    </div>
                    <p className="text-gray-300 text-base">per month</p>
                  </div>
                  <ul className="space-y-4 text-base mb-8">
                    <li className="flex items-center text-gray-200">
                      <Check className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                      15 requests per day
                    </li>
                    <li className="flex items-center text-gray-200">
                      <Check className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                      300 requests per month
                    </li>
                    <li className="flex items-center text-gray-200">
                      <Check className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                      Free Vercel hosting
                    </li>
                    <li className="flex items-center text-gray-200">
                      <Check className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                      Free Supabase database
                    </li>
                    <li className="flex items-center text-gray-200">
                      <Check className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                      Priority support
                    </li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-black font-bold py-3 h-12 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/35 transition-all duration-300 hover:scale-105">
                    <Zap className="w-4 h-4 mr-2" />
                    Upgrade Now
                  </Button>
                  <p className="text-xs text-gray-500 mt-4 text-center">
                    * Extra costs may apply if scaling beyond free limits
                  </p>
                </CardContent>
              </Card>

              {/* Enhanced Pro Plan */}
              <Card className="bg-gradient-to-br from-gray-900/70 via-gray-900/60 to-gray-800/70 border-gray-700/50 backdrop-blur-xl relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
                <CardContent className="p-8 relative z-10">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">Pro</h3>
                    <div className="text-4xl font-black text-white mb-2">
                      {currency === 'USD' ? '$' : '₹'}{pricing[currency].pro}
                    </div>
                    <p className="text-gray-300 text-base">per month</p>
                  </div>
                  <ul className="space-y-4 text-base mb-8">
                    <li className="flex items-center text-gray-200">
                      <Check className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                      30 requests per day
                    </li>
                    <li className="flex items-center text-gray-200">
                      <Check className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                      500 requests per month
                    </li>
                    <li className="flex items-center text-gray-200">
                      <Check className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                      Free Vercel hosting
                    </li>
                    <li className="flex items-center text-gray-200">
                      <Check className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                      Free Supabase database
                    </li>
                    <li className="flex items-center text-gray-200">
                      <Check className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                      Advanced features
                    </li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-white text-black font-bold py-3 h-12 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <Rocket className="w-4 h-4 mr-2" />
                    Upgrade Now
                  </Button>
                  <p className="text-xs text-gray-500 mt-4 text-center">
                    * Extra costs may apply if scaling beyond free limits
                  </p>
                </CardContent>
              </Card>

              {/* Enhanced Enterprise Plan */}
              <Card className="bg-gradient-to-br from-gray-900/70 via-gray-900/60 to-gray-800/70 border-gray-700/50 backdrop-blur-xl relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5" />
                <CardContent className="p-8 relative z-10">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">Enterprise</h3>
                    <div className="text-3xl font-black text-white mb-2">Custom</div>
                    <p className="text-gray-300 text-base">Contact us</p>
                  </div>
                  <ul className="space-y-4 text-base mb-8">
                    <li className="flex items-center text-gray-200">
                      <Check className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                      Unlimited requests
                    </li>
                    <li className="flex items-center text-gray-200">
                      <Check className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                      Custom solutions
                    </li>
                    <li className="flex items-center text-gray-200">
                      <Check className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                      Dedicated support
                    </li>
                    <li className="flex items-center text-gray-200">
                      <Check className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                      Custom integrations
                    </li>
                    <li className="flex items-center text-gray-200">
                      <Check className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                      SLA guarantee
                    </li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-bold py-3 h-12 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <Shield className="w-4 h-4 mr-2" />
                    Contact Sales
                  </Button>
                  <p className="text-xs text-gray-500 mt-4 text-center">
                    * Customizable according to needs
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="border-t border-gray-800/40 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-10">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <Code className="w-4 h-4 text-black" />
                </div>
                <span className="text-xl font-black text-white">Extrox.dev</span>
              </div>
              <p className="text-gray-300 leading-relaxed text-base">
                The future of AI-powered development. Build, deploy, and scale faster than ever.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Product</h4>
              <ul className="space-y-4 text-gray-300 text-base">
                <li><a href="#" className="hover:text-emerald-400 transition-colors duration-200">Features</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors duration-200">Pricing</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors duration-200">Documentation</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors duration-200">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Company</h4>
              <ul className="space-y-4 text-gray-300 text-base">
                <li><a href="#" className="hover:text-emerald-400 transition-colors duration-200">About</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors duration-200">Blog</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors duration-200">Careers</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors duration-200">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Support</h4>
              <ul className="space-y-4 text-gray-300 text-base">
                <li><a href="#" className="hover:text-emerald-400 transition-colors duration-200">Help Center</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors duration-200">Community</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors duration-200">Status</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors duration-200">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800/40 mt-12 pt-8 text-center text-gray-400 text-base">
            <p>&copy; 2025 Extrox.dev. All rights reserved. Built with love for developers worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

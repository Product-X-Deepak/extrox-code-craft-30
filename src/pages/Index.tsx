
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10 animate-pulse" />
        
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        
        {/* Sparkle Effects */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full animate-ping" />
        <div className="absolute top-40 right-32 w-1 h-1 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '3s' }} />
      </div>

      {/* Header */}
      <header className="relative border-b border-white/10 bg-black/40 backdrop-blur-xl z-50 shadow-2xl shadow-purple-500/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 via-pink-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-2xl shadow-purple-500/50 animate-pulse">
              <Code className="w-5 h-5 text-black font-bold" />
            </div>
            <span className="text-2xl font-black text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text tracking-tight">
              Extrox.dev
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10 font-semibold px-6 py-3 h-11 border border-white/20 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600 text-white font-bold px-8 py-3 h-11 shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 border-2 border-white/20 backdrop-blur-sm hover:scale-105">
              <Sparkles className="w-4 h-4 mr-2" />
              Get Started Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <section className="pt-20 pb-12 px-6">
          <div className="container mx-auto text-center max-w-5xl">
            <Badge className="mb-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30 px-6 py-2 text-sm font-bold backdrop-blur-sm shadow-xl shadow-purple-500/20 animate-pulse">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Development Platform
            </Badge>
            
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.85] tracking-tight">
              <span className="text-white drop-shadow-2xl">What should we</span>
              <span className="block mt-2 text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text animate-pulse">
                build today?
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-16 leading-relaxed font-light">
              Your AI development team with specialized 
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-bold"> frontend</span>, 
              <span className="text-transparent bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text font-bold"> backend</span>, and 
              <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-bold"> full-stack engineers</span> ready to build your vision.
            </p>
          </div>
        </section>

        {/* Input Section */}
        <section className="pb-16 px-6">
          <div className="container mx-auto max-w-4xl">
            <Card className="bg-black/40 border-white/20 backdrop-blur-xl shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-500">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Role Selection and Usage Stats */}
                  <div className="flex flex-wrap gap-6 items-center justify-between">
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger className="w-80 bg-white/5 border-white/20 text-white h-12 text-base font-semibold backdrop-blur-sm shadow-lg shadow-purple-500/10 hover:bg-white/10 transition-all duration-300">
                        <SelectValue placeholder="Choose your engineer" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-white/20 backdrop-blur-xl shadow-2xl shadow-purple-500/20">
                        <SelectItem value="frontend" className="text-white hover:bg-purple-500/20 font-medium">
                          <div className="flex items-center space-x-2">
                            <Zap className="w-4 h-4 text-cyan-400" />
                            <span>Frontend Engineer</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="backend" className="text-white hover:bg-purple-500/20 font-medium">
                          <div className="flex items-center space-x-2">
                            <Database className="w-4 h-4 text-green-400" />
                            <span>Backend Engineer</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="fullstack" className="text-white hover:bg-purple-500/20 font-medium">
                          <div className="flex items-center space-x-2">
                            <Rocket className="w-4 h-4 text-purple-400" />
                            <span>Full-Stack Engineer</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-300 font-medium">
                      <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-lg backdrop-blur-sm">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span>Daily: {dailyUsage}/{dailyLimits[userTier] === Infinity ? '∞' : dailyLimits[userTier]}</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-lg backdrop-blur-sm">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                        <span>Monthly: {monthlyUsage}/{monthlyLimits[userTier] === Infinity ? '∞' : monthlyLimits[userTier]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Input Box with Integrated File Upload */}
                  <div 
                    className={`relative border-2 border-dashed rounded-xl transition-all duration-500 ${
                      dragActive 
                        ? 'border-purple-400 bg-purple-500/10 shadow-2xl shadow-purple-500/30' 
                        : 'border-white/20 hover:border-white/30'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {/* Uploaded Files Display */}
                    {uploadedFiles.length > 0 && (
                      <div className="p-6 border-b border-white/20">
                        <div className="flex flex-wrap gap-3">
                          {uploadedFiles.map((file, index) => (
                            <div key={index} className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3 backdrop-blur-sm border border-white/20 shadow-lg">
                              {file.type.startsWith('image/') ? (
                                <Image className="w-4 h-4 text-cyan-400" />
                              ) : (
                                <FileArchive className="w-4 h-4 text-purple-400" />
                              )}
                              <span className="text-sm text-gray-300 truncate max-w-32 font-medium">
                                {file.name}
                              </span>
                              <button
                                onClick={() => removeFile(index)}
                                className="text-gray-400 hover:text-red-400 transition-colors p-1 hover:bg-red-500/20 rounded"
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
                        placeholder="Describe what you want to build... Be specific about features, design, and functionality."
                        className="min-h-40 bg-transparent border-none text-white placeholder-gray-400 resize-none focus:ring-0 focus:border-none text-lg leading-relaxed font-medium"
                        maxLength={maxWords * 6}
                      />
                      
                      {/* Upload Options Bar */}
                      <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                        <label className="cursor-pointer p-3 rounded-lg hover:bg-white/10 transition-all duration-300 group border border-white/20 backdrop-blur-sm">
                          <Paperclip className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                          <input
                            type="file"
                            multiple
                            accept="image/*,.zip"
                            className="hidden"
                            onChange={(e) => handleFiles([...e.target.files])}
                          />
                        </label>
                        
                        <label className="cursor-pointer p-3 rounded-lg hover:bg-white/10 transition-all duration-300 group border border-white/20 backdrop-blur-sm">
                          <Image className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFiles([...e.target.files])}
                          />
                        </label>
                      </div>

                      {/* Word Count */}
                      <div className="absolute bottom-4 right-4 text-sm text-gray-400 font-semibold bg-white/5 px-3 py-2 rounded-lg backdrop-blur-sm">
                        {wordCount}/{maxWords} words
                      </div>
                    </div>

                    {/* Drag & Drop Overlay */}
                    {dragActive && (
                      <div className="absolute inset-0 bg-purple-500/20 border-2 border-purple-400 rounded-xl flex items-center justify-center backdrop-blur-lg">
                        <div className="text-center">
                          <Upload className="w-16 h-16 text-purple-400 mx-auto mb-4 animate-bounce" />
                          <p className="text-purple-300 font-bold text-xl">Drop files here</p>
                          <p className="text-purple-200 text-sm mt-2">Images and ZIP files supported</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center pt-4">
                    <Button
                      onClick={handleSubmit}
                      disabled={!prompt.trim() || !selectedRole || wordCount > maxWords}
                      className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600 text-white font-bold px-12 py-4 h-14 text-lg shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-white/20 backdrop-blur-sm hover:scale-105"
                    >
                      <Sparkles className="w-5 h-5 mr-3" />
                      Let's Build This Magic!
                      <ArrowRight className="w-5 h-5 ml-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pricing Section - Always Visible */}
        <section className="pb-16 px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6 drop-shadow-2xl">
                Choose Your
                <span className="block text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text animate-pulse">
                  Power Plan
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-light">
                Start free and scale as you grow. All plans include hosting and database.
              </p>
              <div className="flex items-center justify-center space-x-4 bg-white/5 p-2 rounded-xl backdrop-blur-sm border border-white/20 w-fit mx-auto">
                <span className={`text-base font-bold px-4 py-2 rounded-lg transition-all duration-300 ${currency === 'USD' ? 'text-white bg-purple-500/30' : 'text-gray-400'}`}>USD</span>
                <Switch
                  checked={currency === 'INR'}
                  onCheckedChange={(checked) => setCurrency(checked ? 'INR' : 'USD')}
                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-pink-500"
                />
                <span className={`text-base font-bold px-4 py-2 rounded-lg transition-all duration-300 ${currency === 'INR' ? 'text-white bg-purple-500/30' : 'text-gray-400'}`}>INR</span>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {/* Trial Plan */}
              <Card className="bg-black/40 border-white/20 backdrop-blur-xl relative hover:scale-105 transition-all duration-500 shadow-xl shadow-purple-500/10 hover:shadow-purple-500/20">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">Trial</h3>
                    <div className="text-4xl font-black text-green-400 mb-2">Free</div>
                    <p className="text-gray-400 text-base">Forever</p>
                  </div>
                  <ul className="space-y-4 text-base mb-8">
                    <li className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      1 request per day
                    </li>
                    <li className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      20 requests per month
                    </li>
                    <li className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      Free Vercel hosting
                    </li>
                    <li className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      Free Supabase database
                    </li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 h-12 shadow-xl shadow-green-500/30 border border-white/20">
                    Get Started
                  </Button>
                  <p className="text-xs text-gray-500 mt-4 text-center">
                    * Extra costs may apply if scaling beyond free limits
                  </p>
                </CardContent>
              </Card>

              {/* Premium Plan */}
              <Card className="bg-black/40 border-purple-500/50 backdrop-blur-xl relative transform scale-110 hover:scale-115 transition-all duration-500 shadow-2xl shadow-purple-500/30">
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 font-bold text-sm shadow-xl">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">Premium</h3>
                    <div className="text-4xl font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-2">
                      {currency === 'USD' ? '$' : '₹'}{pricing[currency].premium}
                    </div>
                    <p className="text-gray-400 text-base">per month</p>
                  </div>
                  <ul className="space-y-4 text-base mb-8">
                    <li className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-purple-400 mr-3 flex-shrink-0" />
                      15 requests per day
                    </li>
                    <li className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-purple-400 mr-3 flex-shrink-0" />
                      300 requests per month
                    </li>
                    <li className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-purple-400 mr-3 flex-shrink-0" />
                      Free Vercel hosting
                    </li>
                    <li className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-purple-400 mr-3 flex-shrink-0" />
                      Free Supabase database
                    </li>
                    <li className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-purple-400 mr-3 flex-shrink-0" />
                      Priority support
                    </li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 h-12 shadow-2xl shadow-purple-500/50 border border-white/20">
                    Upgrade Now
                  </Button>
                  <p className="text-xs text-gray-500 mt-4 text-center">
                    * Extra costs may apply if scaling beyond free limits
                  </p>
                </CardContent>
              </Card>

              {/* Pro Plan */}
              <Card className="bg-black/40 border-white/20 backdrop-blur-xl relative hover:scale-105 transition-all duration-500 shadow-xl shadow-cyan-500/10 hover:shadow-cyan-500/20">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">Pro</h3>
                    <div className="text-4xl font-black text-cyan-400 mb-2">
                      {currency === 'USD' ? '$' : '₹'}{pricing[currency].pro}
                    </div>
                    <p className="text-gray-400 text-base">per month</p>
                  </div>
                  <ul className="space-y-4 text-base mb-8">
                    <li className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                      30 requests per day
                    </li>
                    <li className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                      500 requests per month
                    </li>
                    <li className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                      Free Vercel hosting
                    </li>
                    <li className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                      Free Supabase database
                    </li>
                    <li className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                      Advanced features
                    </li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 h-12 shadow-xl shadow-cyan-500/30 border border-white/20">
                    Upgrade Now
                  </Button>
                  <p className="text-xs text-gray-500 mt-4 text-center">
                    * Extra costs may apply if scaling beyond free limits
                  </p>
                </CardContent>
              </Card>

              {/* Enterprise Plan */}
              <Card className="bg-black/40 border-white/20 backdrop-blur-xl relative hover:scale-105 transition-all duration-500 shadow-xl shadow-orange-500/10 hover:shadow-orange-500/20">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">Enterprise</h3>
                    <div className="text-3xl font-bold text-orange-400 mb-2">Custom</div>
                    <p className="text-gray-400 text-base">Contact us</p>
                  </div>
                  <ul className="space-y-4 text-base mb-8">
                    <li className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-orange-400 mr-3 flex-shrink-0" />
                      Unlimited requests
                    </li>
                    <li className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-orange-400 mr-3 flex-shrink-0" />
                      Custom solutions
                    </li>
                    <li className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-orange-400 mr-3 flex-shrink-0" />
                      Dedicated support
                    </li>
                    <li className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-orange-400 mr-3 flex-shrink-0" />
                      Custom integrations
                    </li>
                    <li className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-orange-400 mr-3 flex-shrink-0" />
                      SLA guarantee
                    </li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 h-12 shadow-xl shadow-orange-500/30 border border-white/20">
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

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl shadow-purple-500/10">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 via-pink-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-xl shadow-purple-500/30">
                  <Code className="w-5 h-5 text-black font-bold" />
                </div>
                <span className="text-xl font-black text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text">
                  Extrox.dev
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed text-base">
                The future of AI-powered development. Build, deploy, and scale faster than ever.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Product</h4>
              <ul className="space-y-4 text-gray-400 text-base">
                <li><a href="#" className="hover:text-purple-400 transition-colors duration-300">Features</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors duration-300">Pricing</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors duration-300">Documentation</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors duration-300">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Company</h4>
              <ul className="space-y-4 text-gray-400 text-base">
                <li><a href="#" className="hover:text-pink-400 transition-colors duration-300">About</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors duration-300">Blog</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors duration-300">Careers</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors duration-300">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Support</h4>
              <ul className="space-y-4 text-gray-400 text-base">
                <li><a href="#" className="hover:text-cyan-400 transition-colors duration-300">Help Center</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors duration-300">Community</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors duration-300">Status</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors duration-300">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-500 text-base">
            <p>&copy; 2025 Extrox.dev. All rights reserved. Built with love for developers worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

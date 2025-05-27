
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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-10" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-emerald-500/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-400/5 rounded-full blur-3xl" />

      {/* Header */}
      <header className="relative border-b border-gray-800/30 bg-black/60 backdrop-blur-xl z-50">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Code className="w-4 h-4 text-black" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Extrox.dev</span>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800/50 font-medium px-4 py-2 h-9">
              Sign In
            </Button>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-5 py-2 h-9 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-200">
              Get Started Free
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <section className="pt-16 pb-8 px-6">
          <div className="container mx-auto text-center max-w-4xl">
            <Badge className="mb-6 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-3 py-1 text-xs font-medium">
              <Sparkles className="w-3 h-3 mr-2" />
              AI-Powered Development Platform
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-[0.9] tracking-tight">
              What should we
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-white bg-clip-text text-transparent block mt-1">
                build today?
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
              Your AI development team with specialized 
              <span className="text-white font-medium"> frontend</span>, 
              <span className="text-white font-medium"> backend</span>, and 
              <span className="text-white font-medium"> full-stack engineers</span> ready to build your vision.
            </p>
          </div>
        </section>

        {/* Input Section */}
        <section className="pb-12 px-6">
          <div className="container mx-auto max-w-3xl">
            <Card className="bg-gray-900/40 border-gray-700/40 backdrop-blur-sm shadow-2xl shadow-black/10">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Role Selection and Usage Stats */}
                  <div className="flex flex-wrap gap-4 items-center justify-between">
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger className="w-64 bg-gray-800/40 border-gray-600/40 text-white h-10 text-sm">
                        <SelectValue placeholder="Choose your engineer" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600 backdrop-blur-xl">
                        <SelectItem value="frontend" className="text-white hover:bg-gray-700">Frontend Engineer</SelectItem>
                        <SelectItem value="backend" className="text-white hover:bg-gray-700">Backend Engineer</SelectItem>
                        <SelectItem value="fullstack" className="text-white hover:bg-gray-700">Full-Stack Engineer</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      <div className="flex items-center space-x-1">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                        <span>Daily: {dailyUsage}/{dailyLimits[userTier] === Infinity ? '∞' : dailyLimits[userTier]}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                        <span>Monthly: {monthlyUsage}/{monthlyLimits[userTier] === Infinity ? '∞' : monthlyLimits[userTier]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Input Box with Integrated File Upload */}
                  <div 
                    className={`relative border-2 border-dashed rounded-lg transition-all duration-300 ${
                      dragActive 
                        ? 'border-emerald-400 bg-emerald-500/5 shadow-lg shadow-emerald-500/15' 
                        : 'border-gray-600/40 hover:border-gray-500/40'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {/* Uploaded Files Display */}
                    {uploadedFiles.length > 0 && (
                      <div className="p-4 border-b border-gray-600/40">
                        <div className="flex flex-wrap gap-2">
                          {uploadedFiles.map((file, index) => (
                            <div key={index} className="flex items-center gap-2 bg-gray-800/40 rounded-md px-3 py-2 backdrop-blur-sm">
                              {file.type.startsWith('image/') ? (
                                <Image className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <FileArchive className="w-3 h-3 text-emerald-400" />
                              )}
                              <span className="text-xs text-gray-300 truncate max-w-24 font-medium">
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
                        placeholder="Describe what you want to build... Be specific about features, design, and functionality."
                        className="min-h-32 bg-transparent border-none text-white placeholder-gray-500 resize-none focus:ring-0 focus:border-none text-base leading-relaxed"
                        maxLength={maxWords * 6}
                      />
                      
                      {/* Upload Options Bar */}
                      <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                        <label className="cursor-pointer p-2 rounded-md hover:bg-gray-800/40 transition-colors group">
                          <Paperclip className="w-4 h-4 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                          <input
                            type="file"
                            multiple
                            accept="image/*,.zip"
                            className="hidden"
                            onChange={(e) => handleFiles([...e.target.files])}
                          />
                        </label>
                        
                        <label className="cursor-pointer p-2 rounded-md hover:bg-gray-800/40 transition-colors group">
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

                      {/* Word Count */}
                      <div className="absolute bottom-3 right-3 text-xs text-gray-500 font-medium">
                        {wordCount}/{maxWords} words
                      </div>
                    </div>

                    {/* Drag & Drop Overlay */}
                    {dragActive && (
                      <div className="absolute inset-0 bg-emerald-500/8 border-2 border-emerald-400 rounded-lg flex items-center justify-center backdrop-blur-sm">
                        <div className="text-center">
                          <Upload className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                          <p className="text-emerald-400 font-semibold text-base">Drop files here</p>
                          <p className="text-emerald-300/80 text-xs mt-1">Images and ZIP files supported</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center pt-1">
                    <Button
                      variant="outline"
                      onClick={() => setShowPricing(!showPricing)}
                      className="border-gray-600/40 text-white hover:bg-gray-800/40 hover:border-gray-500/40 font-medium text-sm h-9"
                    >
                      View Pricing
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={!prompt.trim() || !selectedRole || wordCount > maxWords}
                      className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-6 py-2 h-9 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Let's Build This!
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pricing Section */}
        {showPricing && (
          <section className="pb-12 px-6">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Choose Your Plan</h2>
                <p className="text-lg text-gray-400 mb-6 max-w-xl mx-auto">Start free and scale as you grow. All plans include hosting and database.</p>
                <div className="flex items-center justify-center space-x-3">
                  <span className={`text-sm font-medium ${currency === 'USD' ? 'text-white' : 'text-gray-400'}`}>USD</span>
                  <Switch
                    checked={currency === 'INR'}
                    onCheckedChange={(checked) => setCurrency(checked ? 'INR' : 'USD')}
                    className="data-[state=checked]:bg-emerald-500"
                  />
                  <span className={`text-sm font-medium ${currency === 'INR' ? 'text-white' : 'text-gray-400'}`}>INR</span>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                {/* Trial Plan */}
                <Card className="bg-gray-900/40 border-gray-700/40 backdrop-blur-sm relative">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-white mb-3">Trial</h3>
                      <div className="text-3xl font-bold text-emerald-400 mb-1">Free</div>
                      <p className="text-gray-400 text-sm">Forever</p>
                    </div>
                    <ul className="space-y-3 text-sm mb-6">
                      <li className="flex items-center text-gray-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                        1 request per day
                      </li>
                      <li className="flex items-center text-gray-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                        20 requests per month
                      </li>
                      <li className="flex items-center text-gray-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                        Free Vercel hosting
                      </li>
                      <li className="flex items-center text-gray-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                        Free Supabase database
                      </li>
                    </ul>
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold py-2 h-9">
                      Get Started
                    </Button>
                    <p className="text-xs text-gray-500 mt-3 text-center">
                      * Extra costs may apply if scaling beyond free limits
                    </p>
                  </CardContent>
                </Card>

                {/* Premium Plan */}
                <Card className="bg-gray-900/40 border-emerald-500/40 backdrop-blur-sm relative transform scale-105">
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-black px-3 py-1 font-semibold text-xs">
                    Most Popular
                  </Badge>
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-white mb-3">Premium</h3>
                      <div className="text-3xl font-bold text-emerald-400 mb-1">
                        {currency === 'USD' ? '$' : '₹'}{pricing[currency].premium}
                      </div>
                      <p className="text-gray-400 text-sm">per month</p>
                    </div>
                    <ul className="space-y-3 text-sm mb-6">
                      <li className="flex items-center text-gray-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                        15 requests per day
                      </li>
                      <li className="flex items-center text-gray-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                        300 requests per month
                      </li>
                      <li className="flex items-center text-gray-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                        Free Vercel hosting
                      </li>
                      <li className="flex items-center text-gray-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                        Free Supabase database
                      </li>
                      <li className="flex items-center text-gray-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                        Priority support
                      </li>
                    </ul>
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold py-2 h-9">
                      Upgrade Now
                    </Button>
                    <p className="text-xs text-gray-500 mt-3 text-center">
                      * Extra costs may apply if scaling beyond free limits
                    </p>
                  </CardContent>
                </Card>

                {/* Pro Plan */}
                <Card className="bg-gray-900/40 border-gray-700/40 backdrop-blur-sm relative">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-white mb-3">Pro</h3>
                      <div className="text-3xl font-bold text-white mb-1">
                        {currency === 'USD' ? '$' : '₹'}{pricing[currency].pro}
                      </div>
                      <p className="text-gray-400 text-sm">per month</p>
                    </div>
                    <ul className="space-y-3 text-sm mb-6">
                      <li className="flex items-center text-gray-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                        30 requests per day
                      </li>
                      <li className="flex items-center text-gray-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                        500 requests per month
                      </li>
                      <li className="flex items-center text-gray-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                        Free Vercel hosting
                      </li>
                      <li className="flex items-center text-gray-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                        Free Supabase database
                      </li>
                      <li className="flex items-center text-gray-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                        Advanced features
                      </li>
                    </ul>
                    <Button className="w-full bg-white hover:bg-gray-100 text-black font-semibold py-2 h-9">
                      Upgrade Now
                    </Button>
                    <p className="text-xs text-gray-500 mt-3 text-center">
                      * Extra costs may apply if scaling beyond free limits
                    </p>
                  </CardContent>
                </Card>

                {/* Enterprise Plan */}
                <Card className="bg-gray-900/40 border-gray-700/40 backdrop-blur-sm relative">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-white mb-3">Enterprise</h3>
                      <div className="text-2xl font-bold text-white mb-1">Custom</div>
                      <p className="text-gray-400 text-sm">Contact us</p>
                    </div>
                    <ul className="space-y-3 text-sm mb-6">
                      <li className="flex items-center text-gray-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                        Unlimited requests
                      </li>
                      <li className="flex items-center text-gray-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                        Custom solutions
                      </li>
                      <li className="flex items-center text-gray-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                        Dedicated support
                      </li>
                      <li className="flex items-center text-gray-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                        Custom integrations
                      </li>
                      <li className="flex items-center text-gray-300">
                        <Check className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                        SLA guarantee
                      </li>
                    </ul>
                    <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 h-9">
                      Contact Sales
                    </Button>
                    <p className="text-xs text-gray-500 mt-3 text-center">
                      * Customizable according to needs
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/30 bg-black/60 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-7 h-7 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Code className="w-4 h-4 text-black" />
                </div>
                <span className="text-lg font-bold text-white">Extrox.dev</span>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm">
                The future of AI-powered development. Build, deploy, and scale faster than ever.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4 text-base">Product</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4 text-base">Company</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4 text-base">Support</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800/30 mt-8 pt-6 text-center text-gray-500 text-sm">
            <p>&copy; 2025 Extrox.dev. All rights reserved. Built with love for developers worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

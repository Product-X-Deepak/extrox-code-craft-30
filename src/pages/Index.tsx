
import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Upload, Paperclip, Image, FileArchive, Sparkles, Code, Database, Globe, Check, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [userTier, setUserTier] = useState("trial"); // trial, premium, pro, enterprise
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
      return isValidType && file.size <= 10 * 1024 * 1024; // 10MB limit
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

    // Simulate API call
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-md bg-black/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Extrox.dev</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              Get Started Free
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-purple-600/20 text-purple-300 border-purple-500/30">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered Development Platform
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Build something
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {" "}extraordinary
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            From idea to deployment in seconds. Your personal AI development team that understands frontend, backend, and full-stack architecture.
          </p>
        </div>

        {/* Input Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="bg-black/40 border-white/20 backdrop-blur-lg">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Role Selection */}
                <div className="flex flex-wrap gap-4 items-center">
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="w-64 bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20">
                      <SelectItem value="frontend">Frontend Engineer</SelectItem>
                      <SelectItem value="backend">Backend Engineer</SelectItem>
                      <SelectItem value="fullstack">Full-Stack Engineer</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span>Daily: {dailyUsage}/{dailyLimits[userTier] === Infinity ? '∞' : dailyLimits[userTier]}</span>
                    <span>•</span>
                    <span>Monthly: {monthlyUsage}/{monthlyLimits[userTier] === Infinity ? '∞' : monthlyLimits[userTier]}</span>
                  </div>
                </div>

                {/* File Upload Area */}
                <div 
                  className={`border-2 border-dashed rounded-lg p-6 transition-all ${
                    dragActive 
                      ? 'border-blue-400 bg-blue-500/10' 
                      : 'border-white/20 hover:border-white/40'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="text-center">
                    <div className="flex justify-center space-x-4 mb-4">
                      <Upload className="w-8 h-8 text-gray-400" />
                      <Image className="w-8 h-8 text-gray-400" />
                      <FileArchive className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-300 mb-2">
                      Drag and drop images or ZIP files here, or{" "}
                      <label className="text-blue-400 cursor-pointer hover:underline">
                        browse files
                        <input
                          type="file"
                          multiple
                          accept="image/*,.zip"
                          className="hidden"
                          onChange={(e) => handleFiles([...e.target.files])}
                        />
                      </label>
                    </p>
                    <p className="text-sm text-gray-500">Max 10MB per file</p>
                  </div>

                  {/* Uploaded Files */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-white/5 rounded p-2">
                          <span className="text-sm text-gray-300">{file.name}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFile(index)}
                            className="text-red-400 hover:text-red-300"
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Prompt Input */}
                <div className="relative">
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe what you want to build... Be specific about features, design, and functionality."
                    className="min-h-32 bg-white/5 border-white/20 text-white placeholder-gray-400 resize-none"
                    maxLength={maxWords * 6} // Rough character limit
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                    {wordCount}/{maxWords} words
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    onClick={() => setShowPricing(!showPricing)}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    View Pricing
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!prompt.trim() || !selectedRole || wordCount > maxWords}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Code
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Section */}
        {showPricing && (
          <div className="max-w-6xl mx-auto mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Choose Your Plan</h2>
              <div className="flex items-center justify-center space-x-4">
                <span className={`text-sm ${currency === 'USD' ? 'text-white' : 'text-gray-400'}`}>USD</span>
                <Switch
                  checked={currency === 'INR'}
                  onCheckedChange={(checked) => setCurrency(checked ? 'INR' : 'USD')}
                />
                <span className={`text-sm ${currency === 'INR' ? 'text-white' : 'text-gray-400'}`}>INR</span>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {/* Trial Plan */}
              <Card className="bg-black/40 border-white/20 backdrop-blur-lg">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-2">Trial</h3>
                    <div className="text-3xl font-bold text-green-400 mb-4">Free</div>
                    <p className="text-gray-400 text-sm mb-6">Forever</p>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-green-400 mr-2" />
                      1 request per day
                    </li>
                    <li className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-green-400 mr-2" />
                      20 requests per month
                    </li>
                    <li className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-green-400 mr-2" />
                      Free Vercel hosting
                    </li>
                    <li className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-green-400 mr-2" />
                      Free Supabase database
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-green-600 hover:bg-green-700">
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              {/* Premium Plan */}
              <Card className="bg-black/40 border-purple-500/50 backdrop-blur-lg relative">
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600">
                  Most Popular
                </Badge>
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-2">Premium</h3>
                    <div className="text-3xl font-bold text-purple-400 mb-4">
                      {currency === 'USD' ? '$' : '₹'}{pricing[currency].premium}
                    </div>
                    <p className="text-gray-400 text-sm mb-6">per month</p>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-purple-400 mr-2" />
                      15 requests per day
                    </li>
                    <li className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-purple-400 mr-2" />
                      300 requests per month
                    </li>
                    <li className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-purple-400 mr-2" />
                      Free Vercel hosting
                    </li>
                    <li className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-purple-400 mr-2" />
                      Free Supabase database
                    </li>
                    <li className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-purple-400 mr-2" />
                      Priority support
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">
                    Upgrade Now
                  </Button>
                </CardContent>
              </Card>

              {/* Pro Plan */}
              <Card className="bg-black/40 border-white/20 backdrop-blur-lg">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
                    <div className="text-3xl font-bold text-blue-400 mb-4">
                      {currency === 'USD' ? '$' : '₹'}{pricing[currency].pro}
                    </div>
                    <p className="text-gray-400 text-sm mb-6">per month</p>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-blue-400 mr-2" />
                      30 requests per day
                    </li>
                    <li className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-blue-400 mr-2" />
                      500 requests per month
                    </li>
                    <li className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-blue-400 mr-2" />
                      Free Vercel hosting
                    </li>
                    <li className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-blue-400 mr-2" />
                      Free Supabase database
                    </li>
                    <li className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-blue-400 mr-2" />
                      Advanced features
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                    Upgrade Now
                  </Button>
                </CardContent>
              </Card>

              {/* Enterprise Plan */}
              <Card className="bg-black/40 border-white/20 backdrop-blur-lg">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
                    <div className="text-2xl font-bold text-orange-400 mb-4">Custom</div>
                    <p className="text-gray-400 text-sm mb-6">Contact us</p>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-orange-400 mr-2" />
                      Unlimited requests
                    </li>
                    <li className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-orange-400 mr-2" />
                      Custom solutions
                    </li>
                    <li className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-orange-400 mr-2" />
                      Dedicated support
                    </li>
                    <li className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-orange-400 mr-2" />
                      Custom integrations
                    </li>
                    <li className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-orange-400 mr-2" />
                      SLA guarantee
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-orange-600 hover:bg-orange-700">
                    Contact Sales
                  </Button>
                </CardContent>
              </Card>
            </div>

            <p className="text-center text-gray-400 text-sm mt-6">
              * Extra costs may apply if scaling beyond free limits of Vercel and Supabase
            </p>
          </div>
        )}

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-black/40 border-white/20 backdrop-blur-lg">
            <CardContent className="p-6 text-center">
              <Code className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">AI-Powered Code Generation</h3>
              <p className="text-gray-400">
                Generate production-ready code for any framework or language with intelligent AI assistance.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-white/20 backdrop-blur-lg">
            <CardContent className="p-6 text-center">
              <Database className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Full-Stack Solutions</h3>
              <p className="text-gray-400">
                Complete backend and database setup with authentication, APIs, and deployment ready solutions.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-white/20 backdrop-blur-lg">
            <CardContent className="p-6 text-center">
              <Globe className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Instant Deployment</h3>
              <p className="text-gray-400">
                Deploy your applications instantly to production with integrated hosting and CDN solutions.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 backdrop-blur-md">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                  <Code className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-white">Extrox.dev</span>
              </div>
              <p className="text-gray-400 text-sm">
                The future of AI-powered development. Build, deploy, and scale faster than ever.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Extrox.dev. All rights reserved. Built with love for developers worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

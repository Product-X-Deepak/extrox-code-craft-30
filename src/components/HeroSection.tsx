
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, Zap, Shield, Rocket } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-400/8 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto text-center max-w-5xl relative">
        <Badge className="mb-8 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/30 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
          <Sparkles className="w-4 h-4 mr-2" />
          Next-Generation AI Development Platform
        </Badge>
        
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.85] tracking-tight">
          Build the
          <span className="block bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent mt-2">
            impossible
          </span>
          <span className="block text-5xl md:text-6xl lg:text-7xl mt-4 text-gray-300 font-light">
            with AI
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
          Transform your ideas into production-ready applications with our AI-powered development team. 
          <span className="text-white font-medium"> Frontend</span>, 
          <span className="text-white font-medium"> Backend</span>, and 
          <span className="text-white font-medium"> Full-stack engineers</span> at your fingertips.
        </p>

        {/* Feature highlights */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span className="text-gray-300 text-sm font-medium">Lightning Fast</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-gray-300 text-sm font-medium">Enterprise Grade</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
            <Rocket className="w-4 h-4 text-emerald-400" />
            <span className="text-gray-300 text-sm font-medium">Production Ready</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

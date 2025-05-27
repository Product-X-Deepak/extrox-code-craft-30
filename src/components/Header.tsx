
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code, Sparkles } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed w-full top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-2xl">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-2xl shadow-emerald-500/25">
              <Code className="w-5 h-5 text-black font-bold" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl blur opacity-30 animate-pulse" />
          </div>
          <div>
            <span className="text-2xl font-black text-white tracking-tight">Extrox</span>
            <span className="text-emerald-400 font-bold">.dev</span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors font-medium">Features</a>
          <a href="#pricing" className="text-gray-300 hover:text-white transition-colors font-medium">Pricing</a>
          <a href="#docs" className="text-gray-300 hover:text-white transition-colors font-medium">Docs</a>
          <a href="#support" className="text-gray-300 hover:text-white transition-colors font-medium">Support</a>
        </nav>

        <div className="flex items-center space-x-3">
          <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/5 font-medium px-4 py-2 h-10 hidden sm:flex">
            Sign In
          </Button>
          <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-black font-bold px-6 py-2 h-10 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 rounded-lg">
            Get Started Free
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;


import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { 
  Paperclip, 
  Send, 
  Github, 
  Figma,
  Code,
  Sparkles,
  Globe,
  Database,
  Smartphone,
  Palette,
  BarChart3,
  Settings,
  Menu
} from "lucide-react";
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface HomeContentProps {
  user: SupabaseUser;
}

export function HomeContent({ user }: HomeContentProps) {
  const [prompt, setPrompt] = useState('');

  const userName = user.user_metadata?.full_name || 
                   `${user.user_metadata?.first_name || ''} ${user.user_metadata?.last_name || ''}`.trim() ||
                   user.email?.split('@')[0] || 
                   'User';

  const quickStartTemplates = [
    {
      title: "Build a mobile app with Expo",
      description: "Create cross-platform mobile applications",
      icon: Smartphone,
      color: "bg-blue-500/10 text-blue-400 border-blue-500/30"
    },
    {
      title: "Start a blog with Astro",
      description: "Build fast, content-focused websites",
      icon: Globe,
      color: "bg-purple-500/10 text-purple-400 border-purple-500/30"
    },
    {
      title: "Create a docs site with Vitepress",
      description: "Documentation sites with modern tooling",
      icon: Code,
      color: "bg-green-500/10 text-green-400 border-green-500/30"
    },
    {
      title: "Scaffold UI with shadcn",
      description: "Beautiful, accessible React components",
      icon: Palette,
      color: "bg-orange-500/10 text-orange-400 border-orange-500/30"
    },
    {
      title: "Draft a presentation with Slidev",
      description: "Developer-friendly presentation slides",
      icon: BarChart3,
      color: "bg-red-500/10 text-red-400 border-red-500/30"
    }
  ];

  const techStack = [
    { name: "React", icon: "⚛️" },
    { name: "Vue", icon: "💚" },
    { name: "Node.js", icon: "🟢" },
    { name: "Next.js", icon: "▲" },
    { name: "TypeScript", icon: "🔷" },
    { name: "Vite", icon: "⚡" },
    { name: "Astro", icon: "🚀" },
    { name: "Svelte", icon: "🧡" },
    { name: "Angular", icon: "🅰️" },
    { name: "Nuxt", icon: "💚" },
    { name: "Remix", icon: "💿" },
    { name: "SvelteKit", icon: "🔥" },
    { name: "Solid", icon: "🔷" },
    { name: "Qwik", icon: "⚡" }
  ];

  return (
    <main className="flex-1 flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800/30 bg-black/60 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center space-x-4">
            <SidebarTrigger className="text-gray-400 hover:text-white" />
            <div className="hidden sm:flex items-center space-x-2">
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                <Sparkles className="w-3 h-3 mr-1" />
                Introducing GitHub integration!
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              We're hiring!
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              Help Center
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              Pricing
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              Terms
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              Privacy
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-10" />
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-400/5 rounded-full blur-3xl" />

        <div className="relative w-full max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              What do you want to build?
            </h1>
            <p className="text-xl text-gray-400 mb-2">
              Prompt, run, edit, and deploy full-stack{" "}
              <span className="text-emerald-400 font-semibold">web</span> and{" "}
              <span className="text-emerald-400 font-semibold">mobile</span> apps.
            </p>
          </div>

          {/* Input Area */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <Textarea
                placeholder="How can Extrox help you today?"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[120px] bg-gray-900/40 border-gray-700/40 text-white placeholder-gray-400 resize-none pr-20 text-lg"
              />
              <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  className="bg-emerald-500 hover:bg-emerald-600 text-black font-medium px-4"
                  disabled={!prompt.trim()}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </div>

          {/* Import Options */}
          <div className="mb-8">
            <p className="text-gray-400 text-sm mb-4">or import from</p>
            <div className="flex items-center justify-center space-x-4">
              <Button variant="outline" className="border-gray-700/40 text-gray-300 hover:text-white hover:bg-gray-800/40">
                <Figma className="w-4 h-4 mr-2" />
                Figma
              </Button>
              <Button variant="outline" className="border-gray-700/40 text-gray-300 hover:text-white hover:bg-gray-800/40">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
            </div>
          </div>

          {/* Quick Start Templates */}
          <div className="mb-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {quickStartTemplates.map((template, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`p-4 h-auto flex-col items-start text-left border ${template.color} hover:bg-gray-800/20`}
                >
                  <template.icon className="w-5 h-5 mb-2" />
                  <div className="text-sm font-medium mb-1">{template.title}</div>
                  <div className="text-xs opacity-80">{template.description}</div>
                </Button>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <p className="text-gray-400 text-sm mb-4">or start a blank app with your favorite stack</p>
            <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto">
              {techStack.map((tech, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="border-gray-700/40 text-gray-300 hover:text-white hover:bg-gray-800/40"
                >
                  <span className="mr-2">{tech.icon}</span>
                  {tech.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { 
  Code, 
  Sparkles, 
  ArrowRight, 
  Star, 
  Github, 
  Twitter, 
  MessageSquare, 
  Zap,
  Globe,
  Smartphone,
  Database,
  Palette,
  BarChart3,
  Shield,
  Users,
  Clock,
  CheckCircle,
  Paperclip,
  Send,
  Figma
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        navigate('/home');
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        navigate('/home');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const features = [
    {
      icon: Code,
      title: "AI-Powered Development",
      description: "Build full-stack applications with natural language prompts. Our AI understands your requirements and generates production-ready code."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Go from idea to deployment in minutes, not hours. Our optimized workflow accelerates your development process."
    },
    {
      icon: Globe,
      title: "Full-Stack Ready",
      description: "Frontend, backend, database, and deployment - everything you need in one integrated platform."
    },
    {
      icon: Smartphone,
      title: "Cross-Platform",
      description: "Build for web, mobile, and desktop with a single codebase. Deploy anywhere, run everywhere."
    },
    {
      icon: Database,
      title: "Smart Database",
      description: "Automated database design and optimization. Our AI creates efficient schemas based on your app's needs."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Built-in security best practices, automated testing, and compliance-ready architecture."
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
    { name: "Svelte", icon: "🧡" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Frontend Developer",
      company: "TechCorp",
      content: "Extrox transformed how I build applications. What used to take weeks now takes hours.",
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez",
      role: "Full-Stack Engineer",
      company: "StartupXYZ",
      content: "The AI understands context perfectly. It's like having a senior developer as a pair programmer.",
      avatar: "MR"
    },
    {
      name: "Elena Kowalski",
      role: "Product Manager",
      company: "InnovateLabs",
      content: "Finally, a tool that bridges the gap between idea and implementation seamlessly.",
      avatar: "EK"
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for learning and small projects",
      features: [
        "5 projects per month",
        "Basic AI assistance",
        "Community support",
        "Public repositories",
        "Standard templates"
      ],
      cta: "Get Started Free",
      popular: false
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      description: "Ideal for professional developers",
      features: [
        "Unlimited projects",
        "Advanced AI features",
        "Priority support",
        "Private repositories",
        "Custom templates",
        "Team collaboration",
        "Advanced deployment options"
      ],
      cta: "Start Pro Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For teams and organizations",
      features: [
        "Everything in Pro",
        "Custom AI training",
        "Dedicated support",
        "SSO integration",
        "Advanced security",
        "Custom integrations",
        "SLA guarantee"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

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
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors font-medium">Features</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors font-medium">Pricing</a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors font-medium">About</a>
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800/50 font-medium">
              Docs
            </Button>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link to="/auth">
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800/50 font-medium">
                Sign In
              </Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-black font-medium">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mb-6 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Now with AI-powered deployment
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Build Apps with{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              AI Power
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your ideas into production-ready applications using natural language. 
            No complex setup, no lengthy development cycles—just pure innovation.
          </p>

          {/* CTA Input */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Textarea
                placeholder="Describe your app idea... (e.g., 'Create a task management app with team collaboration')"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px] bg-gray-900/40 border-gray-700/40 text-white placeholder-gray-400 resize-none pr-20"
              />
              <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Link to="/auth">
                  <Button 
                    size="sm" 
                    className="bg-emerald-500 hover:bg-emerald-600 text-black font-medium"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Build Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Import Options */}
          <div className="mb-12">
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

          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-400">
            <span>Start with:</span>
            {techStack.map((tech, index) => (
              <Badge key={index} variant="outline" className="border-gray-700/40 text-gray-300">
                <span className="mr-1">{tech.icon}</span>
                {tech.name}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Why Choose Extrox?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience the future of software development with our AI-powered platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gray-900/40 border-gray-700/40 backdrop-blur-sm hover:bg-gray-900/60 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Loved by Developers
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See what developers around the world are saying about Extrox
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gray-900/40 border-gray-700/40 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-emerald-400 font-semibold">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.content}"</p>
                <div className="flex text-emerald-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the plan that's right for you. Upgrade or downgrade at any time.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card key={index} className={`bg-gray-900/40 border-gray-700/40 backdrop-blur-sm relative ${plan.popular ? 'border-emerald-500/50 scale-105' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-black">
                  Most Popular
                </Badge>
              )}
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400">/{plan.period}</span>
                  </div>
                  <p className="text-gray-400">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link to="/auth">
                  <Button 
                    className={`w-full ${plan.popular 
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-black' 
                      : 'bg-gray-800 hover:bg-gray-700 text-white'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;

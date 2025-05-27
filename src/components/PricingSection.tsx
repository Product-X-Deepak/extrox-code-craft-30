
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, Star, Zap, Shield, Crown, Rocket } from "lucide-react";

const PricingSection = () => {
  const [currency, setCurrency] = useState("USD");

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

  const plans = [
    {
      name: "Trial",
      price: "Free",
      period: "Forever",
      description: "Perfect for getting started",
      icon: Rocket,
      popular: false,
      features: [
        "1 request per day",
        "20 requests per month",
        "Free Vercel hosting",
        "Free Supabase database",
        "Community support",
        "Basic templates"
      ],
      buttonText: "Start Free",
      buttonVariant: "outline" as const,
      gradient: "from-gray-500 to-gray-600"
    },
    {
      name: "Premium",
      price: currency === 'USD' ? '$20' : '₹1,650',
      period: "per month",
      description: "For serious developers",
      icon: Zap,
      popular: true,
      features: [
        "15 requests per day",
        "300 requests per month",
        "Priority processing",
        "Free Vercel hosting",
        "Free Supabase database",
        "Premium templates",
        "Priority support",
        "Advanced customization"
      ],
      buttonText: "Get Premium",
      buttonVariant: "default" as const,
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      name: "Pro",
      price: currency === 'USD' ? '$50' : '₹4,150',
      period: "per month",
      description: "For teams and agencies",
      icon: Crown,
      popular: false,
      features: [
        "30 requests per day",
        "500 requests per month",
        "Fastest processing",
        "Free Vercel hosting",
        "Free Supabase database",
        "All premium features",
        "Dedicated support",
        "Custom integrations",
        "Team collaboration"
      ],
      buttonText: "Get Pro",
      buttonVariant: "outline" as const,
      gradient: "from-purple-500 to-pink-600"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "Contact us",
      description: "For large organizations",
      icon: Shield,
      popular: false,
      features: [
        "Unlimited requests",
        "Custom solutions",
        "Dedicated infrastructure",
        "Custom hosting options",
        "Enterprise database",
        "White-label solution",
        "24/7 dedicated support",
        "Custom SLA",
        "On-premise deployment"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      gradient: "from-blue-500 to-indigo-600"
    }
  ];

  return (
    <section id="pricing" className="py-20 px-6 relative">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl relative">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/30 px-4 py-2 text-sm font-semibold">
            <Star className="w-4 h-4 mr-2" />
            Transparent Pricing
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Choose Your
            <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Start free and scale as you grow. All plans include hosting, database, and our cutting-edge AI development platform.
          </p>
          
          <div className="flex items-center justify-center space-x-4 bg-white/5 rounded-full p-1 w-fit mx-auto backdrop-blur-sm border border-white/10">
            <span className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${currency === 'USD' ? 'text-white bg-white/10' : 'text-gray-400'}`}>USD</span>
            <Switch
              checked={currency === 'INR'}
              onCheckedChange={(checked) => setCurrency(checked ? 'INR' : 'USD')}
              className="data-[state=checked]:bg-emerald-500"
            />
            <span className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${currency === 'INR' ? 'text-white bg-white/10' : 'text-gray-400'}`}>INR</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`relative backdrop-blur-xl border transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                plan.popular 
                  ? 'bg-gradient-to-br from-white/10 to-white/5 border-emerald-500/50 shadow-xl shadow-emerald-500/10 transform scale-105' 
                  : 'bg-gradient-to-br from-white/5 to-transparent border-white/10 hover:border-white/20'
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-600 text-black px-4 py-1 font-bold text-xs">
                  Most Popular
                </Badge>
              )}
              
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center shadow-lg`}>
                    <plan.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                  
                  <div className="mb-2">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                    {plan.period !== "Forever" && plan.period !== "Contact us" && (
                      <span className="text-gray-400 text-sm ml-1">/{plan.period.split(' ')[1]}</span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">{plan.period}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <Check className="w-4 h-4 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full font-bold py-3 h-12 transition-all duration-300 ${
                    plan.buttonVariant === 'default' 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-black shadow-lg shadow-emerald-500/25' 
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30'
                  }`}
                  variant={plan.buttonVariant}
                >
                  {plan.buttonText}
                </Button>

                {(plan.name === 'Trial' || plan.name === 'Premium' || plan.name === 'Pro') && (
                  <p className="text-xs text-gray-500 mt-4 text-center">
                    * Additional costs may apply if scaling beyond free tier limits
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm">
            All plans include free hosting on Vercel and database on Supabase within their free tier limits.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Need something custom? <a href="#" className="text-emerald-400 hover:text-emerald-300 transition-colors">Contact our sales team</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

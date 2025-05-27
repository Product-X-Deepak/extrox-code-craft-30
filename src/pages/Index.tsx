
import React, { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import InputSection from '@/components/InputSection';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [userTier, setUserTier] = useState("trial");
  const [dailyUsage, setDailyUsage] = useState(0);
  const [monthlyUsage, setMonthlyUsage] = useState(0);

  const handleSubmit = () => {
    setDailyUsage(prev => prev + 1);
    setMonthlyUsage(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Enhanced Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.02] pointer-events-none" />
      
      {/* Dynamic Gradient Orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-80 h-80 bg-teal-400/6 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-500/3 to-teal-500/3 rounded-full blur-3xl pointer-events-none" />

      <Header />
      <HeroSection />
      <InputSection 
        userTier={userTier} 
        dailyUsage={dailyUsage} 
        monthlyUsage={monthlyUsage} 
        onSubmit={handleSubmit} 
      />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;

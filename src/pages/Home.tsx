
import { useState } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { HomeContent } from '@/components/HomeContent';

const Home = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-10" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-emerald-500/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-400/5 rounded-full blur-3xl" />

      {/* Sidebar */}
      <AppSidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />

      {/* Main Content */}
      <HomeContent />
    </div>
  );
};

export default Home;

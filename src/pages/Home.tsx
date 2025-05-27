
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppSidebar } from '@/components/AppSidebar';
import { HomeContent } from '@/components/HomeContent';
import { useAuth } from '@/hooks/useAuth';

const Home = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

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
      <div 
        className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-0' : 'ml-0'
        }`}
      >
        <HomeContent />
      </div>
    </div>
  );
};

export default Home;

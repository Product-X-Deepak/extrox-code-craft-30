
import React from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import type { User as SupabaseUser } from '@supabase/supabase-js';
import type { Database as DatabaseType } from '@/integrations/supabase/types';

type UserRole = DatabaseType['public']['Enums']['app_role'];

interface DashboardLayoutProps {
  user: SupabaseUser;
  userRole: UserRole;
  children: React.ReactNode;
}

export function DashboardLayout({ user, userRole, children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-black">
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar user={user} userRole={userRole} />
          <SidebarInset className="flex-1">
            <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b border-gray-800/30 bg-black/60 backdrop-blur-xl">
              <SidebarTrigger className="text-gray-400 hover:text-white" />
              <div className="flex-1" />
              <div className="text-sm text-gray-400">
                Welcome back to Extrox.dev
              </div>
            </header>
            <main className="flex-1 overflow-auto bg-black">
              {children}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}

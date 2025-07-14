'use client'
import { MainNavbar } from "@/components/index";
import React from "react";
import AppProvider from "@/context/AppProvider";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppProvider>
        <div
          className={`relative min-h-screen bg-gradient-to-br  from-slate-900 via-purple-900 to-slate-900 text-white 
      `}
        >
          <MainNavbar />
          {children}
        </div>
      </AppProvider>
    </div>
  );
}

export default MainLayout;

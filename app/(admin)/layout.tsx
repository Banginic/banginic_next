"use client";
import React from "react";
import AppProvider from "@/context/AppProvider";
import MainHeader from "@/components/MainHeader";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <div
        className={`relative min-h-screen bg-gradient-to-br  from-slate-900 via-purple-900 to-slate-900 text-white 
      `}
      >
        <MainHeader />
        {children}
      </div>
    </AppProvider>
  );
}

export default AdminLayout;

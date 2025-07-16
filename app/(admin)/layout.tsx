"use client";
import React from "react";
import AppProvider from "@/context/AppProvider";
import MainHeader from "@/components/MainHeader";
import { QueryClientProvider } from "@tanstack/react-query";
import { client } from "@/components/userClient";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <QueryClientProvider client={client}>
        <div
          className={`relative min-h-screen bg-gradient-to-br  from-slate-900 via-purple-900 to-slate-900 text-white 
      `}
        >
          <MainHeader />
          {children}
        </div>
      </QueryClientProvider>
    </AppProvider>
  );
}

export default AdminLayout;

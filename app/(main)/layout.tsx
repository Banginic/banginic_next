"use client";
import { Header } from "@/components/exportComp";
import React from "react";
import AppProvider from "@/context/AppProvider";
import { client } from "@/components/userClient";
import { QueryClientProvider } from "@tanstack/react-query";
import {News, Cookies} from "@/components/exportComp";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppProvider>
        <QueryClientProvider client={client}>
          <div
            className={`relative min-h-screen bg-gradient-to-br  from-slate-900 via-purple-900 to-slate-900 text-white 
      `}
          >
            <News />
            <Header />
            {children}
            <Cookies />
          </div>
        </QueryClientProvider>
      </AppProvider>
    </div>
  );
}

export default MainLayout;

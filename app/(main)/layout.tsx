import React from "react";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`relative min-h-screen bg-gradient-to-br  from-slate-900 via-purple-900 to-slate-900 text-white 
         `}
    >
      {children}
    </div>
  );
}

export default MainLayout;

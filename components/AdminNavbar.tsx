"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { AppContext } from "@/context/AppProvider";
import {
  Hamburger,
  Logo,
  Navlinks,
  Sidebar,

} from "./exportComp";
import { adminNavlinks, adminSidelinks, mainSidelinks } from "@/assets/data";

function AdminNavbar() {
  const { adminSidebar, setAdminSidebar, user } = useContext(AppContext)!;
  return (
    <header className="h-[10dvh] lg:h-[15dvh] flex lg:py-8 items-center relative ">
      <nav className={`flex items-center justify-between  w-full px-6 `}>
        <Link href={"/admin"}>
          <Logo textSize="heading4" logoSize={45} />
        </Link>
        <Navlinks navlinks={adminNavlinks} />
        <div
          className={`${user ? "hidden" : "flex"}  items-center gap-2 lg:gap-4`}
        >
         
          <Link href="/contact-us" className="hidden md:block">
           <button className="bg-accent px-6 py-2 rounded-full cursor-pointer hover:scale-x-105 trans">Login</button>
          </Link>
          <Hamburger isSidebarOpen={adminSidebar} setSidebar={setAdminSidebar} />
        </div>
      </nav>
      <Sidebar
        navlinks={adminSidelinks}
        setSidebar={setAdminSidebar}
        isSidebarOpen={adminSidebar}
      />
    </header>
  );
}

export default AdminNavbar;

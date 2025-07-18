"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { AppContext } from "@/context/AppProvider";
import { Hamburger, Logo, Navlinks,  } from "./exportComp";
import { adminNavlinks, adminSidelinks } from "@/assets/data";
import { AdminUser, AdminSidebar } from "@/admin-component/index";

function AdminNavbar() {
  const { adminSidebar, setAdminSidebar, adminUser } = useContext(AppContext)!;
  return (
    <header className="h-[10dvh] lg:h-[15dvh] flex lg:py-8 items-center relative ">
      <nav className={`flex items-center justify-between  w-full px-6 `}>
        <Link href={"/admin"}>
          <Logo textSize="heading4" logoSize={45} />
        </Link>
        <Navlinks navlinks={adminNavlinks} />
        <div
          className={`${
            !adminUser ? "hidden" : "flex"
          }  items-center gap-2 lg:gap-4`}
        >
          <div className="hidden md:block">
            <AdminUser signInRoute="/admin/sign-in" homeRoute="/admin" />
          </div>
          <Hamburger
            currentUser={adminUser}
            isSidebarOpen={adminSidebar}
            setSidebar={setAdminSidebar}
          />
        </div>
      </nav>
      <AdminSidebar
        navlinks={adminSidelinks}
        setSidebar={setAdminSidebar}
        isSidebarOpen={adminSidebar}
      />
    </header>
  );
}

export default AdminNavbar;

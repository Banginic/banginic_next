"use client";
import React, { useContext } from "react";
import AdminNavbar from "./AdminNavbar";
import { AppContext } from "@/context/AppProvider";
function MainHeader() {
  const { showAdminNavbar } = useContext(AppContext)!;
  return (
    <div
      className={`${
        showAdminNavbar
          ? "fixed right-2 left-2 top-2 lg:right-5 lg:left-5 shadow rounded-full backdrop-blur-lg bg-black/30"
          : ""
      } z-40`}
    >
      <AdminNavbar />
    </div>
  );
}

export default MainHeader;

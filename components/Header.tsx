"use client";
import React, { useContext } from "react";
import MainNavbar from "./MainNavbar";
import { AppContext } from "@/context/AppProvider";

function Header() {
  const { showMainNavbar } = useContext(AppContext)!;
  return (
    <div
      className={`${
        showMainNavbar
          ? "fixed right-2 left-2 top-2 lg:right-5 lg:left-5 shadow rounded-full backdrop-blur-lg bg-black/30 max-w-[97rem] mx-auto "
          : ""
      } z-40`}
    >
      <MainNavbar />
    </div>
  );
}

export default Header;

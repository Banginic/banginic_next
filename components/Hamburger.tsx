"use client";
import React from "react";
import Image from "next/image";
import { open_menu } from "@/assets/photos";

function Hamburger({
  setSidebar,
}: {
  isSidebarOpen: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="lg:hidden ">
      <button
        onClick={() => setSidebar(true)}
        className="md:hidden cursor-pointer hover:bg-white/10 trans rounded p-1 "
      >
        <Image src={open_menu} width={40} alt="./placeholder.png" />
      </button>
    </div>
  );
}

export default Hamburger;
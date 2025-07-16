"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { open_menu } from "@/assets/photos";
import { AppContext } from "@/context/AppProvider";
import { usePathname } from "next/navigation";

function Hamburger({
  setSidebar,
}: {
  isSidebarOpen: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const pathname = usePathname()
  const { user} = useContext(AppContext)!
  return (
    <div className={`${!user && pathname.startsWith('/admin') ? 'hidden' : 'lg:hidden'}`}>
      <button
        onClick={() => setSidebar(true)}
        className="lg:hidden cursor-pointer hover:bg-white/10 trans rounded p-1 "
      >
        <Image src={open_menu} width={40} alt="./placeholder.png" />
      </button>
    </div>
  );
}

export default Hamburger;
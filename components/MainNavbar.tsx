"use client";
import Link from "next/link";
import { mainNavlinks } from "@/assets/data";
import { Hamburger, Logo, Navlinks, Sidebar, Language } from "./exportComp";
import { useContext } from "react";
import { AppContext } from "@/context/AppProvider";

function MainNavbar() {
  const { user, mainSidebar, setMainSidebar } = useContext(AppContext)!;
  return (
    <header className="h-[13dvh] lg:h-[17dvh]  flex lg:py-8 items-center relative ">
      <nav
        className={`flex items-center justify-between w-full px-6  ${
          !user ? "lg:px-24" : "lg:justify-around"
        } w-full`}
      >
        <Link href={"/"}>
          <Logo textSize="heading3" logoSize={45} />
        </Link>
        <div className={`${!user && "hidden"}`}>
          <Navlinks navlinks={mainNavlinks} />
        </div>
        <div className={`${user ? "hidden" : "flex"}  items-center gap-4`}>
          <Language />
          <Hamburger isSidebarOpen={mainSidebar} setSidebar={setMainSidebar} />
        </div>
      </nav>
      <div>
        <Sidebar
          isSidebarOpen={mainSidebar}
          setSidebar={setMainSidebar}
          navlinks={mainNavlinks}
        />
      </div>
    </header>
  );
}

export default MainNavbar;

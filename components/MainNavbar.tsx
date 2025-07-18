"use client";
import Link from "next/link";
import { mainNavlinks, mainSidelinks } from "@/assets/data";
import {
  Hamburger,
  Logo,
  Navlinks,
  Sidebar,
  Language,
  Github,
} from "./exportComp";
import { useContext } from "react";
import { AppContext } from "@/context/AppProvider";

function MainNavbar() {
  const { mainUser, mainSidebar, setMainSidebar } = useContext(AppContext)!;
  return (
    <header className="h-[10dvh] lg:h-[15dvh] flex lg:py-8 items-center relative max-w-[97rem] mx-auto ">
      <nav
        className={`flex items-center justify-between  w-full px-6  ${
          mainUser ? "lg:px-24" : "lg:justify-around"
        } w-full`}
      >
        <Link href={"/"}>
          <Logo textSize="heading4" logoSize={45} />
        </Link>

        <Navlinks navlinks={mainNavlinks} />

        <div className={` flex items-center gap-2 lg:gap-4`}>
          <Github />
          <Language />
          <Link href="/contact-us" className="hidden md:block">
            <button className="font-medium bg-accent montserrat hover:bg-accent-tone rounded-full cursor-pointer text-white px-6 py-2 md:text-sm">
              Get in touch
            </button>
          </Link>
          <Hamburger currentUser={mainUser} isSidebarOpen={mainSidebar} setSidebar={setMainSidebar} />
        </div>
      </nav>
      <div>
        <Sidebar
          isSidebarOpen={mainSidebar}
          setSidebar={setMainSidebar}
          navlinks={mainSidelinks}
        />
      </div>
    </header>
  );
}

export default MainNavbar;

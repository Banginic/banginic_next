"use client";
import { useContext, Dispatch, SetStateAction } from "react";
import type { NavlinkTypes } from "@/models/types";
import { User } from "@/components/exportComp";
import { AppContext } from "@/context/AppProvider";
import Link from "next/link";
import Image from "next/image";
import { close_menu } from "@/assets/photos";
import { usePathname } from "next/navigation";

function Sidebar({
  isSidebarOpen,
  setSidebar,
  navlinks,
}: {
  setSidebar: Dispatch<SetStateAction<boolean>>;
  navlinks: NavlinkTypes[];
  isSidebarOpen: boolean;
}) {
  const pathname = usePathname();
  const signInRoute = pathname.startsWith("/admin")
    ? "/admin/sign-in"
    : "/sign-in";
  const homeRoute = pathname.startsWith("/admin") ? "/admin" : "/";
  const appContext = useContext(AppContext);

  return (
    <aside
      className={`${
        isSidebarOpen ? "fixed" : "hidden"
      } lg:hidden  right-0 left-0 top-0 min-h-105 z-50 bg-black/90 backdrop-blur-sm  p-6 rounded`}
      onClick={() => appContext?.setShowSidebar(false)}
    >
      <div onClick={() => setSidebar(false)}>
        <User signInRoute={signInRoute} homeRoute={homeRoute} />
      </div>
      <button
        onClick={() => setSidebar(false)}
        className="absolute top-8 right-4 cursor-pointer hover:bg-white/10 trans rounded p-1"
      >
        <Image src={close_menu} alt="./placeholder.png" width={40} />
      </button>
      <ul className="flex  justify-between gap-5 flex-col my-12 text-center">
        {navlinks.map((link, index) => {
          return (
            <Link
              href={link.href}
              key={index}
              onClick={() => setSidebar(false)}
              className={`w-[80%]  trans text-center  
            hover:bg-accent/10 hover:dark:bg-accent/10 trans rounded `}
            >
              <div className="flex items-center justify-start px-4 gap-5 py-2 ">
                <Image src={link.icon} alt={"./placeholder.png"} width={35} />
                <p className=" text-lg text-pink-100">{link.label}</p>
              </div>
            </Link>
          );
        })}
      </ul>
    </aside>
  );
}

export default Sidebar;

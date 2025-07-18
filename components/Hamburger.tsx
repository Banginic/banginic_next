"use client";
import Image from "next/image";
import { open_menu } from "@/assets/photos";
import { usePathname } from "next/navigation";
import { UserType } from '@/models/types'

function Hamburger({
  currentUser,
  setSidebar,
}: {
  isSidebarOpen: boolean;
  currentUser: UserType 
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const pathname = usePathname()

  return (
    <div className={`${!currentUser && pathname.startsWith('/admin') ? 'hidden' : 'lg:hidden'}`}>
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
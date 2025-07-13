import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { sidebarLinks } from '../assets/assets.ts'
import{ User} from "../conponents/exportComp.ts";
import { AppContext } from "../context/AppProvider.tsx";

function Sidebar() {
 const appContext = useContext(AppContext)

  return (
    <section
      className="w-full bg-black/50 backdrop-blur-sm h-screen p-6 relative"
      onClick={() => appContext?.setShowSidebar(false)}
    >
      <User />
      <ul className="flex md:hidden justify-between gap-5 flex-col my-12 text-center">
        {sidebarLinks.map((link, index) => {
          return (
            <NavLink
              to={link.pathname}
              key={index}
              
              className={`w-[80%]  trans text-center  
            hover:bg-accent/10 hover:dark:bg-accent/10 trans rounded `}
            >
              <div className="flex items-center justify-start px-4 gap-5 py-2 ">
                <img
                  src={link.icon}
                  alt={link.icon}
                  width={35}
                  loading="lazy"
                  
                />
                <p className=" text-lg text-pink-100">{link.name}</p>
              </div>
            </NavLink>
          );
        })}
      </ul>
    </section>
  );
}

export default Sidebar;

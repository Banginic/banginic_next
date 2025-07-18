"use client";
import { AppContext } from "../context/AppProvider";
import { useContext } from "react";
import { france_flag, uk_flag } from "@/assets/photos";
import Image from "next/image";

function Language() {
  const appContext = useContext(AppContext);

  return (
    <section className=" bg-black/20 backdrop:blur-sm relative group w-15  hover:bg-white/20 trans shadow-green-400/20  px-2 py-2 rounded cursor-pointer">
      <button
        title="Change language"
        className="flex items-center gap-1 cursor-pointer  "
      >
        <Image
          src={appContext?.lang === "EN" ? uk_flag : france_flag}
          width={20}
          alt={"./placeholder.png"}
        />
        <span>{appContext?.lang}</span>
      </button>
      <div className="absolute hidden group-hover:block bg-black/20 backdrop:blur-sm top-9 -right-1 p-2 w-16 rounded">
        <button
          onClick={() => appContext?.setLang("EN")}
          title="English language"
          className={`flex items-center gap-1 ${
            appContext?.lang === "EN" && "hidden"
          } cursor-pointer w-full `}
        >
          <Image src={uk_flag} width={20} alt={"./placeholder.png"} />
          <span>EN</span>
        </button>
        <button
          onClick={() => appContext?.setLang("FR")}
          title=" Francaise"
          className={`flex items-center gap-1 cursor-pointer ${
            appContext?.lang === "FR" && "hidden"
          }  w-full`}
        >
          <Image src={france_flag} width={20} alt={"./placeholder.png"} />
          <span>FR</span>
        </button>
      </div>
    </section>
  );
}

export default Language;

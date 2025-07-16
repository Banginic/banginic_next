import { close_menu } from "@/assets/photos";
import Image from "next/image";
import React from "react";

interface PropsTypes {
  isDialogOpen: boolean;
  closeDialog: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

function Dialogue({ isDialogOpen, closeDialog, children }: PropsTypes) {
  return (
    <div
      className={`${
        isDialogOpen ? "fixed inset-0 bg-black/80 backdrop:blur-2xl" : "hidden"
      } grid place-items-center`}
    >
      <div className=" p-8 rounded border border-pink-400/30 shadow bg-black/70 text-white relative">
        <button
          onClick={() => closeDialog(false)}
          className="absolute top-8 right-4 p-1 cursor-pointer rounded hover:bg-green-300/10 trans"
        >
          <Image src={close_menu} width={40} alt="./placeholder.png" />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Dialogue;

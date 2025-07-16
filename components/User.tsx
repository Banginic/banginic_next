"use client";
import { useContext } from "react";
import { person } from "@/assets/photos";
import { AppContext } from "../context/AppProvider";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";

function User({
  signInRoute,
  homeRoute,
}: {
  signInRoute: string;
  homeRoute: string;
}) {
  const appContext = useContext(AppContext);
  const pathname = usePathname();

  async function logOut() {
    //Admin sign out
    if (pathname.startsWith("/admin")) {
      const res = await fetch("/api/sign-out", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      toast.success(data.message);
    }
  }

  return (
    <section className="text-center p-2 rounded  ">
      {appContext?.user ? (
        <div className="flex flex-col items-center gap-2  py-2 ">
          <div className="md:hidden">
            <Image
              title="Visit profile"
              alt="./placeholder.png"
              width={50}
              src={person}
              className="size-12 rounded-full cursor-pointer dark:bg-900"
            />
            <p className="flex gap-2 text-accent">
              <span>Hello!</span>
              <span>Admin</span>
            </p>
          </div>
          <button
            title="Log out"
            onClick={async () => {
              window.localStorage.removeItem("user");
              await logOut();
              appContext?.router.push(signInRoute);
            }}
            className="px-6 py-2 rounded b text-pink-400 hover:scale-x-105 trans cursor-pointer border"
          >
            Log out
          </button>
        </div>
      ) : (
        <div className="flex gap-4 p-4 items-center justify-center text-sm">
          <button
            onClick={() => appContext?.router.push(signInRoute)}
            title="Login page"
            className="cursor-pointer px-6 rounded py-3 bg-gradient-to-br font-semibold text-[16px] from-pink-400 via-purple-400 to-pink-400 hover:opacity-90 trans"
          >
            Login / Create account
          </button>
        </div>
      )}
    </section>
  );
}

export default User;

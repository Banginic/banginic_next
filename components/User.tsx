import { useContext } from "react";
import { person } from "../assets/assets";
import { AppContext } from "../context/AppProvider";

function User() {
  const appContext = useContext(AppContext);

  return (
    <section className="text-center p-2 rounded bg-gray-900/50 ">
      {localStorage.getItem("token") ? (
        <div className="flex flex-col items-center gap-2  py-2">
          <img
            title="Visit profile"
            alt="logo"
            src={person}
            className="size-12 rounded-full cursor-pointer dark:bg-900"
          />
          <p className="flex gap-2 text-accent">
            <span>Hello!</span>
            <span>User</span>
          </p>
          <button
            title="Log out"
            onClick={() => {
              window.localStorage.removeItem('user');
              appContext?.navigate("/");
            }}
            className="px-6 py-2 rounded b text-red-200 cursor-pointer border"
          >
            Log out
          </button>
        </div>
      ) : (
        <div className="flex gap-4 p-4 items-center justify-center text-sm">
          <button
            onClick={() => appContext?.navigate("/login")}
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

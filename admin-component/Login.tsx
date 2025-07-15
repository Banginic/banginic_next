import React from "react";

function Login() {
  return (
    <div className=" grid place-items-center bg-black/80">
      <form
        action=""
        className="border rounded border-pink-300/50 p-8 w-sm shadow bg-black/90 backdrop:blur-sm"
      >
        <h1 className="text-2xl font-semibold text-center">Login</h1>
        <div className="mt-8 mb-4">
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="example@email.com"
            maxLength={25}
            className=" w-full border border-pink-300/50 rounded px-4 py-2 bg-transparent"
          />
        </div>
        <div className=" mb-4">
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            autoComplete="password"
            placeholder="**********"
            maxLength={10}
            className=" w-full border border-pink-300/50 rounded px-4 py-2 bg-transparent"
          />
        </div>
        <button className="bg-pink-400 hover:scale-105 trans text-white px-4 py-2.5 rounded shadow cursor-pointer mt-8 w-full">Login</button>
        <p className="h-4 mt-2 text-red-500 text-center"></p>
      </form>
    </div>
  );
}

export default Login;

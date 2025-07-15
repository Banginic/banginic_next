"use client";
import React, { ChangeEvent, useState } from "react";

function Login() {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  function toggleState() {
    if (state === "Login") {
      return setState("Sign up");
    }
    setState("Login");
  }
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }
  return (
    <div className="h-screen grid place-items-center bg-blac">
      <form
        action=""
        className="border rounded border-pink-300/50 p-8 w-sm shadow bg-black/70 backdrop:blur-lg"
      >
        <h1 className="text-2xl font-semibold text-center">{state}</h1>
        <div>
          {state === "Sign up" && (
            <div className="mt-8 mb-4">
              <label htmlFor="name" className="block mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
                placeholder="Banginic admin"
                maxLength={25}
                className=" w-full border border-pink-300/50 rounded px-4 py-2 bg-transparent"
              />
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
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
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="password"
            placeholder="**********"
            maxLength={10}
            className=" w-full border border-pink-300/50 rounded px-4 py-2 bg-transparent"
          />
        </div>
        <button className="bg-pink-400 hover:scale-105 trans text-white px-4 py-2.5 rounded shadow cursor-pointer mt-8 w-full">
          Login
        </button>
        <div>
          {state === "Login" ? (
            <p className="flex gap-4 mt-2 justify-center">
              <span>Don't have an account?</span>
              <span
                onClick={toggleState}
                className="text-indigo-600 cursor-pointer"
              >
                Sign up
              </span>
            </p>
          ) : (
            <p className="flex gap-4 mt-2 justify-center">
              <span>Have an account?</span>
              <span
                onClick={toggleState}
                className="text-indigo-600 cursor-pointer"
              >
                Login
              </span>
            </p>
          )}
        </div>
        <p className="h-4 mt-2 text-red-500 text-center"></p>
      </form>
    </div>
  );
}

export default Login;

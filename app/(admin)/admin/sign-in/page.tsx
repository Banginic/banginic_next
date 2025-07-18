"use client";
import { AppContext } from "@/context/AppProvider";
import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { toast } from "react-toastify";

function Login() {
  const { setAdminUser, router } = useContext(AppContext)!;
  const [state, setState] = useState("Login");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
  async function handleSubit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);

    async function postForm(endpoint: string) {
      const res = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      return await res.json();
    }

    try {
      //    login state
      if (state === "Login") {
        const data = await postForm("/api/auth/sign-in");
     
        if (data.success) {
          toast.success(data.message);
          localStorage.setItem("admin-user", JSON.stringify(data.data[0]));
          setAdminUser(data.data[0]);
          setFormData({ name: "", email: "", phone: "", password: "" });
            toast.success(data.message);
           router.push("/admin");
           return
        }
        setError(data.message);
        return;
      }

      // handle sign up...
      const data = await postForm("/api/auth/sign-up");

      if (data.success) {
        toast.success(data.message);
        localStorage.setItem("admin-user", JSON.stringify(data.data[0]));
        setAdminUser(data.data[0]);
        setFormData({ name: "", email: "", phone: "", password: "" });
        toast.success(data.message);
        router.push("/admin");
        return
      }
      setError(data.message);
      return;
    } catch (ex) {
      if (ex instanceof Error) {
        return setError(ex.message);
      }
      setError("Error posting to database.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen grid place-items-center pb-12">
      <form
        onSubmit={handleSubit}
        className="border rounded border-pink-300/50 p-8 w-sm shadow bg-black/70 backdrop:blur-lg"
      >
        <h1 className="text-2xl font-semibold text-center">{state}</h1>
        <div>
          {state === "Sign up" && (
            <div>
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
              <div className="mb-4">
                <label htmlFor="phone" className="block mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  autoComplete="phone"
                  placeholder="+1 (340) 324 2322"
                  maxLength={25}
                  className=" w-full border border-pink-300/50 rounded px-4 py-2 bg-transparent"
                />
              </div>
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
            maxLength={25}
            className=" w-full border border-pink-300/50 rounded px-4 py-2 bg-transparent"
          />
        </div>
        <button
          disabled={isLoading}
          className="bg-pink-400 disabled:bg-pink-400/50 hover:scale-105 trans text-white px-4 py-2.5 rounded shadow cursor-pointer mt-8 w-full"
        >
          {isLoading ? (
            <span className="animation-pulse">Loading...</span>
          ) : (
            state
          )}
        </button>
        <div className="hidden">
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
        <p className="h-4 mt-2 text-red-500 text-center">{error}</p>
      </form>
    </div>
  );
}

export default Login;

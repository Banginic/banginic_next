"use client";
import type { FormEvent } from "react";
import { useContext, useState } from "react";
import { Logo } from "@/components/exportComp";
import {
  apple_logo,
  google_logo,
  call,
  email,
  lock,
  person,
} from "@/assets/photos";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "@/context/expContext";
import Image from "next/image";

function Login() {
  const appContext = useContext(AppContext);
  const [formState, setFormState] = useState("Login");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(" ");
  const [viewPassword, setViewPassword] = useState("password");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    rememberMe: false,
  });
  function clearForm() {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      rememberMe: false,
    });
  }

  function toggleFormState() {
    if (formState === "Login") {
      setError("");
      setLoading(false);
      clearForm();
      return setFormState("Sign Up");
    }
    clearForm();
    setFormState("Login");
  }

  function togglePassword() {
    if (viewPassword === "password") return setViewPassword("text");
    return setViewPassword("password");
  }
  const passwordIcon =
    viewPassword === "password" ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        className="fill-gray-300"
      >
        <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        className="fill-gray-300"
      >
        <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
      </svg>
    );
  async function handlerFormSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      // SIGNIN
      if (formState === "Login") {
        const body = { email: formData.email, password: formData.password };
        const { data } = await axios.post("", body);
        const { success, message, user, token } = data;

        if (!success) {
          setError(message);
          setLoading(false);
          return clearForm();
        }
        toast.success(message);
        setLoading(false);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        appContext?.setUser(user);
      }

      // SIGNUP
      const { data } = await axios.post("", formData);
      const { success, message, user, token } = data;
      if (!success) {
        setError(message);
        setLoading(false);
        return clearForm();
      }
      toast.success(message);
      setLoading(false);
      localStorage.setItem("token", token);
      appContext?.setUser(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unknown error", error);
      }
    }
  }
  return (
    <form
      onSubmit={handlerFormSubmit}
      className="bg-black/40 backdrop:blur-md mb-8 p-8 rounded-lg 
      w-sm  border-gray-300 dark:border-gray-800 mx-auto shadow-accent/20 shadow-lg"
    >
      <div className="text-start mb-5 ">
        <Logo logoSize={40} textSize="heading4" />
        <p className="t text-pink-100/60">{formState} using the form below</p>
      </div>
      {formState !== "Login" && (
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-start mb-1.5">
            Full Name{" "}
          </label>
          <div className="border rounded-lg py-3 flex items-center px-4 gap-2 border-pink-50/50 ">
            <Image src={person} width={25} alt=".placeholder.png" />{" "}
            <input
              type="text"
              placeholder="Full Name"
              required
              autoComplete="name"
              value={formData.fullName}
              minLength={3}
              maxLength={20}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="w-full bg-transparent outline-none border-none text-sm"
            />
          </div>
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="email" className="block text-start text-sm mb-1.5">
          Email{" "}
        </label>
        <div className="border rounded-lg py-3 flex items-center px-4 gap-2 border-pink-50/50">
          <Image src={email} width={25} alt="" />
          <input
            type="text"
            placeholder="example@email.com"
            required
            autoComplete="email"
            minLength={9}
            maxLength={25}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full  bg-transparent outline-none border-none text-sm"
          />
        </div>
      </div>
      {formState !== "Login" && (
        <div className="mb-4">
          <label htmlFor="phone" className="block text-start text-sm mb-1.5">
            Phone{" "}
          </label>
          <div className="border rounded-lg py-3 flex items-center px-4 gap-2 border-pink-50/50">
            <Image src={call} width={25} alt="" />
            <input
              type="tell"
              placeholder="+1 234 2505 3400"
              required
              autoComplete="tell"
              minLength={9}
              maxLength={15}
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full bg-transparent outline-none border-none text-sm"
            />
          </div>
        </div>
      )}
      <div className={`${formState === "Login" ? "mb-4" : "mb-6"}`}>
        <label htmlFor="password" className="block text-start text-sm mb-1">
          Password
        </label>
        <div className="relative border rounded-lg py-3 flex items-center px-4 gap-2 border-pink-50/50">
          <Image src={lock} width={25} alt="" />
          <input
            type={viewPassword}
            placeholder="Password"
            required
            id="password"
            autoComplete="password"
            value={formData.password}
            minLength={8}
            maxLength={12}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full bg-transparent outline-none border-none text-sm"
          />
          <span
            onClick={togglePassword}
            className="absolute right-3 top-3.5 lg:top-2 cursor-pointer "
          >
            {passwordIcon}
          </span>
        </div>
      </div>
      {formState === "Login" && (
        <div className="flex items-center font-medium text-sm  justify-between mb-6">
          <label
            htmlFor="rememberMe"
            className="cursor-pointer flex items-center gap-2"
          >
            <input
              type="checkbox"
              checked={formData.rememberMe}
              onChange={() =>
                setFormData({ ...formData, rememberMe: !formData.rememberMe })
              }
              id="rememberMe"
              className="cursor-pointer"
            />
            Remember me
          </label>
          <p className="text-pink-100 hover:underline cursor-pointer">
            Forgot Password
          </p>
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full disabled:bg-accent/50 cursor-pointer bg-accent hover:opacity-80 text-white text-lg font-semibold rounded-lg py-2.5 bg-gradient-to-br from-pink-400 via-purple-400 to-pink-400 mb-2"
      >
        {isLoading ? "Loding..." : formState}
      </button>
      <p className="text-sm text-red-500 font-medium text-center mb-2">
        {error}
      </p>
      <div className="flex items-center gap-3 mb-3 ">
        <hr className="border-0.5 border-gray-400 w-1/2 " />
        <span className="text-xs">Or</span>
        <hr className="border-0.5 border-gray-400 w-1/2 " />
      </div>
      {/* OAUTH */}
      <button
        type="button"
        className="text-sm flex items-center gap-2 justify-center font-medium w-full cursor-pointer rounded-lg py-3 border border-pink-50/30 mb-4 hover:border-black/10 hover:bg-black/10  "
      >
        <Image src={google_logo} alt=" google logo" width={20} />
        Continue with Google
      </button>
      <button
        type="button"
        className="text-sm flex items-center gap-2 justify-center font-medium w-full cursor-pointer rounded-lg py-3 border border-pink-50/30 mb-4 hover:border-black/10  hover:bg-black/10  "
      >
        <Image src={apple_logo} alt=" google logo" width={20} />
        Continue with Apple
      </button>

      {/* TOGGLE FORM STATE */}
      {formState === "Login" ? (
        <p
          onClick={toggleFormState}
          className="text-sm flex items-center justify-center gap-2 mt-2"
        >
          <span>Don't have an account?</span>
          <span className="text-accent  text-sm font-medium cursor-pointer hover:text-indigo-900 hover:underline">
            Sign up
          </span>
        </p>
      ) : (
        <p
          onClick={toggleFormState}
          className="text-xs flex items-center justify-center gap-2 mt-2"
        >
          <span>Already have an account?</span>
          <span className="text-accent   text-[16px ] cursor-pointer hover:text-indigo-900 hover:underline">
            Login
          </span>
        </p>
      )}
    </form>
  );
}

export default Login;

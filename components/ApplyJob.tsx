'use client'
import React, { useContext, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Logo from "./Logo";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { AppContext } from "../context/AppProvider";
import Spiner from "./Spiner";

interface Props {
  jobId: number;
  closeDialog: React.Dispatch<React.SetStateAction<boolean>>;
}
interface Employee {
  fullName: string;
  emailAddress: string;
  phone: string;
  motivation: string;
  cv: File | null;
}
function ApplyJob(props: Props) {
  const appContext = useContext(AppContext);
  const [error, setError] = useState("");
  const [employee, setEmployee] = useState<Employee>({
    fullName: "",
    emailAddress: "",
    phone: "",
    motivation: "",
    cv: null,
  });
  function clearForm() {
    setEmployee({
      fullName: "",
      emailAddress: "",
      phone: "",
      motivation: "",
      cv: null,
    });
  }

  const body = new FormData();
  body.append("name", employee.fullName);
  body.append("email", employee.emailAddress);
  body.append("phone", employee.phone);
  body.append("motivation", employee.motivation);
  if (employee.cv) {
    body.append("resume", employee.cv);
  }
  const applyJob = async () => {
    const { data } = await axios.post(
     
        `/api/upload?jobId=${props.jobId}`,
      body
    );
    return data;
  };

  const { isPending, isError, mutate } = useMutation({
    mutationFn: applyJob,
    onSuccess: (data) => {
      clearForm();
      toast.success(data.message);
      setTimeout(() => appContext?.router.push("/career"), 3000);
    },
    onError: (err: unknown) => {
      if (err instanceof Error) {
        setError(err.message);
      }
      if (err instanceof AxiosError) {
        setError(err?.response?.data.message);
      }
      clearForm();
      setTimeout(() => appContext?.router.push("/career"), 3000);
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    if (e.target.name === "cv" && e.target.files) {
      setEmployee({ ...employee, cv: e.target.files[0] });
    } else {
      setEmployee({ ...employee, [name]: value });
    }
  };
  const disableBTN =
    employee.emailAddress.length < 8 ||
    employee.fullName.length < 3 ||
    isPending ||
    employee.motivation.length < 15;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    mutate();
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="w-sm shadow-xl z-100 border-pink-200  text-white backdrop:blur-sm mt-8 rounded-lg text-xs"
    >
  
      <div className="mb-2 mt-4">
        <label htmlFor="fullName" className="block mb-1">
          Full name
        </label>
        <input
          type="text"
          required
          onChange={handleChange}
          value={employee.fullName}
          name="fullName"
          autoComplete="full name"
          placeholder="John Smith"
          maxLength={25}
          minLength={3}
          className="border w-full py-2 px-4 rounded-xl  border-gray-700/70 bg-transparent"
        />
      </div>
      <div className="mb-2 ">
        <label htmlFor="emailAddress" className="block mb-1">
          Email Address
        </label>
        <input
          type="text"
          required
          autoComplete="email"
          onChange={handleChange}
          value={employee.emailAddress}
          name="emailAddress"
          placeholder="example@email.com"
          maxLength={25}
          minLength={3}
          className="border w-full py-2 px-4 rounded-xl border-gray-700/70 bg-transparent"
        />
      </div>
      <div className="mb-3 ">
        <label htmlFor="phone" className="block mb-1">
          Telephone
        </label>
        <input
          type="tell"
          required
          name="phone"
          autoComplete="phone"
          onChange={handleChange}
          value={employee.phone}
          placeholder="+1 343 3433 0030"
          maxLength={25}
          minLength={3}
          className="border w-full py-2 px-4 rounded-xl border-gray-700/70 bg-transparent"
        />
      </div>
      <div className="mb-3 ">
        <label htmlFor="motivation" className="block mb-1">
          Motivation
        </label>
        <textarea
          required
          onChange={(e) =>
            setEmployee({ ...employee, motivation: e.target.value })
          }
          value={employee.motivation}
          name="motivation"
          placeholder="Motivation letter"
          rows={3}
          className="border w-full py-2 px-4 rounded-lg border-gray-700/70 bg-transparent"
        ></textarea>
      </div>
      <div className="mb-3 ">
        <label htmlFor="resume">
          Upload your CV{" "}
          <span className="text-xs text-gray-500">(pdf, doc, docx ONLY)</span>
          <input
            type="file"
            name="cv"
            id="resume"
            accept=".pdf, .doc, .docx"
            onChange={handleChange}
            required
            className="border py-2 px-4 rounded-xl border-gray-700/70 w-full cursor-pointer mt-1"
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={disableBTN}
        className="bg-black disabled:cursor-not-allowed flex justify-center items-center dark:bg-accent text-white text-sm py-2 cursor-pointer hover:opacity-90 trans px-6 w-full rounded-xl mt-4 disabled:bg-gray-400 dark:disabled:bg-gray-800"
      >
       {
            isPending ? <span className="flex items-center gap-2 "> 
              <Spiner />
               Appying... </span> : 'Send Application'
          }
      </button>
      <p className="text-red-500 text-center h-5 mt-1">{error}</p>
    </form>
  );
}

export default ApplyJob;

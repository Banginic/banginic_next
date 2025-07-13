import React, { useContext, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Logo from "./Logo";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { AppContext } from "../context/AppProvider";
import Spiner from "./Spiner";

interface Props {
  jobId: string | undefined;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
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
  body.append("fullName", employee.fullName);
  body.append("emailAddress", employee.emailAddress);
  body.append("phone", employee.phone);
  body.append("motivation", employee.motivation);
  if (employee.cv) {
    body.append("cv", employee.cv);
  }
  const applyJob = async () => {
    const { data } = await axios.post(
      import.meta.env.VITE_BASE_URL +
        `/api/v2/jobs/applications/create/${props.jobId}`,
      body
    );
    return data;
  };

  const { isPending, isError, mutate } = useMutation({
    mutationFn: applyJob,
    onSuccess: (data) => {
      clearForm();
      toast.success(data.message);
      setTimeout(() => appContext?.navigate("/careers"), 3000);
    },
    onError: (err: unknown) => {
      if (err instanceof Error) {
        setError(err.message);
      }
      if (err instanceof AxiosError) {
        setError(err?.response?.data.message);
      }
      clearForm();
      setTimeout(() => appContext?.navigate("/careers"), 3000);
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
  if (isError) {
    return (
      <div className="h-screen grid place-items-center">
        <div>
          <h3 className="heading3 text-center">{error}</h3>
          <p className="text-center text-gray-400">
            <a href="#footer" className="text-indigo-700 underline font-bold">
              Subscribe
            </a>{" "}
            to our news letter to recieve information of latest openings
          </p>
        </div>
      </div>
    );
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="w-sm border mx-auto shadow-accent/20 shadow-xl mt-12 lg:mt-8 border-pink-200 bg-white text-black backdrop:blur-sm dark:border-gray-800/50 dark:bg-gray-900/50 rounded-lg p-6 text-sm"
    >
      <Logo textSize="heading4" logoSize="size-8" />
      <p className="t">
        Apply for this job using the form below.
      </p>
      <div className="mb-4 mt-8">
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
          className="border w-full py-3 px-4 rounded-xl  border-gray-700/70 bg-transparent"
        />
      </div>
      <div className="mb-4 ">
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
          className="border w-full py-3 px-4 rounded-xl border-gray-700/70 bg-transparent"
        />
      </div>
      <div className="mb-4 ">
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
          className="border w-full py-3 px-4 rounded-xl border-gray-700/70 bg-transparent"
        />
      </div>
      <div className="mb-4 ">
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
          rows={4}
          className="border w-full py-2 px-4 rounded-lg border-gray-700/70 bg-transparent"
        ></textarea>
      </div>
      <div className="mb-4 ">
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
            className="border py-3 px-4 rounded-xl border-gray-700/70 w-full cursor-pointer mt-1"
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={disableBTN}
        className="bg-black disabled:cursor-not-allowed flex justify-center items-center dark:bg-accent text-white text-sm py-3 cursor-pointer hover:opacity-90 trans px-6 w-full rounded-xl mt-4 disabled:bg-gray-400 dark:disabled:bg-gray-800"
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

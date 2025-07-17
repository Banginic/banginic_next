"use client";
import React, { FormEvent, useState } from "react";
import { useMyMutate } from "@/hooks/useQuery";

interface JobTypes {
  success: boolean;
  message?: string;
  error?: string;
  data?: {
    id: number;
    title: string;
    location: string;
    description: string;
    createdAt: Date;
    latestDate: Date;
  }[] | [];
}
function JobForm({
  closeDialog,
}: {
  closeDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    latestDate: new Date().toISOString().slice(0, 10),
  });
  const [ error, setError ] = useState('')

  function clearForm() {
    setFormData({
      title: "",
      location: "",
      description: "",
      latestDate: new Date().toISOString().slice(0, 10),
    });
    closeDialog(false)
  }
  async function postJob() {
    const response = await fetch("/api/jobs/create-job", {
      body: JSON.stringify(formData),
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return await response.json();
  }
  const { isPending, isError, mutate } = useMyMutate <JobTypes>(
    "jobs",
    postJob,
    setError,
    clearForm
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    mutate();
    setTimeout(() => clearForm, 10000);
  }
  return (
    <form onSubmit={handleSubmit} className="w-sm mb-8">
      <h1 className="text-xl lg:text-2xl font-semibold text-center mt-4">
        Create Job
      </h1>
      <div className="mb-4 mt-8">
        <label htmlFor="title" className="block mb-1">
          Title
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Java developer"
          className="w-full px-4 py-2 rounded border border-pink-300/40 shadow"
        />
      </div>
      <div className="mb-4 ">
        <label htmlFor="title" className="block mb-1">
          Location
        </label>
        <input
          type="text"
          required
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          placeholder="Douala Cameroon"
          className="w-full px-4 py-2 rounded border border-pink-300/40 shadow"
        />
      </div>
      <div className="mb-4 ">
        <label htmlFor="title" className="block mb-1">
          Latest date
        </label>
        <input
          type="date"
          required
          value={formData.latestDate}
          onChange={(e) =>
            setFormData({ ...formData, latestDate: e.target.value })
          }
          placeholder="Douala Cameroon"
          className="w-full px-4 py-2 rounded border border-pink-300/40 shadow text-white"
        />
      </div>
      <div className="mb-4 ">
        <label htmlFor="description" className="block mb-1">
          Description
        </label>
        <textarea
          placeholder="News Body"
          required
          rows={5}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full px-4 py-2 rounded border border-pink-300/40 shadow"
        ></textarea>
      </div>
      <button
        disabled={isPending}
        className="bg-pink-400 disabled:opacity-60 w-full rounded py-2.5 cursor-pointer hover:opacity-70 mt-2"
      >
        {isPending ? (
          <span className="animate-pulse">Creating...</span>
        ) : (
          "Send"
        )}
      </button>
      <p className="text-red-500 text-center mt-2 h-4">{error}</p>
    </form>
  );
}

export default JobForm;

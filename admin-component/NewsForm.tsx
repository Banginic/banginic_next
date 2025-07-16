"use client";
import React, { FormEvent, useState } from "react";
import { useMyMutate } from "@/hooks/useQuery";

interface NewsTypes {
  success: boolean;
  message?: string;
  error?: string;
  data?: {
    id: number;
    subject: string;
    body: string;
  }[];
}
function NewsForm({
  closeDialog,
}: {
  closeDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [formData, setFormData] = useState({ subject: "", message: "" });
  async function postNews() {
    const response = await fetch("/api/news/create-news", {
      body: JSON.stringify(formData),
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return await response.json();
  }

  const { isPending, isError, mutate } = useMyMutate<NewsTypes>(
    "news",
    postNews,
    closeDialog
  );
  const error = isError ? "Error posting news." : "";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    mutate();
    setTimeout(() => setFormData({ subject: "", message: "" }), 10000)
  }
  return (
    <form onSubmit={handleSubmit} className="w-sm mb-8">
      <h1 className="text-xl lg:text-2xl font-semibold text-center mt-4">
        Create News
      </h1>
      <div className="mb-4 mt-8">
        <label htmlFor="subject" className="block mb-1">
          Subject
        </label>
        <input
          type="text"
          required
          value={formData.subject}
          onChange={(e) =>
            setFormData({ ...formData, subject: e.target.value })
          }
          placeholder="News Subject"
          className="w-full px-4 py-2 rounded border border-pink-300/40 shadow"
        />
      </div>
      <div className="mb-4 ">
        <label htmlFor="body" className="block mb-1">
          Body
        </label>
        <textarea
          placeholder="News Body"
          required
          rows={5}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
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

export default NewsForm;

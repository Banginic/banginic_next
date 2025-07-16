"use client";
import { NewsForm, Dialogue } from "@/admin-component/index";
import { AppContext } from "@/context/AppProvider";
import React, { useContext } from "react";
import { useMyMutate, useMyQuery } from "@/hooks/useQuery";
import { Loading } from "@/components/exportComp";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { client } from "@/components/userClient";

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

function News() {
  const { showNewsForm, setNewsForm } = useContext(AppContext)!;
  async function deleteNews(id: string) {
    const response = await fetch(`/api/news/delete-news?newsId=${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return await response.json();
  }

  async function getNews() {
    const response = await fetch("/api/list-news", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return await response.json();
  }
  const { isLoading, isError, data, refetch } = useMyQuery("news", getNews);
  const { isPending, isError: mutateError, mutate } = useMutation({
    mutationFn: deleteNews,
     onSuccess: (data) => {
          if (data.success) {
            toast.success(data?.message);
            client.invalidateQueries({ queryKey: ['news']})
             return
          }
        },
        onError: (error: unknown) => {
          if (error instanceof Error) {
            toast.error(error.message);
          }
          toast.error("Error posting data.");
        },
  })

  return (
    <div className="relative">
      <h1 className="text-pink-400 text-2xl lg:text-4xl text-center font-semibold">
        NEWS
      </h1>
      <div className="w-sm mx-auto mt-8">
        <button
          onClick={() => setNewsForm(true)}
          className="border border-green-200 hover:scale-x-105 text-green-200 px-4 py-2 rounded cursor-pointer"
        >
          Create News
        </button>
      </div>
      <section className="  mt-4  shadow w-sm rounded mx-auto ">
        {isLoading || isPending && <Loading />}
        {isError || mutateError ||
          (!data && (
            <div className=" grid place-items-center text-center ">
              <div>
                <h2 className="heading3">Error Fetching News</h2>
                <p>Please try again later</p>
                <button
                  className="bg-accent hover:opacity/60 mt-1 px-4 py-1 rounded cursor-pointer"
                  onClick={() => refetch()}
                >
                  Retry now
                </button>
              </div>
            </div>
          ))}
        {!data || data?.data.length === 0 && (
          <div className=" grid place-items-center text-center mt-32">
            <h1>{data.message}</h1>
          </div>
        )}
        {data?.data.length > 0 &&
          data?.data.map((item) => (
            <article
              key={item.id}
              className="px-4 py-8 rounded border"
            >
              <div className="flex gap-4">
                <p className="text-neutral-300">Subject:</p>
                <p>{item.subject}</p>
              </div>
              <div className=" mt-4 rounded">
                <p className="text-neutral-300">Body:</p>
                <p className="bg-black/20 px-4 py-2 ">{item.body}</p>
              </div>
              <button
                onClick={() => mutate(item.id)}
                className="px-4 py-2 rounded mt-4 bg-red-700 cursor-pointer hover:scale-x-105"
              >
                Delete News
              </button>
            </article>
          ))}
      </section>

      <Dialogue isDialogOpen={showNewsForm} closeDialog={setNewsForm}>
        <NewsForm closeDialog={setNewsForm} />
      </Dialogue>
    </div>
  );
}

export default News;

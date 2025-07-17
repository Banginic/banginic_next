"use client";
import React, { useEffect, useState } from "react";
import { Loading } from "@/components/exportComp";
import { FetchError, NoDataAvailable } from "@/admin-component/index";
import { useMyMutate, useMyQuery } from "@/hooks/useQuery";
import axios from "axios";
import { NewsletterSubsTypes } from "@/models/types";

function NewsLettersSubscriptions() {
  const [error, setError] = useState("");
  const [deletedId, setDeletedId] = useState(0);
  function clearForm() {}
  async function deleteSubscriber(): Promise<NewsletterSubsTypes> {
    const { data } = await axios.delete(
      `/api/newsletters-subscribers/delete-single-newsletter?userId=${deletedId}`,
      {
        withCredentials: true,
      }
    );
    return data;
  }
  async function fetchNewslettersSubs(): Promise<NewsletterSubsTypes> {
    const { data } = await axios.get(
      "/api/newsletters-subscribers/list-all-newsletters",
      {
        withCredentials: true,
      }
    );
    return data;
  }
  const { isLoading, isError, data, refetch } = useMyQuery<NewsletterSubsTypes>(
    "newletters-subs",
    fetchNewslettersSubs
  );

  const { isPending, mutate } = useMyMutate(
    "newletters-subs",
    deleteSubscriber,
    setError,
    clearForm
  );
  useEffect(() => {
    if (deletedId !== 0) {
      mutate();
    }
    return () => {}
  }, [deletedId]);
  return (
    <div>
      <h1 className="text-pink-400 text-xl lg:text-2xl text-center font-semibold lg:mt-8">
        NEWSLETTER SUBSCRIBERS
      </h1>

      <section className="  mt-4  shadow w-[95%] lg:w-2xl rounded mx-auto ">
        {isLoading && <Loading />}

        {Array.isArray(data?.data) &&
          data.data.length === 0 &&
          data.message && <NoDataAvailable message={data.message || error} />}
        {isError && (
          <FetchError message="NewsLettersSubscriptions" refetch={refetch} />
        )}
        {data &&
          Array.isArray(data.data) &&
          data.data.length > 0 &&
          !isLoading &&
          data.data.map((item) => (
            <div
              key={item.id}
              className="px-4 py-8 rounded border border-pink-100/20 shadow grid grid-cols-3 gap-4 place-items-center mt-2 bg-black/20 hover:bg-black/30 "
            >
              <div className="">
                <p className="text-neutral-300">Email</p>
                <p>{item.email}</p>
              </div>
              <div className="">
                <p className="text-neutral-300">Subscribed date</p>
                <p className=" ">
                  {new Date(item.createdAt).toLocaleDateString("en-GB")}
                </p>
              </div>
              <div className="">
                <button
                  onClick={() => setDeletedId(item.id)}
                  className="border border-pink-100 hover:bg-pink-400 px-4 py-2 trans rounded cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
}

export default NewsLettersSubscriptions;

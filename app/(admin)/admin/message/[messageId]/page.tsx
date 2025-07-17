"use client";
import React, { useContext, useState } from "react";
import { Back } from "@/components/exportComp";
import { MessagesType } from "@/models/types";
import { useMyMutate, useMyQuery } from "@/hooks/useQuery";
import { Loading } from "@/components/exportComp";
import { FetchError, NoDataAvailable } from "@/admin-component/index";
import { AppContext } from "@/context/AppProvider";
import axios from "axios";

function MessageDetails({
  params,
}: {
  params: Promise<{ messageId: string }>;
}) {
  const { messageId } = React.use(params);
  const [error, setError] = useState("");
  const { router } = useContext(AppContext)!;

  async function getMessage(): Promise<MessagesType> {
    const { data } = await axios.get(
      `/api/messages/list-single-message?messageId=${messageId}`,
      {
        withCredentials: true,
      }
    );
    return data;
  }
  function clearForm() {
    router.push("/admin/message");
  }

  async function deleteMessage(): Promise<MessagesType> {
    const { data } = await axios.delete(
      `/api/messages/delete-single-message?messageId=${messageId}`,
      {
        withCredentials: true,
      }
    );
    return data;
  }
  const { isLoading, isError, data, refetch } = useMyQuery("messages", getMessage);
  const { isPending, mutate } = useMyMutate(
    "messages",
    deleteMessage,
    setError,
    clearForm
  );

  return (
    <div className="relative pb-12">
      <div className="absolute top-8 left-2">
        <Back link="/admin/message" name="Back" />
      </div>
      <h1 className="text-pink-400 text-2xl lg:text-4xl text-center font-semibold">
        MESSAGE DETAILS
      </h1>

      <section className="  mt-12  shadow w-sm rounded mx-auto ">
        {(isLoading || isPending) && <Loading />}

        {
          (Array.isArray(data?.data) && data.data.length === 0 && data.message && (
            <NoDataAvailable message={data?.message || error} />
          ))}

        {isError && <FetchError message="Message" refetch={refetch} />}
     
        {data &&
          Array.isArray(data.data) &&
          data.data.length > 0 &&
          (!isPending || !isLoading) && (
            <article className="px-4 py-8 rounded border border-pink-100/20 shadow flex flex-col gap-2 mt-2 bg-black/20 ">
              <div className="">
                <p className="text-neutral-300">Sender</p>
                <p>{data.data[0].name}</p>
              </div>
              <div className="">
                <p className="text-neutral-300">Email</p>
                <p className=" ">{data.data[0].email}</p>
              </div>
              <div className="">
                <p className="text-neutral-300">Phone</p>
                <p className="">{data.data[0].phone}</p>
              </div>
              <div className="">
                <p className="text-neutral-300">Subject</p>
                <p className="text-green-400">{data.data[0].service}</p>
              </div>
              <div className="">
                <p className="text-neutral-300">Latest date</p>
                <p className="text-red-500 ">
                  {new Date(data.data[0].createdAt).toLocaleDateString("en-GB")}
                </p>
              </div>
              <div className="">
                <p className="text-neutral-300">Message</p>
                <p className="p-2 rounded bg-black/20 mt-1">
                  {data.data[0].message}
                </p>
              </div>
              <button
                onClick={() => mutate()}
                className="border rounded w-40 mt-8 hover:scale-105 trans cursor-pointer text-red-100 border-red-500 px-4 py-2"
              >
                Delete Message
              </button>
            </article>
          )}
      </section>
    </div>
  );
}

export default MessageDetails;

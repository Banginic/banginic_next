"use client";
import React from "react";
import { Loading } from "@/components/exportComp";
import { FetchError, NoDataAvailable } from "@/admin-component/index";
import Link from "next/link";
import { useMyQuery } from "@/hooks/useQuery";
import axios from "axios";
import { MessagesType } from "@/models/types";

function Messages() {
  async function fetchMessages(): Promise<MessagesType> {
    const { data } = await axios.get("/api/messages/list-all-messages", {
      withCredentials: true,
    });
    return data;
  }
  const { isLoading, isError, data, refetch } = useMyQuery<MessagesType>(
    "messages",
    fetchMessages
  );
  return (
    <div>
      <h1 className="text-pink-400 text-2xl lg:text-4xl text-center font-semibold lg:mt-4">
        MESSAGES
      </h1>

      <section className="  mt-4  shadow w-[95%] lg:w-2xl rounded mx-auto ">
        {isLoading && <Loading />}

        {
          (Array.isArray(data?.data) && data.data.length === 0 && data.message && (
            <NoDataAvailable message={data.message} />
          ))}
          {isError && <FetchError message="Messages" refetch={refetch} />}
        {data &&
          Array.isArray(data.data) &&
          data.data.length > 0 &&
          !isLoading &&
          data.data.map((item) => (
            <Link
              href={`/admin/message/${item.id}`}
              key={item.id}
              className="px-4 py-8 rounded border border-pink-100/20 shadow grid grid-cols-3 gap-1 mt-2 hover:bg-black/20 "
            >
              <div className="">
                <p className="text-neutral-300">Sender</p>
                <p>{item.name}</p>
              </div>
              <div className="">
                <p className="text-neutral-300">Service</p>
                <p className=" ">{item.service}</p>
              </div>
              <div className="">
                <p className="text-neutral-300">Send date</p>
                <p className="text-red-500 ">
                  {new Date(item.createdAt).toLocaleDateString("en-GB")}
                </p>
              </div>
            </Link>
          ))}
      </section>
    </div>
  );
}

export default Messages;

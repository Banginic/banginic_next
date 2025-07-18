"use client";
import React, { useContext, useState } from "react";
import { Back } from "@/components/exportComp";
import { JobTypes } from "@/models/types";
import { useMyMutate, useMyQuery } from "@/hooks/useQuery";
import { Loading } from "@/components/exportComp";
import { FetchError, NoDataAvailable } from "@/admin-component/index";
import { AppContext } from "@/context/AppProvider";

function JobDetails({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = React.use(params);
  const [error, setError] = useState("");
  const { router } = useContext(AppContext)!;

  async function getJob(): Promise<JobTypes> {
    const response = await fetch(`/api/jobs/list-jobs?jobId=${jobId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return await response.json();
  }
  function clearForm() {
    router.push("/admin/jobs");
  }

  async function deleteJob(): Promise<JobTypes> {
    const response = await fetch(`/api/jobs/delete-job?jobId=${jobId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return await response.json();
  }
  const { isLoading, isError, data, refetch } = useMyQuery("jobs", getJob);
  const {
    isPending,
    isError: deleteError,
    mutate,
  } = useMyMutate("jobs", deleteJob, setError, clearForm);

  return (
    <div className="relative ">
      <div className="absolute top-8 left-2">
        <Back link="/admin/jobs" name="Back" />
      </div>
      <h1 className="text-pink-400 text-2xl lg:text-4xl text-center font-semibold">
        JOB DETAILS
      </h1>

      <section className="  mt-12  shadow w-sm rounded mx-auto ">
        {isLoading || (isPending && <Loading />)}
        {!data ||
          (Array.isArray(data?.data) && data.data.length === 0 && (
            <NoDataAvailable message={data?.message || error} />
          ))}
          
        {isError ||
          (deleteError && <FetchError message="Job" refetch={refetch} />)}

        {data &&
          Array.isArray(data.data) &&
          data.data.length > 0 &&
          (!isLoading || isPending) && (
            <article className="px-4 py-8 rounded border border-pink-100/20 shadow flex flex-col gap-2 mt-2 bg-black/20 ">
              <div className="">
                <p className="text-neutral-300">Title</p>
                <p>{data.data[0].title}</p>
              </div>
              <div className="">
                <p className="text-neutral-300">Location</p>
                <p className=" ">{data.data[0].location}</p>
              </div>
              <div className="">
                <p className="text-neutral-300">Latest date</p>
                <p className="text-green-500 ">{"data.data[0].createdAt"}</p>
              </div>
              <div className="">
                <p className="text-neutral-300">Latest date</p>
                <p className="text-red-500 ">{"data.data[0].createdAt"}</p>
              </div>
              <div className="">
                <p className="text-neutral-300">Description</p>
                <p className="p-2 rounded bg-black/20 mt-1">
                  {data.data[0].description}
                </p>
              </div>
              <button
                onClick={() => mutate()}
                className="border rounded w-32 mt-8 hover:scale-105 trans cursor-pointer text-red-100 border-red-500 px-4 py-2"
              >
                Delete Job
              </button>
            </article>
          )}
      </section>
    </div>
  );
}

export default JobDetails;

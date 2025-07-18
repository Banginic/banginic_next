"use client";
import { AppContext } from "@/context/AppProvider";
import React, { useContext } from "react";
import { Dialogue, JobForm } from "@/admin-component/index";
import { useMyQuery } from "@/hooks/useQuery";
import { Loading } from "@/components/exportComp";
import Link from "next/link";
import { JobTypes } from "@/models/types";
import { FetchError, NoDataAvailable } from "@/admin-component/index";

function Jobs() {
  const { setJobForm, showJobForm, router } = useContext(AppContext)!;

  async function getJobs(): Promise<JobTypes> {
    const response = await fetch("/api/jobs/list-jobs", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return await response.json();
  }

  const { isLoading, isError, data, refetch } = useMyQuery("jobs", getJobs);

  return (
    <div className="relative">
      <h1 className="text-pink-400 text-2xl lg:text-4xl text-center font-semibold">
        JOBS
      </h1>
      <div className="w-sm mx-auto mt-8">
        <button
          onClick={() => setJobForm(true)}
          className="border border-green-200 hover:scale-x-105 text-green-200 px-4 py-2 rounded cursor-pointer"
        >
          Create Job
        </button>
        <button
          onClick={() => router.push('/admin/job-applications')}
          className="border border-green-200 hover:scale-x-105 ml-4 bg-green-300 text-green-800  px-4 py-2 rounded cursor-pointer"
        >
          Job Applications
        </button>
      </div>
      <section className="  mt-8  shadow w-[90%] lg:w-xl rounded mx-auto ">
        {isLoading && <Loading />}

        {isError && <FetchError message="Jobs" refetch={refetch} />}
        {!data ||
          (Array.isArray(data?.data) && data.data.length === 0 && (
            <NoDataAvailable message={'No Job Available'} />
          ))}
        {data &&
          Array.isArray(data.data) &&
          data.data.length > 0 &&
          !isLoading &&
          data.data.map((item) => (
            <Link
              href={`/admin/jobs/${item.id}`}
              key={item.id}
              className="px-4 py-4 shrounded border border-pink-100/20 bg-black/20 hover:bg-black/10 backdrop:blur-md shadow grid grid-cols-3 gap-1 mt-2 "
            >
              <div className="">
                <p className="text-neutral-300">Title</p>
                <p>{item.title}</p>
              </div>
              <div className="">
                <p className="text-neutral-300">Location</p>
                <p className=" ">{item.location}</p>
              </div>
              <div className="">
                <p className="text-neutral-300">Latest Date</p>
                <p className="text-red-500 ">{"item.latestDate"}</p>
              </div>
            </Link>
          ))}
      </section>

      <Dialogue isDialogOpen={showJobForm} closeDialog={setJobForm}>
        <JobForm closeDialog={setJobForm} />
      </Dialogue>
    </div>
  );
}

export default Jobs;

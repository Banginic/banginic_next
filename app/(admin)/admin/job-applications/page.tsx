"use client";
import React, { useContext } from "react";
import { Loading } from "@/components/exportComp";
import { FetchError, NoDataAvailable } from "@/admin-component/index";
import Link from "next/link";
import { useMyQuery } from "@/hooks/useQuery";
import axios from "axios";
import { JobApplicationType } from "@/models/types";
import { AppContext } from "@/context/AppProvider";


function JobApplications() {
 const { router } = useContext(AppContext)!
  async function fetchMessages(): Promise<JobApplicationType> {
    const { data } = await axios.get(
      "/api/job-applications/list-all-job-applications",
      {
        withCredentials: true,
      }
    );
    return data;
  }
  const { isLoading, isError, data, refetch } = useMyQuery<JobApplicationType>(
    "job-applications",
    fetchMessages
  );
  return (
    <div>
      <h1 className="text-pink-400 text-2xl lg:text-4xl text-center font-semibold">
        JOB APPLICATIONS
      </h1>
      <div className="w-sm mx-auto mt-8">
        <button
          onClick={() => router.push('/admin/jobs')}
          className="border border-green-200 hover:scale-x-105 text-green-200 px-4 py-2 rounded cursor-pointer"
        >
          Available Jobs
        </button>
       
      </div>
      <section className="  mt-8  shadow w-[95%] lg:w-2xl rounded mx-auto ">
        {isLoading && <Loading />}

        {Array.isArray(data?.data) &&
          data.data.length === 0 &&
          data.message && <NoDataAvailable message={data.message} />}
        {isError && <FetchError message="Job applications" refetch={refetch} />}
        {data &&
          Array.isArray(data.data) &&
          data.data.length > 0 &&
          !isLoading &&
          data.data.map((item) => (
            <Link
              href={`/admin/job-applications/${item.id}`}
              key={item.id}
              className="px-4 py-4 rounded border border-pink-100/20 bg-white/10 hover:bg-white-20 trans shadow grid grid-cols-3 gap-1 mt-2 hover:bg-black/20 "
            >
              <div className="">
                <p className="text-neutral-300">Full Name</p>
                <p>{item.name}</p>
              </div>
              <div className="">
                <p className="text-neutral-300">Job Title</p>
                <p className=" ">{item.job}</p>
              </div>
              <div className="">
                <p className="text-neutral-300">Applied Date</p>
                <p className="text-green-500 ">
                  {new Date(item.createdAt).toLocaleDateString("en-GB")}
                </p>
              </div>
            </Link>
          ))}
      </section>
    </div>
  );
}

export default JobApplications;

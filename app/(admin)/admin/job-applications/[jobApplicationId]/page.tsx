"use client";
import React, { useContext, useState } from "react";
import { Back } from "@/components/exportComp";
import { JobApplicationType } from "@/models/types";
import { useMyMutate, useMyQuery } from "@/hooks/useQuery";
import { Loading } from "@/components/exportComp";
import { FetchError, NoDataAvailable } from "@/admin-component/index";
import { AppContext } from "@/context/AppProvider";
import axios from "axios";

function JobApplicationDetails({
  params,
}: {
  params: Promise<{ jobApplicationId: string }>;
}) {
  const { jobApplicationId } = React.use(params);
  const [error, setError] = useState("");
  const { router } = useContext(AppContext)!;

  async function getJobApplication(): Promise<JobApplicationType> {
    const { data } = await axios.get(
      `/api/job-applications/list-single-job-application?jobApplicationId=${jobApplicationId}`,
      {
        withCredentials: true,
      }
    );
    return data;
  }
  function clearForm() {
    router.push("/admin/job-applications");
  }

  async function deleteJobApplication(): Promise<JobApplicationType> {
    const { data } = await axios.delete(
      `/api/job-applications/delete-single-job-application?jobApplicationId=${jobApplicationId}`,
      {
        withCredentials: true,
      }
    );
    return data;
  }
  const { isLoading, isError, data, refetch } = useMyQuery("job-applications", getJobApplication);
  const { isPending, mutate } = useMyMutate(
    "job-applications",
    deleteJobApplication,
    setError,
    clearForm
  );

  return (
    <div className="relative pb-12 mx-auto max-w-7xl">
      <div className="absolute top-8 left-2">
        <Back link="/admin/message" name="Back" />
      </div>
      <h1 className="text-pink-400 text-2xl lg:text-4xl text-center font-semibold">
        JOB APPLICATION
      </h1>

      <section className="  mt-12  shadow w-sm rounded mx-auto ">
        {(isLoading || isPending) && <Loading />}

        {
          (Array.isArray(data?.data) && data.data.length === 0 && data.message && (
            <NoDataAvailable message={data?.message || error} />
          ))}

        {isError && <FetchError message="Job application" refetch={refetch} />}
     
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
                <p className="text-neutral-300">Job Title</p>
                <p className="text-green-400">{data.data[0].job}</p>
              </div>
              <div className="">
                <p className="text-neutral-300">Applied Date</p>
                <p className="text-red-500 ">
                  {new Date(data.data[0].createdAt).toLocaleDateString("en-GB")}
                </p>
              </div>
              <div className="">
                <p className="text-neutral-300">Resume</p>
                <p className="text-blue-500 ">
                 Resume <span className="intalics underline text-white">Download</span>
                </p>
              </div>
              <div className="">
                <p className="text-neutral-300">Motivation Message</p>
                <p className="p-2 rounded bg-black/20 mt-1">
                  {data.data[0].motivation}
                </p>
              </div>
              <button
                onClick={() => mutate()}
                className="border rounded w-40 mt-8 hover:scale-105 trans cursor-pointer text-red-100 border-red-500 px-4 py-2"
              >
                Delete Application
              </button>
            </article>
          )}
      </section>
    </div>
  );
}

export default JobApplicationDetails;

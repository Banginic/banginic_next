"use client";
import { use, useContext } from "react";
import {
  JobForm,
  Dialogue,
  FetchError,
  NoDataAvailable,
} from "@/admin-component/index";
import { useQuery } from "@tanstack/react-query";
import { Loading, Back, ApplyJob } from "@/components/exportComp";
import { JobTypes } from "@/models/types";
import axios from "axios";
import { AppContext } from "@/context/AppProvider";

function JobDetails({ params }: { params: Promise<{ careerId: string }> }) {
  const { careerId } = use(params);
  const jobId = careerId;
  const { showMainJobForm, setMainJobForm } = useContext(AppContext)!;

  async function fetchJob() {
    const { data } = await axios.get(
      `/api/jobs/list-single-job?jobId=${jobId}`
    );
    return data;
  }
  const { isLoading, isError, data, refetch } = useQuery<JobTypes>({
    queryKey: [`client-jobs`],
    queryFn: fetchJob,
  });

  return (
    <div className="min-h-screen relative mx-auto max-w-5xl">
      <div className="absolute top-8 left-2">
        <Back link="/admin/jobs" name="Back" />
      </div>
      <h1 className="text-pink-400 text-2xl lg:text-4xl text-center font-semibold">
        JOB DETAILS
      </h1>

      <section className="  mt-12  shadow w-sm rounded mx-auto ">
        {isLoading && <Loading />}

        {isError && <FetchError message="Job" refetch={refetch} />}
        {!data ||
          (Array.isArray(data?.data) && data.data.length === 0 && (
            <NoDataAvailable
              message={data?.message || "No Job Available with this ID"}
            />
          ))}
        {data &&
          Array.isArray(data.data) &&
          data.data.length > 0 &&
          !isLoading &&
          data.data.length === 1 && (
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
                onClick={() => setMainJobForm(true)}
                className="border rounded w-32 mt-8 hover:scale-105 trans cursor-pointer text-red-100 border-red-100 px-4 py-2"
              >
                Apply
              </button>
              <Dialogue
                closeDialog={setMainJobForm}
                isDialogOpen={showMainJobForm}
              >
                <ApplyJob
                  jobId={data?.data[0].id}
                  closeDialog={setMainJobForm}
                />
              </Dialogue>
            </article>
          )}
      </section>
    </div>
  );
}

export default JobDetails;

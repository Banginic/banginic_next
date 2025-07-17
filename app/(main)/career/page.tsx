"use client";
import { Loading } from "@/components/exportComp";
import Link from "next/link";
import { useMyQuery } from "@/hooks/useQuery";
import { JobTypes } from "@/models/types";
import axios from "axios";
import { FetchError, NoDataAvailable } from "@/admin-component/index";

function Careers() {
  async function fetchJobs() {
    const { data } = await axios.get("/api/jobs/list-jobs");
    return data;
  }
  const { isLoading, isError, data, refetch } = useMyQuery<JobTypes>(
    "client-jobs",
    fetchJobs
  );

  return (
    <div className="min-h-screen mx-auto max-w-7xl">
      <h1 className="text-4xl md:text-5xl mt-8 font-bold bg-gradient-to-r from-accent via-pink-400 to-blue-400 bg-clip-text text-transparent montserrat text-center">
        JOBS
      </h1>
      <section className="mt-8">
        {isLoading && <Loading />}
        {isError && <FetchError refetch={refetch} message="Jobs" />}
        {!data ||
          (Array.isArray(data?.data) && data.data.length === 0 && (
            <NoDataAvailable message={"No Job Available"} />
          ))}
        {data && data.data?.length !== 0 && (
          <div className="   bg-black/20 shadow-lg lg:w-2xl mt-8 mx-auto rounded-sm p-4 w-[90%]">
            {data &&
              data?.data?.map((job) => (
                <Link key={job.id} href={`/career/${job.id}`}>
                  <article
                    title={`View Job ID ${job.id}`}
                    className="flex justify-around md:grid-cols-4 mx-auto  text-sm  bg-white/20 hover:bg-white/10 backdrop:blur-sm border border-gray-400/10  my-2 px-4 py-2 rounded-sm trans cursor-pointer"
                  >
                    <div className="mb-2 sr-only">
                      <h3 className="text-gray-500">Job ID</h3>
                      <p>{job.id}</p>
                    </div>
                    <div className="mb-2 flex-1">
                      <h3 className="text-pink-100/70">Job Title</h3>
                      <p>{job.title}</p>
                    </div>
                    <div className="mb-2 flex-1">
                      <h3 className="text-pink-100/70">Location</h3>
                      <p>{job.location}</p>
                    </div>
                    <div className="mb-2">
                      <h3 className="text-pink-100/70">Posted Date</h3>
                      <p className="text-green-300">
                        {new Date(job.createdAt).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Careers;

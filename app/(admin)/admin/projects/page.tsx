"use client";
import React from "react";
import { Loading } from "@/components/exportComp";
import { FetchError, NoDataAvailable } from "@/admin-component/index";
import Link from "next/link";
import { useMyQuery } from "@/hooks/useQuery";
import axios from "axios";
import { ProjectType } from "@/models/types";
import { useRouter } from "next/navigation";

function Projects() {
  const router = useRouter()
  async function fetchProjects(): Promise<ProjectType> {
    const { data } = await axios.get("/api/projects/list-all-projects", {
      withCredentials: true,
    });
    return data;
  }
  const { isLoading, isError, data, refetch } = useMyQuery<ProjectType>(
    "projects",
    fetchProjects
  );
  return (
    <div className="mx-auto max-w-5xl" >
      <h1 className="text-pink-400 text-2xl lg:text-4xl text-center font-semibold lg:mt-4">
        PROJECTS
      </h1>
       
       <button
       onClick={() => router.push('/admin/projects/create-project')}
       className=" px-4 py-2 rounded text-green-400 border hover:bg-green-900/30 ml-4 mt-4 cursor-pointer trans">Create Project</button>
      <section className="  mt-4  shadow w-[95%] lg:w-2xl rounded mx-auto ">
        {isLoading && <Loading />}

        {
          (Array.isArray(data?.data) && data.data.length === 0 && data.message && (
            <NoDataAvailable message={data.message} />
          ))}
          {isError && <FetchError message="Projects" refetch={refetch} />}
        {data &&
          Array.isArray(data.data) &&
          data.data.length > 0 &&
          !isLoading &&
          data.data.map((item) => (
            <Link
              href={`/admin/projects/${item.id}`}
              key={item.id}
              className="px-4 py-4 rounded border border-pink-100/20 shadow grid grid-cols-3 gap-1 mt-2 hover:bg-black/10 bg-black/20 "
            >
              <div className="">
                <p className="text-neutral-300">Project Name</p>
                <p>{item.projectName}</p>
              </div>
              <div className="">
                <p className="text-neutral-300">Category</p>
                <p className=" ">{item.category}</p>
              </div>
              <div className="">
                <p className="text-neutral-300">Created date</p>
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

export default Projects;

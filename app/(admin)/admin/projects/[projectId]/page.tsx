"use client";
import React, { useContext, useState } from "react";
import { Back } from "@/components/exportComp";
import { ProjectType } from "@/models/types";
import { useMyMutate, useMyQuery } from "@/hooks/useQuery";
import { Loading } from "@/components/exportComp";
import { FetchError, NoDataAvailable } from "@/admin-component/index";
import { AppContext } from "@/context/AppProvider";
import axios from "axios";
import Image from "next/image";

function MessageDetails({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = React.use(params);
  const [error, setError] = useState("");
  const { router } = useContext(AppContext)!;

  async function getProject(): Promise<ProjectType> {
    const { data } = await axios.get(
      `/api/projects/list-single-project?projectId=${projectId}`,
      {
        withCredentials: true,
      }
    );
    return data;
  }
  function clearForm() {
    router.push("/admin/projects");
  }

  async function deleteProject(): Promise<ProjectType> {
    const { data } = await axios.delete(
      `/api/projects/delete-single-project?projectId=${projectId}`,
      {
        withCredentials: true,
      }
    );
    return data;
  }
  const { isLoading, isError, data, refetch } = useMyQuery(
    "projects",
    getProject
  );
  const { isPending, mutate } = useMyMutate(
    "projects",
    deleteProject,
    setError,
    clearForm
  );

  return (
    <div className="relative pb-12 mx-auto max-w-7xl">
      <div className="absolute top-8 left-2">
        <Back link="/admin/projects" name="Back" />
      </div>
      <h1 className="text-pink-400 text-2xl lg:text-4xl text-center font-semibold">
        MESSAGE DETAILS
      </h1>

      <section className="  mt-12  shadow w-sm rounded mx-auto ">
        {(isLoading || isPending) && <Loading />}

        {Array.isArray(data?.data) &&
          data.data.length === 0 &&
          data.message && <NoDataAvailable message={data?.message || error} />}

        {isError ||
          (!data && <FetchError message="Projects" refetch={refetch} />)}

        {data &&
          Array.isArray(data.data) &&
          data.data.length > 0 &&
          (!isPending || !isLoading) && (
            <article className="px-4 py-4 rounded border border-pink-100/20 shadow flex flex-col gap-2 mt-2 bg-black/20 ">
              <div className="">
                <Image
                  src={data.data[0].photos[0]}
                  alt="./placeholder.png"
                  width={100}
                  height={100}
                />
              </div>
              <div className="">
                <p className="text-neutral-300">Project name</p>
                <p>{data.data[0].projectName}</p>
              </div>
              <div className="">
                <p className="text-neutral-300">Category</p>
                <p className=" ">{data.data[0].category}</p>
              </div>
              <div className="">
                <p className="text-neutral-300">Designer</p>
                <p className="">{data.data[0].designer}</p>
              </div>
              <div className="">
                <p className="text-neutral-300">URL</p>
                <a
                  href={data.data[0].url}
                  target="blank"
                  className="text-green-400 hover:underline"
                >
                  {data.data[0].url}
                </a>
              </div>
              <div className="">
                <p className="text-neutral-300">Developed date</p>
                <p className="text-red-500 ">
                  {new Date(data.data[0].createdAt).toLocaleDateString("en-GB")}
                </p>
              </div>
              <div className="">
                <p className="text-neutral-300">Description</p>
                <p className="p-2 rounded bg-black/20 mt-1">
                  {data.data[0].description}
                </p>
              </div>
              <button
                onClick={() => mutate()}
                className="border rounded w-40 mt-8 hover:scale-105 trans cursor-pointer text-red-100 border-red-500 px-4 py-2"
              >
                Delete Project
              </button>
            </article>
          )}
      </section>
    </div>
  );
}

export default MessageDetails;

"use client";
import React, { useState } from "react";
import { Back, Loading } from "@/components/exportComp";
import { placeholdeImage } from "@/assets/photos";
import { ProjectType } from "@/models/types";
import axios from "axios";
import { useMyQuery } from "@/hooks/useQuery";
import { FetchError, NoDataAvailable } from "@/admin-component/index";
import Image from "next/image";

function WorkDetails({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = React.use(params);

  async function fetchProject() {
    const { data } = await axios.get(
      `/api/projects/list-single-project?projectId=${projectId}`,
      { withCredentials: true }
    );
    return data;
  }
  const { isLoading, isError, refetch, data } = useMyQuery<ProjectType>(
    `project-${projectId}`,
    fetchProject
  );

  // const [project, setProject] = useState<SingleProject | null >( null);
  const [activeIndex, setActiveIndex] = useState(0);

  const length = 3;

  function prevImage() {
    setActiveIndex(activeIndex < 1 ? length : activeIndex - 1);
  }
  function nextImage() {
    setActiveIndex(activeIndex === length ? 0 : activeIndex + 1);
  }
  function toggelIndex(index: number) {
    setActiveIndex(index);
  }

  if (isLoading) return <Loading />;

  if (isError || !data?.success || !data)
    return (
      <div className="h-screen grid place-items-center text-center">
        <FetchError message="Project" refetch={refetch} />
      </div>
    );
  if (data?.success && data.data.length === 0)
    return (
      <div className="h-screen grid place-items-center text-center">
        <NoDataAvailable message={data?.message || "No Project with this ID"} />
      </div>
    );
  return (
    <div className="min-h-screen py-8">
      <h1 className="text-xl md:text-4xl font-bold text-center  bg-gradient-to-r from-accent via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
        PROJECT DETAILS
        <Back link="/projects" name="Back" />
      </h1>
      <section className=" mx-auto backdrop-blur-40 bg-transparent scroll-smooth max-w-7xl  pt-6 overflow-auto ">
        <div className="display m-auto relative top-0 lg:flex gap-10 md:px-5 justify-around">
          <div className="relative  h-1/2 lg:min-w-[600px] lg:h-[500px] mx-auto overflow-hidden">
            <div className="min-h-[400px] w-full">
              <Image
                className=" group min-h-[320px]  md:min-h-[400px] lg:max-w-[700px] translate-y-5 cursor-pointer shadow-accent/20 shadow-lg  m-auto bg-black rounded-sm object-contai"
                alt={"./placeholder.png"}
                width={400}
                height={170}
                src={
                  !data?.data[0].photos
                    ? placeholdeImage
                    : data?.data[0].photos[activeIndex]
                }
              />
            </div>
            <span
              onClick={() => prevImage()}
              className="absolute cursor-pointer top-1/2 left-1 w-14 bg-slate-200 lg:opacity-40 shadow-sm  hover:opacity-100 trans grid trans h-10 rounded-sm  place-items-center text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000"
              >
                <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
              </svg>
            </span>
            <span
              onClick={() => nextImage()}
              className="absolute cursor-pointer top-1/2 right-1 w-14 bg-slate-200 lg:opacity-40 shadow-sm hover:opacity-100 trans h-10 rounded-sm grid place-items-center text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                className="rotate-180"
                fill="#000"
              >
                <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
              </svg>
            </span>

            <div className="flex absolute right-1/2 translate-x-1/2 bottom-3 gap-1 items-center justify-center">
              {data?.data[0].photos.map((_, index) => (
                <div
                  key={index}
                  onClick={() => toggelIndex(index)}
                  className={`h-3 ${
                    activeIndex === index ? "w-6" : "w-3"
                  } active_image cursor-pointer rounded-full bg-gray-200 mt-3 `}
                ></div>
              ))}
            </div>
          </div>
          <article className="mt-5 rounded w-[90%] md:w-1/2 border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900/40 mx-auto p-5 lg:p-10">
            <h2 className="heading4">
              {data?.data[0].projectName.toLocaleUpperCase()}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {data?.data[0].description}
            </p>
            <a
              href={data?.data[0].url}
              target="blank"
              title="View this project on the web"
              className=" py-1.5 bg-accent hover:opacity-70  trans rounded-lg cursor-pointer my-8 text-white text-sm px-4 border border-accent"
            >
              Visit project
            </a>
            <div className="grid grid-cols-2 gap-3 p-4 rounded-sm bg-gray-100/50 dark:bg-gray-900/50 mt-4">
              <div className="text-sm ">
                <h3 className="">{"Category"}</h3>
                <p className="text-gray-600 dark:text-gray-400 mano">
                  {data?.data[0].category}
                </p>
              </div>
              <div className="text-sm">
                <h3 className="">{"Client"}</h3>
                <p className="text-gray-600 dark:text-gray-400 mano">
                  {data?.data[0].projectName}
                </p>
              </div>
              <div className="">
                <h3 className="">{"Date"}</h3>
                <p className="text-gray-600 dark:text-gray-400 mano">
                  {new Date(data?.data[0].createdAt).toLocaleDateString(
                    "en-GB"
                  )}
                </p>
              </div>
              <div className="">
                <h3 className="">{"Designer"}</h3>
                <p className="text-gray-600 dark:text-gray-400 mano">
                  {data?.data[0].designer}
                </p>
              </div>
            </div>
            <hr className="my-10 w-4/5 mx-auto border border-accent" />
            <div className="mt-5">
              <h3 className="">
                <p className="size-2 mr-1 inline-flex rounded-full bg-accent"></p>
                Project description
              </h3>
              <p className="text-gray-600 dark:text-gray-400 px-3">
                {data?.data[0].description}
              </p>
              <h4 className="mt-6">
                <p className="size-2 mr-1 inline-flex rounded-full bg-accent"></p>
                The story
              </h4>
              <p className="text-gray-600 dark:text-gray-400 px-3">
                {data?.data[0].story}
              </p>
              <h4 className="mt-6">
                <p className="size-2 mr-1 inline-flex rounded-full bg-accent"></p>
                Our approach
              </h4>
              <p className="text-gray-600 dark:text-gray-400 px-3">
                {data?.data[0].approach}
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

export default WorkDetails;

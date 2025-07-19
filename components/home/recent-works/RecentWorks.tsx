'use client'
import styles from "./recent_works.module.css";
import Link from "next/link";
import { FetchError, NoDataAvailable } from "@/admin-component/index";
import { Loading } from "@/components/exportComp";
import { useContext } from "react";
import { AppContext } from "../../../context/AppProvider";
import { placeholdeImage } from "@/assets/photos";
import type { ProjectType } from "@/models/types";
import { useMyQuery } from "@/hooks/useQuery";
import Image from "next/image";
import axios from "axios";

function RecentWorks() {
  const appContext = useContext(AppContext);
 async function fetchProjects(){
  const { data } = await axios.get('/api/projects/list-all-projects', { withCredentials: true})
  return data
 }

  const { isLoading, data, isError, refetch } = useMyQuery<ProjectType>('projects', fetchProjects);

  if (isLoading) return <Loading />;

  if (isError || !data?.success)
    return (
      <div className="h-[30vh] lg:h-screen grid place-items-center text-center">
        <FetchError message="Projects" refetch={refetch} />
      </div>
    );
  return (
    <section className={` ${styles.rounded} mt-24 lg:my-[var(--xl-margin)]`}>
      <div className="flex flex-col justify-center text-center">
        <div
        >
          <h3 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-accent via-pink-400 to-blue-400 bg-clip-text text-transparent montserrat text-center">RECENT PROJECTS</h3>
          <p className="text-[18px] px-2">
            These recent projects reflect our commitment to clean code,
            thoughtful design, and real results
          </p>
        </div>
      </div>

      {/* PROJECTS */}
      <div className="grid grid-cols-1 mt-12 md:grid-cols-2 xl:grid-cols-3 md:gap-4 lg:gap-12 justify-self-center-safe 2xl:gap-24">
        {data?.data.slice(0, 3).map((project) => (
          <article
            key={project.id}
            className="rounded-lg relative shadow-accent/50 w-[95%] max-h-[500px] lg:min-h-[460px] trans mx-auto lg:mx-8 md:w-[350px] lg:w-[360px] 2xl:w-[400px] group  hover:shadow-lg overflow-hidden my-8"
          >
            <Image
              className="min-w-full  h-60 xl:h-52 2xl:h-60 outline-none bg-gray-20 group-hover:scale-105 trans"
              alt={'./placeholder.png'}
              src={
                project?.photos.length > 0
                  ? project?.photos[0]
                  : placeholdeImage
              }
              width={200}
              height={170}
            />
            <div className="p-4 bg-black/20 backdrop:blur-sm h-full">
              <h2 className="font-bold text-xl mt-4 mb-2 text-white">
                {project.projectName}
              </h2>
              <p className="text-gray-300 overflow-hidden truncat h-20">
                {project.description}
              </p>
              <button
                onClick={() =>
                  appContext?.router.push(`/projects/${project.id}`)
                }
                title="View Project"
                className="my-4 text-bold text-black bg-white md:w-30 text-nowrap md:hover:w-35 shadow-md  px-5 text-sm rounded-lg py-2 flex items-center gap-2 cursor-pointer trans "
              >
                <p>View Project</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  className="rotate-180 size-4 fill-accent"
                >
                  <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
                </svg>{" "}
              </button>
            </div>
          </article>
        ))}
      </div>
      <div className="mx-auto my-12 flex " title="View more projects">
        <Link
          href="/projects"
          className="flex justify-center items-center  mx-auto"
        >
          <button
            className="gap-2 items-center px-6 rounded-lg lg:w-43 hover:w-52  text-nowrap overflow-hidden trans py-3 border-gray-500 font-bold cursor-pointer hover:text-white hover:bg-black mx-auto flex border shadow-md  "
       
          >
            <p className="size-full flex items-center gap-2">
              View More Projects
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className="fill-accent"
            >
              <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
            </svg>
          </button>
        </Link>
      </div>
    </section>
  );
}

export default RecentWorks;

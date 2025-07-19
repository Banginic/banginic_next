'use client'
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { placeholdeImage } from "@/assets/photos";
import { skillsLinks} from '@/assets/data'
import clsx from "clsx";
import { Loading } from '@/components/exportComp'
import type { ProjectType, ProjectObjectType} from "@/models/types";
import { AppContext } from "@/context/AppProvider";
import axios from "axios";
import { useMyQuery } from "@/hooks/useQuery";
import { FetchError } from "@/admin-component";
import Image from "next/image";


function Projects() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [projects, setProjects] = useState<ProjectObjectType[] | null>(null);
  const appContext = useContext(AppContext);

  async function fetchProjects(){
    const { data } = await axios.get('/api/projects/list-all-projects', { withCredentials: true})
    return data
  }

const { data , isLoading, isError,  refetch } = useMyQuery<ProjectType >('projects', fetchProjects)

  // Set seletcted category
  useEffect(() => {
    function changeSelection() {
      if (Array.isArray(data?.data) && selectedFilter !== "All") {
        const filter = data.data.filter(
          (project) => project.category === selectedFilter
        );
        setProjects(filter );
        return;
      }
      if (Array.isArray(data?.data)) {
        setProjects(data.data );
        return;
      }
    }
    if (Array.isArray(data?.data)) {
      changeSelection();
    }
    return () => {};
  }, [selectedFilter, data?.data]);

  if (isLoading) return <Loading />;

  if (isError)
    return (
      <div className="h-screen grid place-items-center text-center">
        <FetchError message="Projects" refetch={refetch} />
      </div>
    );
  if (!data?.data || data?.data.length < 1)
    return (
      <div className="h-screen grid place-items-center text-center">
        <div>
          <h2 className="heading3">No Projects</h2>
          <p>Please try again later</p>
        </div>
      </div>
    );

  const result = projects || data?.data;

  return (
    <div
      className={`min-h-screen trans py-8`}
    >
      <div className=" text-center lg:w-[80%] mx-auto  ">
        <h1 className=" text-xl md:text-2xl font-bold bg-gradient-to-r mb-2 from-accent via-pink-400 to-blue-400 bg-clip-text text-transparent montserrat text-center">
          OUR PROJECTS
        </h1>
        <p className="max-w-xl text-center mx-auto text-[16px] px-2">
          Each project we take on is driven by a deep understanding of our
          clients’ goals, ensuring that we create solutions that have a lasting
          impact.
        </p>
      </div>

      <section
        className="overflow-x-scroll hide-scrollbar
      snap-x snap-mandatory
       md:overflow-hidden  my-8 mx-auto w-[95%] lg:w-[60%]  md:mx-auto bg-white/20 backdrop:blur-sm rounded-lg lg:max-w-xl "
      >
        <ul
          className="justify-around md:justify-between py-2 gap-4 flex items-center  mx-auto
       m-auto p-3 "
        >
          {skillsLinks.map((link, index:number) => {
            const name = link.label;
            const pathName = link.path;
            return (
              <button
              className={`${selectedFilter === name ? 'bg-pink-400' : 'hover:bg-pink-300/50'} px-4 py-2 rounded cursor-pointer `}
                onClick={() => setSelectedFilter(name)}
                key={index}
              >
                {name}
              </button>
            );
          })}
        </ul>
      </section>

      {/* PROJECTS */}
      <div className="grid grid-cols-1 mt-12 md:grid-cols-2 xl:grid-cols-3 md:gap-4 lg:gap-12 justify-self-center-safe 2xl:gap-24">
        {result.map((project) => (
          <article
            key={project.id}
            className={`rounded-lg shadow-accent/50 w-[95%] mx-auto trans ${result.length < 1 ? 'hidden' : ''} md:w-[350px] lg:w-[360px] 2xl:w-[400px] group md:h-[450px]  hover:shadow-lg overflow-hidden my-8`}
          >
            <Image
              className="min-w-full  h-60 xl:h-52 2xl:h-60 outline-none bg-gray-20 group-hover:scale-105 trans"
              alt={'./placeholder.png'}
              width={400}
              height={200}
              src={
                project.photos.length > 0 ? project.photos[0] : placeholdeImage
              }
            />
            <div className="p-4 bg-black/20 backdrop:blur-lg h-full ">
              <h2 className="font-bold text-xl mt-4 mb-2 text-">
                {project.projectName}
              </h2>
              <p className="text-gray-200">{project.description}</p>
              <button
                onClick={() =>
                  appContext?.router.push(`/projects/${project.id}`)
                }
                title="View Project"
                className="my-4 text-bold bg-white text-black md:w-30 text-nowrap md:hover:w-35 shadow-md  px-5 text-sm rounded-lg py-2 flex items-center gap-2 cursor-pointer trans hover:bg-black hover:text-white"
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

    </div>
  );
}

export default Projects;

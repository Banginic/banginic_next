import { motion } from "framer-motion";
import styles from "./recent_works.module.css";
import { Link } from "react-router-dom";
import myFetch from "../../../libs/myFetch";
import { RecentProjectSkeleton } from "../../../conponents/exportComp";
import { useContext } from "react";
import { AppContext } from "../../../context/AppProvider";
import { placeholdeImage } from "../../../assets/assets";
import { useQuery } from "@tanstack/react-query";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import type { ProjectTypes } from "../../../models/types";

function RecentWorks() {
  const appContext = useContext(AppContext);
  function fetchFunction() {
    const fetchDetails = {
      method: "get",
      endpoint: "/api/v2/projects/list",
      body: "",
      id: "",
    };
    return myFetch<ProjectTypes>(fetchDetails);
  }

  const { isLoading, data, isError, refetch } = useQuery<ProjectTypes>({
    queryKey: ["3_projects"],
    queryFn: fetchFunction,
  });

  if (isLoading) return <RecentProjectSkeleton />;

  if (isError || !data?.success)
    return (
      <div className="h-[30vh] lg:h-screen grid place-items-center text-center">
        <div>
          <h2 className="heading3">Error fetching Projects</h2>
          <p>Please try again later</p>
          <button
            className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 mt-1 px-4 py-1 rounded cursor-pointer"
            onClick={() => refetch()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  return (
    <section className={` ${styles.rounded} mt-24 lg:my-[var(--xl-margin)]`}>
      <div className="flex flex-col justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-accent via-pink-400 to-blue-400 bg-clip-text text-transparent montserrat text-center">RECENT PROJECTS</h3>
          <p className="text-[18px] px-2">
            These recent projects reflect our commitment to clean code,
            thoughtful design, and real results
          </p>
        </motion.div>
      </div>

      {/* PROJECTS */}
      <div className="grid grid-cols-1 mt-12 md:grid-cols-2 xl:grid-cols-3 md:gap-4 lg:gap-12 justify-self-center-safe 2xl:gap-24">
        {data?.projects.slice(0, 3).map((project) => (
          <article
            key={project._id}
            className="rounded-lg relative shadow-accent/50 w-[95%] max-h-[500px] lg:min-h-[460px] trans mx-auto lg:mx-8 md:w-[350px] lg:w-[360px] 2xl:w-[400px] group  hover:shadow-lg overflow-hidden my-8"
          >
            <LazyLoadImage
              className="min-w-full  h-60 xl:h-52 2xl:h-60 outline-none bg-gray-20 group-hover:scale-105 trans"
              alt={placeholdeImage}
              effect="blur"
              aria-label="Project image"
              wrapperProps={{
                style: { transition: "1s" },
              }}
              src={
                project?.photos.length > 0
                  ? project?.photos[0]
                  : placeholdeImage
              }
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
                  appContext?.navigate(`/workDetails/${project._id}`)
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
          to="/works/all"
          className="flex justify-center items-center  mx-auto"
        >
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="gap-2 items-center px-6 rounded-lg lg:w-43 hover:w-52  text-nowrap overflow-hidden trans py-3 border-gray-500 font-bold cursor-pointer hover:text-white hover:bg-black mx-auto flex border shadow-md  "
            color=""
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
          </motion.button>
        </Link>
      </div>
    </section>
  );
}

export default RecentWorks;

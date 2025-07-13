

function ProjectCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:gap-4 lg:gap-12 justify-self-center-safe 2xl:gap-24">
      <article className="rounded-lg w-[450px] md:w-sm lg:w-[360px] 2xl:w-[400px] group  hover:shadow-lg overflow-hidden my-8">
        <img
          src={'image2'}
          className="w-full h-60 xl:h-52 2xl:h-60 border-none outline-none bg-gray-20 group-hover:scale-105 trans"
          alt=""
        />
        <div className="p-4 bg-white dark:bg-gray-900/50">
          <h2 className="font-bold text-xl mt-4 mb-2">Task Management App</h2>
          <p className="text-gray-500">
            A productive app for managing tasks, projects and team collaboration
            with real-time update
          </p>
          <button
          title="View Project"
           className="my-4 text-bold border px-5 text-sm rounded-full py-1.5 flex items-center gap-2 cursor-pointer trans hover:bg-black hover:text-white">
            <p>View Project</p>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" className="rotate-180 size-4 fill-accent" ><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>          </button>
        </div>
      </article>
     
    </div>
  );
}

export default ProjectCard;

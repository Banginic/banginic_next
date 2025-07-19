import { useContext } from "react";
import { services } from "@/assets/data";


function Services() {

  return (
    <section className={``}>
      <div
       
        className="text-center min-h-screen pb-12 max-w-7xl mx-auto"
      >
        <h1 className="text-2xl md:text-2xl font-bold bg-gradient-to-r from-accent via-pink-400 to-blue-400 bg-clip-text text-transparent montserrat">
          SERVICES
        </h1>
        <p className="text-lg text-pink-50/60 mt-1">
          Services Built to Elevate Your Brand.
        </p>
        <p className=" px-4 text-lg text-pink-50/60 ">
          From Strategy to Execution. Everything You Need to Succeed Online.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 place-items-center gap-5 mx-auto mt-10 ">
          {services.map((skill, index) => {
            return (
              <article
                key={index}
                className={` 
                 d border border-gray-300/50 dark:border-gray-800/50
                 shadow-accent/50 hover:shadow-lg bg-white/10 backdrop-blur-sm
                  w-sm min-h-82 lg:w-xl rounded-lg p-8 trans`}
              >
                <span className="flex gap-2 md:gap-5 items-center w-full md:w-52 mb-1  ">
                  <p className="font-bold text-xl md:text-2xl"></p>
                  <p
                    className={` text-3xl font-bold text-purple-400 text-start text-nowrap `}
                  >
                    <span className="mano text-accent text-start mr-2">
                      {index + 1}.
                    </span>
                    {skill.title}
                  </p>
                </span>
                <p className=" subheading text-black/80 dark:text-white/60 mb-4 text-start px-2"></p>
                <p className=" text-start text-gray-50 text-lg px-2">
                  {skill.desription}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;

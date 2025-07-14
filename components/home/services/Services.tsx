import { servicesDetails } from "@/assets/data";
import Image from "next/image";

function Qualities() {
  return (
    <section
      className={`rounded-l-lg rounded-r-lg flex flex-col mt-10 p-3 lg:p-7 `}
    >
      <div className="text-center p-5 border-t">
        <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent via-pink-400 mt-4 to-blue-400 bg-clip-text text-transparent montserrat">
          SERVICES
        </h3>
        <p className="text-lg pt-2 opacity-80">
          We blend, design and code to create websites and mobile apps that not
          only look stunning but also function seamlessly across devices. It’s
          about more than just pixels
        </p>
      </div>
      <div className="flex flex-col mt-[var(--sm-margin)]  gap-10 lg:justify-between">
        {servicesDetails.map((service, index) => {
          return (
            <div
              key={index}
              className="services_children bg-black/40 backdrop:blur-lg shadow-accent/20 hover:shadow-lg border border-pink-400/20 md:flex justify-around w-full lg:w-[90%] items-center gap-5 mt-4 lg:mt-10 xl:mt-12  py-[6rem] 
               lg:h-[300px] text-center m-auto rounded-md pt-[var(--sm-padding)] trans"
            >
              <div className="service_image flex-3 size-[8rem] w-34 md:h-[14rem] mt-8 m-auto rounded-md over-flow-hidden">
                <Image
                  className="rounded-lg size-full"
                  src={service.icon}
                  alt={"./placeholder.png"}
                  width={300}
                  height={300}
                />
              </div>
              <div className=" md:w-2/3 text-center md: mx-3 h-[80%] rounded-md ">
                <p className="text-3xl text-pink-200 font-bold pt-3 p-2 man">
                  {service.title}
                </p>
                <p className="px-2 text-lg text-pink-50/80 lg:tracking-wider text-center ">
                  {service.details}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Qualities;

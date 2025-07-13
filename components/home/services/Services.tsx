import { motion } from "framer-motion";
import { servicesDetails, placeholdeImage } from "../../../assets/assets";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function Qualities() {
  return (
    <section
      className={`rounded-l-lg rounded-r-lg flex flex-col mt-10 p-3 lg:p-7 `}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center p-5 border-t"
      >
        <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent via-pink-400 mt-4 to-blue-400 bg-clip-text text-transparent montserrat">SERVICES</h3>
        <p className="text-lg pt-2 opacity-80">
          We blend, design and code to create websites and mobile apps that not
          only look stunning but also function seamlessly across devices. It’s
          about more than just pixels
        </p>
      </motion.div>
      <div className="flex flex-col mt-[var(--sm-margin)]  gap-10 lg:justify-between">
        {servicesDetails.map((service, index) => {
          return (
            <div
              key={index}
              className="services_children bg-black/40 backdrop:blur-lg shadow-accent/20 hover:shadow-lg border border-pink-400/20 md:flex justify-around w-full lg:w-[90%] items-center gap-5 mt-4 lg:mt-10 xl:mt-12  py-[6rem] 
               lg:h-[300px] text-center m-auto rounded-md pt-[var(--sm-padding)] trans"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="service_image flex-3 size-[8rem] w-34 md:h-[14rem] mt-8 m-auto rounded-md over-flow-hidden"
              >
                <LazyLoadImage
                  className="rounded-lg size-full"
                  alt={placeholdeImage}
                  effect="blur"
                  aria-label="Services image"
                  wrapperProps={{
                    style: { transition: "1s" },
                  }}
                  src={service.icon}
                />
              </motion.div>
              <div className=" md:w-2/3 text-center md: mx-3 h-[80%] rounded-md ">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-3xl text-pink-200 font-bold pt-3 p-2 man"
                >
                  {service.title}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="px-2 text-lg text-pink-50/80 lg:tracking-wider text-center "
                >
                  {service.details}
                </motion.p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Qualities;

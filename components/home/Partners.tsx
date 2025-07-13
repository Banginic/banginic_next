import { motion } from "framer-motion";
import { partners, placeholdeImage } from "../../assets/assets";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function Partners() {
  return (
    <section
      className={` mt-24 lg:mt-[var(--lg-margin)] w-full relative rounded-md z-5 py-10 grid shadow-md place-items-cente `}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent via-pink-400 mt-4 to-blue-400 bg-clip-text text-transparent montserratpy-[var(--sm-padding)] pb-[var(--md-padding)] text-center montserrat"
      >
        TURSTED BY
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 content-center place-items-center"
      >
        {partners.map((partner, index) => {
          return (
            <div
              key={index}
              className="grid place-items-center opacity-50 gap-9 p-2 h-52 w-52 rounded-md overflow-hidden "
            >
              
              <LazyLoadImage
                className=" w-[50%] h-[50% ] opacity-80 mx-auto"
                alt={placeholdeImage}
                effect="blur"
                aria-label="Trusted by image"
                 loading="lazy"
                wrapperProps={{
                  style: { transition: "1s" },
                }}
                src={partner.img}
              />
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}

export default Partners;

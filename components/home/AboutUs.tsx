import { Link } from "react-router-dom";
import { vision, metaData } from "../../assets/assets";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { placeholdeImage } from "../../assets/assets";

function AboutUs() {
  return (
    <section
      className={` p-5 overflow-hidden flex flex-col md:flex-row items-center lg:min-h-[400px] rounded-lg gap-10 `}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className=" h-[250px] md:h-[300px] md:min-w-[350px] lg:min-w-[500px]  overflow-hidden "
      >
        
        <LazyLoadImage
          className="w-full h-full object-cover  rounded-lg"
          alt={placeholdeImage}
          effect="blur"
          aria-label="about us image"
          loading="lazy"
          wrapperProps={{
            style: { transition: "1s" },
          }}
          src={vision}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className=" flex flex-col justify-center shadow-lg md:min-h-[400px] lg:min-h-[350px] bg-black/30 backdrop:blur-lg p-5 lg:px-8 py-10 mb-7 rounded-lg "
      >
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col gap-1 mb-3"
        >
          <span className="text-3xl font-bold text-pink-300 montserrat">{metaData.name}</span>
          <span className="heading4 text-accent">
            MORE THAN JUST A NAME
          </span>
        </motion.h3>
        <p className="text-lg opacity-80">
          where innovation meets excellence in software development. We are a
          passionate team of developers, designers, and problem-solvers
          dedicated to crafting high-quality, tailored solutions that empower
          businesses and organizations to thrive in the digital world.
        </p>
        <Link to="/about-us">
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            title="Go to about page"
            className="py-3 border shadow-accent/20 hover:shadow-lg bEmplorder-black text-sm dark:border-white shadow-sm px-6 mt-9 my-4 round-md lg:text-lg trans
           hover:opacity-80 rounded-lg cursor-pointer hover:bg-black/50"
          >
            Read more about us
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}

export default AboutUs;

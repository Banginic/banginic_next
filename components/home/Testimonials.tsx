import { useContext, useState } from "react";
import { happyCustomer, person } from "../../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../../context/AppProvider";
import myFetch from "../../libs/myFetch";
import Loading from "../Loading";
import StarRating from "../StarRating";
import { useQuery } from "@tanstack/react-query";
import type { TestimonialsTypes } from "../../models/types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { placeholdeImage } from "../../assets/assets";

function Testimonials() {
  const [index, setIndex] = useState(0);
  const appContext = useContext(AppContext);
  function handleTestify() {
    if (!appContext?.user) {
      return appContext?.navigate("/login");
    }
    appContext?.navigate("/testimonial-form");
  }
  function returnFn<TestimonialsTypes>() {
    const fetchDetails = {
      method: "get",
      endpoint: "/api/v2/testimonials/list",
      body: "",
      id: "",
    };
    return myFetch<TestimonialsTypes>(fetchDetails);
  }

  const { isLoading, data, isError, refetch } = useQuery<TestimonialsTypes>({
    queryKey: ["Testimony"],
    queryFn: returnFn,
  });

  if (isLoading) return <Loading />;

  if (isError || !data?.testimonies)
    return (
      <div className=" h-[30vh] lg:h-screen grid place-items-center text-center">
        <div>
          <h2 className="heading3">Error Fetching Testimonies</h2>
          <p>Please try again later</p>
          <button
            className="bg-gray-200 hover:bg-gray-300 mt-1 px-4 py-1 rounded cursor-pointer"
            onClick={() => refetch()}
          >
            Retry
          </button>
        </div>
      </div>
    );

  // Handle next and preview

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % data?.testimonies.length);
  };

  const handlePrev = () => {
    setIndex(
      (prev) => (prev - 1 + data?.testimonies.length) % data?.testimonies.length
    );
  };

  const current = data?.testimonies[index];

  return (
    <div className=" p-4 py-8">
      <motion.h4
        className={`mano text-center pb-10 mt-10 heading3 lg:pb-10   `}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        WHY PEOPLE LOVE US
      </motion.h4>
      <div className="  md:flex flex-row gap-4 justify-around">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className=" md:w-[300px] lg:w-1/3 h-[250px] "
        >
          <LazyLoadImage
            className="size-full rounded shadow-xl"
            alt={placeholdeImage}
            effect="blur"
            aria-label="happy customers image"
            loading="lazy"
            wrapperProps={{
              style: { transition: "1s" },
            }}
            src={happyCustomer}
          />
        </motion.div>
        <motion.div
          className="relative rounded md:w-1/2 mt-24 md:mt-0 "
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <article className="bg-white backdrop:blur-sm shadow-lg  mx-auto rounded-lg  relative p-5 md:w-xs lg:w-sm min-h-110">
            <div className="flex items-center justify-between p-3">
              <LazyLoadImage
                className="size-[64px] lg:size-[80px] bg-blue-300 rounded-full shadow"
                alt={placeholdeImage}
                effect="blur"
                aria-label="happy customers image"
                loading="lazy"
                wrapperProps={{
                  style: { transition: "1s" }
                }}
                src={current?.photo || person}
              />
              <StarRating rating={current?.rating} />
            </div>
            <p className="text-lg mt-4 p-4 text-center text-gray-600 italic ">
              <span className="text-accent text-xl right-5">&ldquo;</span>
              {current?.message}
              <span className="text-accent text-xl right-5">&ldquo;</span>
            </p>
            <p className="heading4 mano text-black text-center mt-5">
              {current?.projectName}
            </p>
            <div className="grid">
              <button
                onClick={handleTestify}
                className="mx-auto border px-6 rounded-lg py-3 mt-6  cursor-pointer hover:bg-purple-800 bg-purple-950 trans trans"
              >
                Testify Yours
              </button>
            </div>
          </article>

          <span
            onClick={handlePrev}
            title="Previous testimony"
            className="absolute top-1/2 left-0 bg-neutral-400/10 hover:bg-neutral-400/20 w-14 rounded h-8 trans grid place-items-center cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className="fill-gray-300 dark:fill-gray-800 dark:hover:fill-white size-full hover:fill-black trans"
            >
              <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
            </svg>
          </span>
          <span
            onClick={handleNext}
            title="Next testimony"
            className="absolute top-1/2 right-0 bg-neutral-400/10 hover:bg-neutral-400/20 w-14 rounded h-8 trans grid place-items-center cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className="fill-gray-300 rotate-180 dark:fill-gray-800 dark:hover:fill-white size-full hover:fill-black trans"
            >
              <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
            </svg>
          </span>
        </motion.div>
      </div>
    </div>
  );
}

export default Testimonials;

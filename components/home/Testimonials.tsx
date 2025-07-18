"use client";
import { useContext, useState } from "react";
import { happyCustomer, person } from "@/assets/photos";
import { AppContext } from "@/context/AppProvider";
import { TestimonialsTypes } from "@/models/types";
import { usePathname } from "next/navigation";
import Loading from "../Loading";
import StarRating from "../StarRating";
import { useQuery } from "@tanstack/react-query";
import { FetchError, NoDataAvailable } from "@/admin-component";
import Image from "next/image";
import axios from "axios";

function Testimonials() {
  const { router, mainUser } = useContext(AppContext)!;

  function handleTestify (){
     if (!mainUser || mainUser === null || mainUser === undefined) {
      router.push('/sign-in')
    } else {
      router.push('/testimonial-form')
    }
  
  }
  const [index, setIndex] = useState(0);

  async function fetchTestimony() {
    const { data } = await axios.get("/api/testimonies/list-all-testimonies");
    return data;
  }

  const { isLoading, data, isError, refetch } = useQuery<TestimonialsTypes>({
    queryKey: ["testimony"],
    queryFn: fetchTestimony,
  });

  // Handle next and preview

  const handleNext = () => {
    if (Array.isArray(data?.data) && data.data.length > 0) {
      setIndex((prev) => (prev + 1) % data?.data.length);
    }
  };

  const handlePrev = () => {
    if (Array.isArray(data?.data) && data.data.length > 0) {
      setIndex((prev) => (prev - 1 + data?.data.length) % data?.data.length);
    }
  };

  const current = data?.data[index];


  return (
    <div className=" p-4 py-8 max-w-7xl mx-auto">
      <h4 className={`mano text-center pb-10 mt-10 heading3 lg:pb-10   `}>
        WHY PEOPLE LOVE US
      </h4>
      <div className="md:flex flex-row gap-4 justify-around">
        <div className=" md:w-[300px] lg:w-1/3 h-[250px] ">
          <Image
            className="size-full rounded shadow-xl"
            width={300}
            height={300}
            src={happyCustomer}
            alt="./placeholder.png"
          />
        </div>
        <section className="relative rounded md:w-1/2 mt-24 md:mt-0 ">
          {isLoading && <Loading />}
          {isError ||
            (!data && (
              <div className=" grid place-items-center text-center">
                <FetchError message="Testimonies" refetch={refetch} />
              </div>
            ))}
          {Array.isArray(data?.data) &&
            data?.data.length === 0 &&
            data.message && (
              <div className=" grid place-items-center text-center">
                <NoDataAvailable message="Testimonies" />
                <div className="grid">
                  <button
                    onClick={handleTestify}
                    className="mx-auto  px-6 rounded-lg py-2 mt-6  cursor-pointer hover:bg-pink-800 bg-pink-400 trans trans"
                  >
                    Testify Yours
                  </button>
                </div>
              </div>
            )}
            
          {Array.isArray(data?.data) && data.data.length > 0 && current && (
            <div>
              <article className="bg-black/30 backdrop:blur-sm shadow-accent/20 hover:shadow-accent trans shadow-lg  mx-auto rounded-lg  relative p-5 md:w-xs lg:w-sm min-h-110">
                <div className="flex items-center justify-between p-3">
                  <Image
                    className="size-[64px] lg:size-[80px] bg-blue-300 rounded-full shadow"
                    alt={"./placeholder.png"}
                    width={200}
                    height={200}
                    src={current?.photo || person}
                  />
                  <StarRating rating={current?.rating} />
                </div>
                <p className="text-lg mt-4 p-4 text-center text-pink-100 talic ">
                  <span className="text-accent text-xl right-5">&ldquo;</span>
                  {current?.message}
                  <span className="text-accent text-xl right-5">&ldquo;</span>
                </p>
                <p className="heading4 mano text-pink-400 text-center mt-5">
                  {current?.projectName}
                </p>
                <div className="grid">
                  <button
                   onClick={() =>handleTestify()}
                    className="mx-auto px-6 rounded-lg py-2 mt-6  cursor-pointer hover:border-pink-400  border border-pink-400/20 trans trans"
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
                  className="fill-pink-300 dark:hover:fill-white size-full hover:fill-black trans"
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
                  className="fill-pink-300 rotate-180 dark:hover:fill-white size-full hover:fill-black trans"
                >
                  <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
                </svg>
              </span>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Testimonials;

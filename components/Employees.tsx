import SocialLinks from "./SocialLinks";
import { motion } from "framer-motion";
import myFetch from "../libs/myFetch";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AboutUSkeleton from "./skeletons/AboutUSkeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { person } from "../assets/assets";

interface Employee {
  _id: string;
  fullName: string;
  position: string;
  qualification: string;
  motivation: string;
  hireDate: Date;
  socialLinks: { [key: string]: string };
  createdAt: Date;
  updatedAt: Date;
  photo: string;
}
interface FetchProps {
  statusCode?: number;
  message: string;
  success: boolean;
  employees: Employee[];
}
function Employees() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fetchDetails = {
    method: "get",
    endpoint: "/api/v2/employees/list",
    body: "",
    id: "",
  };

  const useEmployeesQuery = () => {
    return useQuery<FetchProps, Error>({
      queryKey: ["employee"],
      queryFn: () => myFetch<FetchProps>(fetchDetails),
    });
  };

  const { isLoading, refetch, data, isError } = useEmployeesQuery();

  const employee = data?.employees[currentIndex];

  if (isLoading || !data?.employees) return <AboutUSkeleton />;

  if (isError) {
    return (
      <div className="grid md:w-1/2 place-items-center text-center">
        <div>
          <h2 className="heading4">Error Fetching Employee</h2>
          <p>Please try again later</p>
          <button
            className="cursor-pointer hover:bg-slate-300 hover:dark:text-black px-4 py-1 rounded trans"
            onClick={() => refetch()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  if (data?.employees.length === 0) {
    return (
      <div className="grid place-items-center md:w-1/2">
        <h3 className="text-center heading4">No Employees Available</h3>
      </div>
    );
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? data?.employees?.length - 1 : prev - 1
    );
  };
  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === data?.employees?.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="my-20 lg:mt-0 relative min-h-[550px] lg:w-1/2">
      <article
        className=" shadow-accent/50 max-w-sm md:w-md h-[500px] shadow-lg hover:shadow-xl trans dark:border border-pink-400/50 bg-gradient-to-b from-white to-pink-50 lg:w-sm min-h-92
            mx-auto rounded-xl p-4 text-center "
      >
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          whileInView={{ opacity: 1, y: -20 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="size-52 -translate-y-10 bg-red-100 rounded-full mx-auto"
        >
          <LazyLoadImage
            className="size-full rounded-full"
            alt={person}
            effect="blur"
             loading="lazy"
            aria-label={`Employee ${employee?.fullName} photo`}
            wrapperProps={{
              style: { transition: "1s" },
            }}
            src={employee?.photo ? employee?.photo : person}
          />
        </motion.div>
        <div className="-translate-y-10">
          <h3 className="text-lg font-bold mt-4 text-black ">{employee?.fullName.toUpperCase()}</h3>
          <p className=" mano text-pink-400 ">
            {employee?.position}
          </p>
          <p className="text-accent">{employee?.qualification}</p>
          <p className="text-[17px] text-black/80 my-2 overflow-hidden rounded h-23 ">
            {employee?.motivation}
          </p>
        </div>
        <div className="flex justify-center mb-2">
          {employee?.socialLinks && (
            <SocialLinks links={employee?.socialLinks} />
          )}
        </div>
      </article>
      <div className="flex gap-1 absolute bottom-0 lg:-bottom-12 left-1/2 -translate-x-1/2">
        {data?.employees.map((_, index) => (
          <span
            onClick={() => setCurrentIndex(index)}
            className={`size-3 ${
              currentIndex === index ? "w-6" : ""
            } rounded-full bg-gray-300 cursor-pointer`}
          ></span>
        ))}
      </div>
      <span
        onClick={handlePrevious}
        className="absolute  md:grid top-1/2 left-2 bg-neutral-400/10 hover:bg-neutral-400/20 w-14 rounded h-8 trans place-items-center cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          className="fill-gray-300  size-full hover:fill-black trans"
        >
          <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
        </svg>
      </span>
      <span
        onClick={handleNext}
        className="absolute top-1/2 right-2 bg-neutral-400/10 hover:bg-neutral-400/20 w-14 rounded h-8 trans  md:grid place-items-center cursor-pointer"
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
    </div>
  );
}

export default Employees;

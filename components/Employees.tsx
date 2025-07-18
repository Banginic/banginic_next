"use client";
import SocialLinks from "./SocialLinks";
import { SetStateAction, useState } from "react";
import { person } from "@/assets/photos";
import Image from "next/image";
import axios from "axios";
import { useMyQuery } from "@/hooks/useQuery";
import { Loading } from "@/components/exportComp";
import { FetchError, NoDataAvailable } from "@/admin-component/index";

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
  async function fetchEmployee() {
    const { data } = await axios.get("/api/employees/list-all-employees", {
      withCredentials: true,
    });
    return data;
  }

  const { isLoading, refetch, data, isError } = useMyQuery(
    "employees",
    fetchEmployee
  );

  const employee = data?.data[currentIndex];

  if (isLoading || !data?.data) return <Loading />;

  if (isError) {
    return <FetchError refetch={refetch} message="Employee" />;
  }
  if (data?.data.length === 0) {
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
        className=" shadow-accent/50 max-w-sm md:w-md h-[500px] shadow-lg hover:shadow-xl trans dark:border border-pink-400/50 bg-gradient-to-b from-black/10 to-black/20 lg:w-sm min-h-92
            mx-auto rounded-xl p-4 text-center "
      >
        <div className="size-52 -translate-y-10 bg-red-100 rounded-full mx-auto">
          <Image
            className="size-full rounded-full"
            alt={"./placeholder.png"}
            width={30}
            height={40}
            src={employee?.photo ? employee?.photo : person}
          />
        </div>
        <div className="-translate-y-10">
          <h3 className="text-lg font-bold mt-4 text-pink-100 ">
            {employee?.name.toUpperCase()}
          </h3>
          <p className=" mano text-white/90 ">{employee?.position}</p>
          <p className="text-accent">{employee?.qualification}</p>
          <p className="text-[17px] text-white/80 my-2 overflow-hidden rounded h-23 ">
            {employee?.bio}
          </p>
        </div>
        <div className="flex justify-center mb-2">
          {employee?.socialLinks && (
            <SocialLinks links={employee?.socialLinks} />
          )}
        </div>
      </article>
      <div className="flex gap-1 absolute bottom-0 lg:-bottom-12 left-1/2 -translate-x-1/2">
        {data?.data.map((_: any, index: SetStateAction<number>) => (
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
          className="fill-gray-300  size-full hover:fill-pink-400 trans"
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
          className="fill-gray-300 rotate-180  size-full hover:fill-pink-400 trans"
        >
          <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
        </svg>
      </span>
    </div>
  );
}

export default Employees;

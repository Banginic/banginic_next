"use client";
import React from "react";
import { Loading } from "@/components/exportComp";
import { FetchError, NoDataAvailable } from "@/admin-component/index";
import Link from "next/link";
import { useMyQuery } from "@/hooks/useQuery";
import axios from "axios";
import { EmployeeType } from "@/models/types";

function Employees() {
  async function fetchEmployees(): Promise<EmployeeType> {
    const { data } = await axios.get("/api/employees/list-all-employees", {
      withCredentials: true,
    });
    return data;
  }
  const { isLoading, isError, data, refetch } = useMyQuery<EmployeeType>(
    "employees",
    fetchEmployees
  );
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-pink-400 text-2xl lg:text-4xl text-center font-semibold lg:mt-4">
        EMPLOYEES
      </h1>
      <Link href={'/admin/employee-form'} className="inline-flex border border-green-400/50 py-2 px-4 rounded cursor-pointer text-green-200 hover:border-green-400">Hire Employee</Link>
      <section className="  mt-4  shadow w-[95%] lg:w-2xl rounded mx-auto ">
        {isLoading && <Loading />}

        {
          (Array.isArray(data?.data) && data.data.length === 0 && data.message && (
            <NoDataAvailable message={data.message} />
          ))}
          {isError && <FetchError message="Messages" refetch={refetch} />}
        {data &&
          Array.isArray(data.data) &&
          data.data.length > 0 &&
          !isLoading &&
          data.data.map((item) => (
            <Link
              href={`/admin/employees/${item.id}`}
              key={item.id}
              className="px-4 py-4 rounded border border-pink-100/20 shadow grid grid-cols-3 gap-1 mt-2 bg-black/20 hover:bg-black/10 "
            >
              <div className="">
                <p className="text-neutral-300">Name</p>
                <p>{item.name}</p>
              </div>
              <div className="">
                <p className="text-neutral-300">Position</p>
                <p className=" ">{item.position}</p>
              </div>
              <div className="">
                <p className="text-neutral-300">Hired date</p>
                <p className="text-green-500 ">
                  {new Date(item.hiredDate).toLocaleDateString("en-GB")}
                </p>
              </div>
            </Link>
          ))}
      </section>
    </div>
  );
}

export default Employees;

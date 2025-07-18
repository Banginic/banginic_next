"use client";
import React, { useContext, useState } from "react";
import { Back } from "@/components/exportComp";
import { EmployeeType } from "@/models/types";
import { useMyMutate, useMyQuery } from "@/hooks/useQuery";
import { Loading } from "@/components/exportComp";
import { FetchError, NoDataAvailable } from "@/admin-component/index";
import { AppContext } from "@/context/AppProvider";
import axios from "axios";

function EmployeeDetails({
  params,
}: {
  params: Promise<{ employeeId: string }>;
}) {
  const { employeeId } = React.use(params);
  const [error, setError] = useState("");
  const { router } = useContext(AppContext)!;

  async function getEmployee(): Promise<EmployeeType> {
    const { data } = await axios.get(
      `/api/employees/list-single-employee?employeeId=${employeeId}`,
      {
        withCredentials: true,
      }
    );
    return data;
  }
  function clearForm() {
    router.push("/admin/employees");
  }

  async function deleteEmployee(): Promise<EmployeeType> {
    const { data } = await axios.delete(
      `/api/employees/delete-single-employee?employeeId=${employeeId}`,
      {
        withCredentials: true,
      }
    );
    return data;
  }
  const { isLoading, isError, data, refetch } = useMyQuery("employess", getEmployee);
  const { isPending, mutate } = useMyMutate(
    "employees",
    deleteEmployee,
    setError,
    clearForm
  );

  return (
    <div className="relative pb-12 mx-auto max-w-7xl">
      <div className="absolute top-8 left-2">
        <Back link="/admin/employees" name="Back" />
      </div>
      <h1 className="text-pink-400 text-2xl lg:text-4xl text-center font-semibold">
        EMPLOYEE DETAILS
      </h1>

      <section className="  mt-12  shadow w-sm rounded mx-auto ">
        {(isLoading || isPending) && <Loading />}

        {
          (Array.isArray(data?.data) && data.data.length === 0 && data.message && (
            <NoDataAvailable message={data?.message || error} />
          ))}

        {isError || !data && <FetchError message="Employees" refetch={refetch} />}
     
        {data &&
          Array.isArray(data.data) &&
          data.data.length > 0 &&
          (!isPending || !isLoading) && (
            <article className="px-4 py-8 rounded border border-pink-100/20 shadow flex flex-col gap-2 mt-2 bg-black/20 ">
              <div className="">
                <p className="text-neutral-300">Sender</p>
                <p>{data.data[0].name}</p>
              </div>
              <div className="">
                <p className="text-neutral-300">Position</p>
                <p className=" ">{data.data[0].position}</p>
              </div>
              <div className="">
                <p className="text-neutral-300">Qualification</p>
                <p className="">{data.data[0].qualification}</p>
              </div>
              <div className="">
                <p className="text-neutral-300">Phone number</p>
                <p >{data.data[0].phone}</p>
              </div>
              <div className="">
                <p className="text-neutral-300">Hired date</p>
                <p className="text-green-500 ">
                  {new Date(data.data[0].hiredDate).toLocaleDateString("en-GB")}
                </p>
              </div>
              <div className="">
                <p className="text-neutral-300">Message</p>
                <p className="p-2 rounded bg-black/20 mt-1 text-wrap">
                  {data.data[0].bio}
                </p>
              </div>
              <button
                onClick={() => mutate()}
                className="border rounded w-40 mt-8 hover:scale-105 trans cursor-pointer text-red-100 border-red-500 px-4 py-2"
              >
                Fire Employee
              </button>
            </article>
          )}
      </section>
    </div>
  );
}

export default EmployeeDetails;

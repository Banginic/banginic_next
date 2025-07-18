"use client";
import { useContext, useState } from "react";
import type { FormEvent } from "react";
import { download, vision } from "@/assets/photos";
import axios, { AxiosError } from "axios";
import { AppContext } from "@/context/AppProvider";
import { toast } from "react-toastify";

import Image from "next/image";
interface TestimonialsTypes {
  name: string;
  email: string;
  projectName: string;
  message: string;
  rating: Number;
  photo: File | null;
}
function TestimonialForm() {
  const appContext = useContext(AppContext);
  const [testimony, setTestimony] = useState<TestimonialsTypes>({
    name: "",
    email: "",
    projectName: "",
    message: "",
    rating: 0,
    photo: null,
  });

  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [formError, setFormError] = useState({ photo: false });
  const disableBTN =
    isLoading ||
    testimony.message.length < 20 ||
    testimony.projectName.length < 5;
  function clearForm() {
    setError("");
    setTestimony({
      name: "",
      email: "",
      projectName: "",
      message: "",
      rating: 0,
      photo: null,
    });
  }
  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isLoading) return;

    setError("");
    setLoading(true);
    setFormError({ photo: false });
    try {
      // check photo size
      if (testimony.photo && testimony.photo?.size > 3 * 1024 * 1024) {
        setFormError({ photo: true });
        return setError("Photo is more than 3Mb.");
      }
      const formData = new FormData();
      formData.append("name", testimony.name);
      formData.append("projectName", testimony.projectName);
      formData.append("email", testimony.email);
      formData.append("message", testimony.message);
      formData.append("rating", testimony.rating.toString());
      if (testimony.photo) {
        formData.append("photo", testimony.photo);
      }

 
      const { data } = await axios.post(
        "/api/testimonies/create-testimonies",
        formData, { withCredentials: true}
      );

      const { success, message } = data;
      if (success) {
        toast.success(message);
        return setTimeout(() => appContext?.router.push("/"), 1000);
      }
      setError(message);
    } catch (ex: unknown) {
      if (ex instanceof Error) {
        toast.error(ex.message);
      }
      if (ex instanceof AxiosError) {
        toast.error(ex.response?.data.message);
      }
    } finally {
      setLoading(false);
      clearForm();
    }
  };
  return (
    <div className="min-h-screen lg:max-w-6xl 2xl:max-w-7xl mx-auto py-8">
      <h1 className="text-xl text-pink-400 lg:text-3xl font-bold mano text-center">
        YOUR TESTIMONY MATTERS US
      </h1>
      <div className="flex flex-col gap-8 md:flex-row p-5 justify-around items-center md:items-start mt-8">
        <div className=" w-sm lg:w-lg h-92 ">
          <Image
            src={vision}
            width={600}
            height={600}
            className="size rounded-lg shadow-md"
            alt="./placeholder.png"
          />
        </div>
        <form
          id="form"
          onSubmit={handleFormSubmit}
          className="bg-black/50 shadow text-sm w-sm rounded-sm p-4 px-8"
        >
          <h2 className="font-medium text-lg">Testimony</h2>
          <p className="text-gray-400">We are happy to see your testimony</p>

          <div
            title="Add image"
            className={`mt-8  rounded cursor-pointer border ${
              formError.photo ? "border-red-500" : "border-gray-400 "
            }`}
          >
            <input
              type="file"
              accept="image/*"
              name="photo"
              onChange={(e) =>
                setTestimony({ ...testimony, photo: e.target?.files![0] })
              }
              hidden
              id="image"
            />
            <label
              htmlFor="image"
              className="w text-nowrap cursor-pointer flex items-center"
            >
              <Image
                src={
                  testimony.photo
                    ? URL.createObjectURL(testimony.photo)
                    : download
                }
                className="object-cover shadow  size-16 border-gray-800 rounded-sm mr-5"
                alt="./placeholder.png"
                width={50}
                height={50}
              />
              <div>
                <p>
                  Add photo{" "}
                  <span className="italic text-gray-500 ">(optional)</span>
                </p>
                {testimony.photo && (
                  <button
                    onClick={() => setTestimony({ ...testimony, photo: null })}
                    title="Delete Photo"
                    className="mt-2 text-gray-600 dark:text-gray-400 cursor-pointer hover:underline flex gap-2"
                  >
                    Remove photo
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      className="size-5 fill-pink-400"
                      width="24px"
                    >
                      <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                    </svg>
                  </button>
                )}
              </div>
            </label>
          </div>
          <div className="border border-gray-400 rounded px-4 py-2 flex items-center gap-2 my-3 mt">
            <label htmlFor="name" className="sr-only">
              Full Name
            </label>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className="fill-pink-400"
            >
              <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
            </svg>
            <input
              type="text"
              id="name"
              name="name"
              required
              autoComplete="name"
              placeholder="John Doe"
              value={testimony.name}
              onChange={(e) =>
                setTestimony({ ...testimony, name: e.target.value })
              }
              className="outline-none bordoer-none w bg-transparent"
            />
          </div>
          <div className="border border-gray-400  rounded px-5 py-2 flex items-center gap-2 mb-4">
            <label htmlFor="projectName" className="sr-only">
              Project Name
            </label>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className="fill-pink-400"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm80-80h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm200-190q13 0 21.5-8.5T510-820q0-13-8.5-21.5T480-850q-13 0-21.5 8.5T450-820q0 13 8.5 21.5T480-790ZM200-200v-560 560Z" />
            </svg>
            <input
              type="text"
              required
              name="projectName"
              id="projectName"
              placeholder="Project name"
              value={testimony.projectName}
              onChange={(e) =>
                setTestimony({ ...testimony, projectName: e.target.value })
              }
              className="outline-none bordoer-none w bg-transparent"
            />
          </div>
          <div className="border border-gray-400 rounded px-4 py-2 flex items-center gap-2 mb-4">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className="fill-pink-400"
            >
              <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
            </svg>
            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="Email address"
              autoComplete="email"
              value={testimony.email}
              onChange={(e) =>
                setTestimony({ ...testimony, email: e.target.value })
              }
              className="outline-none bordoer-none w bg-transparent"
            />
          </div>
          <div className="border border-gray-400 rounded px-4 py-2 flex items-center gap-2 mb-4">
            <label htmlFor="rating" className="sr-only">
              Rating
            </label>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className="fill-pink-400"
            >
              <path d="m387-412 35-114-92-74h114l36-112 36 112h114l-93 74 35 114-92-71-93 71ZM240-40v-309q-38-42-59-96t-21-115q0-134 93-227t227-93q134 0 227 93t93 227q0 61-21 115t-59 96v309l-240-80-240 80Zm240-280q100 0 170-70t70-170q0-100-70-170t-170-70q-100 0-170 70t-70 170q0 100 70 170t170 70ZM320-159l160-41 160 41v-124q-35 20-75.5 31.5T480-240q-44 0-84.5-11.5T320-283v124Zm160-62Z" />
            </svg>
            <input
              type="number"
              id="rating"
              name="rating"
              required
              placeholder="Rating"
              min={1}
              max={5}
              maxLength={1}
              value={testimony.rating.toString()}
              onChange={(e) =>
                setTestimony({ ...testimony, rating: Number(e.target.value) })
              }
              className="outline-none bordoer-none w bg-transparent"
            />
          </div>
          <div className="border border-gray-400  rounded px-5 py-2 flex items-center gap-2 mb-4">
            <label htmlFor="message" className="sr-only">
              Testimony
            </label>
            <textarea
              id="message"
              name="message"
              required
              placeholder="Tesitmony message"
              rows={5}
              value={testimony.message}
              onChange={(e) =>
                setTestimony({ ...testimony, message: e.target.value })
              }
              className="outline-none bordoer-none w bg-transparent resize-none placeholder:text-accent"
            ></textarea>
          </div>
          <button
            disabled={disableBTN}
            type="submit"
            className="w disabled:bg-acent/80 flex items-center w-full justify-center disabled:cursor-auto gap-4 bg-accent mb-3 hover:opacity-60 text-white cursor-pointer rounded py-2 trans"
          >
            {isLoading ? (
              "Loading...."
            ) : (
              <p className="flex items-center gap-2">
                Send Testimony
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e3e3e3"
                >
                  <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
                </svg>
              </p>
            )}
          </button>
          <p className="text-red-500 text-center h-6 text-sm overflow-hidden">
            {error}
          </p>
        </form>
      </div>
    </div>
  );
}

export default TestimonialForm;

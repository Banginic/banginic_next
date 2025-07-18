"use client";
import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useState,
} from "react";

import { platforms } from "@/assets/data";
import { toast } from "react-toastify";
import { AppContext } from "@/context/AppProvider";
import { EmployeeType, PlatformType } from "@/models/types";
import axios, { AxiosError } from "axios";

interface FormProps {
  name: string;
  position: string;
  bio: string;
  phone: string;
  qualification: string;
  photo: null | File;
}
function AddEmployee() {
  const { router } = useContext(AppContext)!;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [changedFields, setChangedFields] = useState<{
    [key: string]: boolean;
  }>({});
  const [employee, setEmployee] = useState<FormProps>({
    name: "",
    position: "",
    qualification: "",
    bio: "",
    phone: "",
    photo: null,
  });

  async function postData() {
    const { data } = await axios.post("", employee, { withCredentials: true });
    return data;
  }
  const [visibleInputs, setVisibleInputs] = useState<{
    [key: string]: boolean;
  }>({});
  const [links, setLinks] = useState<{ [key: string]: string }>({
    twitter: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    github: "",
    website: "",
  });
  // MANAGE FORM DATA
  const changedValues = Object.keys(changedFields)
    .filter((key) => changedFields[key] && links[key].trim() !== "")
    .reduce<{ [key: string]: string }>((obj, key) => {
      obj[key] = links[key];
      return obj;
    }, {});



  const disabledBTN =
    employee.name.length < 3 ||
    employee.position.length < 8 ||
    employee.bio.length < 3;

  function toggleInput(platform: string) {
    setVisibleInputs((prev) => ({ ...prev, [platform]: !prev[platform] }));
  }
  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setLinks({ ...links, [name]: value });
    setChangedFields({ ...changedFields, [name]: true });
  }
  function handleValuesChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setEmployee({ ...employee, [name]: value });
  }
  function clearForm() {
    setLinks({
      twitter: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      youtube: "",
      github: "",
      website: "",
    });
    setEmployee({
      name: "",
      position: "",
      qualification: "",
      bio: "",
      phone: "",
      photo: null,
    });
  }
  // HANDLE SUBMIT
  async function useHandleFormSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", employee.name);
      formData.append("position", employee.position);
      formData.append("phone", employee.phone);
      formData.append("qualification", employee.qualification);
      formData.append("bio", employee.bio);
      formData.append("socialLinks", JSON.stringify(changedValues));
      if (employee.photo) {
        formData.append("photo", employee.photo);
      }
       const { data } = await axios.post(
          "/api/employees/create-employee",
          formData,
          { withCredentials: true }
        );
        if(data.success){
          clearForm()
          toast.success(data.message)
          router.push('/admin/employees')
          return
        }
        setError(data.message)

    } catch (ex: unknown) {
      if (ex instanceof Error) {
        toast.error(ex.message);
      }
      if (ex instanceof AxiosError) {
        toast.error(ex.response?.data.message);
      }
    } finally {
      setLoading(false);
      // clearForm();
    }
  }

  return (
    <div className="min-h-screen my-12 text-sm">
      <h1 className="heading3 mano text-center text-pink-400">ADD EMPLOYEE</h1>
      <form
        onSubmit={useHandleFormSubmit}
        className="border border-pink-400/50 rounded-sm w-sm mx-auto mt-4 p-5"
      >
        <div className="mb-8">
          <p className="text-neutral-500">
            Please add an employee using the form below
          </p>
        </div>
        <div className="flex items-center gap-5">
          <p>Add Profile photo</p>
          <div
            title="Add Photo"
            className="border size-20 hover:bg-gray-500 trans rounded-sm border-gray-300 cursor-pointer mb-4"
          >
            <label htmlFor="photo" className="cursor-pointer">
              <img
                src={
                  employee.photo
                    ? URL.createObjectURL(employee.photo)
                    : "./placeholder.png"
                }
                alt=""
                className="size-full object-cover"
              />
              <input
                type="file"
                required
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    photo:
                      e.target.files && e.target.files[0]
                        ? e.target.files[0]
                        : null,
                  })
                }
                id="photo"
                hidden
                name="photo"
              />
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="name">Full name</label>
          <div className="border mt-0.5 rounded-sm px-4 py-1.5 flex gap-4">
            <span>L</span>
            <input
              type="text"
              className="w-full outline-none border-none bg-transparent"
              minLength={3}
              maxLength={25}
              required
              value={employee.name}
              onChange={handleValuesChange}
              autoComplete="full name"
              placeholder="John Smith"
              name="name"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="position">Position</label>
          <div className="border mt-0.5 rounded-sm px-4 py-1.5 flex gap-4">
            <span>L</span>
            <input
              type="text"
              className="w-full outline-none border-none bg-transparent"
              minLength={3}
              maxLength={50}
              required
              value={employee.position}
              onChange={handleValuesChange}
              autoComplete="position"
              placeholder="Manager"
              name="position"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="position">Phone</label>
          <div className="border mt-0.5 rounded-sm px-4 py-1.5 flex gap-4">
            <span>L</span>
            <input
              type="tel"
              className="w-full outline-none border-none bg-transparent"
              minLength={3}
              maxLength={50}
              required
              value={employee.phone}
              onChange={handleValuesChange}
              autoComplete="phone"
              placeholder="+ 237 6534 232-234"
              name="phone"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="qualification">Qualification</label>
          <div className="border mt-0.5 rounded-sm px-4 py-1.5 flex gap-4">
            <span>L</span>
            <input
              type="text"
              className="w-full outline-none border-none bg-transparent"
              minLength={3}
              maxLength={50}
              required
              value={employee.qualification}
              onChange={handleValuesChange}
              autoComplete="qualification"
              placeholder="Bsc. Computer sciences"
              name="qualification"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="bio">Motivation</label>
          <div className="border mt-0.5 rounded-sm px-4 py-1.5 flex gap-4">
            <textarea
              className="w-full outline-none border-none bg-transparent"
              placeholder="Motivation"
              name="bio"
              required
              value={employee.bio}
              onChange={handleValuesChange}
              rows={5}
            ></textarea>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="socialLinks">Social Links</label>
          <div>
            {platforms.map((platform) => (
              <div key={platform.name} className="relative">
                <div
                  className={`flex items-center p-3 border rounded cursor-pointer trans ${
                    visibleInputs[platform.name]
                      ? "border-accent bg-gray-200"
                      : "hover: border-gray-400"
                  } mb-2 py-1.5`}
                  onClick={() => toggleInput(platform.name)}
                >
                  <platform.icon
                    className={
                      visibleInputs[platform.name] ? "text-accent" : ""
                    }
                    size={24}
                  />
                </div>
                {visibleInputs[platform.name] && (
                  <div className="mt-2 p-3 border border-gray-300 rounded-md">
                    <label htmlFor={platform.name} className="block mb-0.5 ">
                      {platform.label} URL
                    </label>
                    <input
                      type="url"
                      name={platform.name}
                      id={platform.name}
                      value={links[platform.name]}
                      onChange={handleChange}
                      placeholder={platform.placeholder}
                      className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          disabled={disabledBTN}
          className="bg-black disabled:bg-neutral-500 hover:bg-black/50 cursor-pointer rounded-sm mt-4 text-white py-1.5 w-full"
        >
          {loading ? "Adding... Please wait!" : "Add Employee"}
        </button>
        <p className="text-red-500 text-center mt-0.5 h-5">{error}</p>
      </form>
    </div>
  );
}

export default AddEmployee;

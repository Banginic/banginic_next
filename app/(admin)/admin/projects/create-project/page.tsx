'use client'
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { placeholdeImage } from "@/assets/photos";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
interface Project{
  projectName: string;
  designer: string;
  category: string;
  description: string;
  url: string;
  story: string;
  approach: string
  photos: File[] | null
}

function AddProjects() {
const router  = useRouter()
  const [project, setProject] = useState<Project | null>(null);
  const [ error, setError ] = useState('')
  const [ isLoading, setLoading ] = useState(false)
  function clearForm(){

  }


  
  const [formData, setFormData] = useState<Project>({
    projectName: "",
    designer: "",
    category: "",
    url: "",
    description: "",
    story: "",
    approach: "",
    photos: null,
  });

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading( true)
    setError('')
    const body = new FormData();
    body.append("projectName", formData.projectName);
    body.append("designer", formData.designer);
    body.append("url", formData.url);
    body.append("category", formData.category);
    body.append("description", formData.description);
    body.append("story", formData.story);
    body.append("approach", formData.approach);

    //  append photos
    // Append only the photos that have been selected
if(formData.photos){
      for (let i = 0; i < formData.photos.length; i++) {
      body.append("photos", formData.photos[i]);
    }
}
try{

  const { data } = await axios.post('/api/projects/create-project', body, { withCredentials: true})
  
  // handle success
  if(data.success){
    toast.success(data.message)
   clearForm()
   return router.push('/admin/projects')
  }
  setError(data.message)
  toast.error(data.message)
}
catch(ex){
  if(ex instanceof Error){
    setError(ex.message)
  }
  setError('Error posting project')
  console.log(ex)
}finally{
  setLoading(false)
}
}

  
  


  return (
    <div className="py-12 grid place-items-center">
      <form
        onSubmit={handleFormSubmit}
        className="border border-gray-300 rounded-lg p-8 bg-black/20 shadow-accent/50 shadow-lg w-sm md:w-lg " >
        <h1 className="mx-4">Create Project</h1>
        <p className="text-sm text-gray-500 mx-4 mb-8">
          Please submit your project using the form below.
        </p>
        <div className="">
          <p className="mb-2">Upload Images</p>
          <div className="flex gap-3 justify-between mb-4 cursor-pointer">
            <label htmlFor="image1">
              <Image
                className="size-20"
                src={
                formData.photos && formData?.photos[0]
                    ? URL.createObjectURL(formData.photos[0])
                    : placeholdeImage
                }
                alt="./placeholder.png"
                width={50}
                height={50}
              />
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setFormData({
                      ...formData,
                      photos: [...(formData.photos ?? []), e.target.files[0]],
                    });
                  }
                }}
                id="image1"
                hidden
                name="photos"
              />
            </label>
            <label htmlFor="image2">
               <Image
                className="size-20"
                src={
                formData.photos && formData?.photos[1]
                    ? URL.createObjectURL(formData.photos[1])
                    : placeholdeImage
                }
                alt="./placeholder.png"
                width={50}
                height={50}
              />
              <input
                type="file"
                  onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setFormData({
                      ...formData,
                      photos: [...(formData.photos ?? []), e.target.files[0]],
                    });
                  }
                }}
                id="image2"
                hidden
                name="photos"
              />
            </label>
            <label htmlFor="image3">
            <Image
                className="size-20"
                src={
                formData.photos && formData?.photos[2]
                    ? URL.createObjectURL(formData.photos[2])
                    : placeholdeImage
                }
                alt="./placeholder.png"
                width={50}
                height={50}
              />
              <input
                type="file"
                   onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setFormData({
                      ...formData,
                      photos: [...(formData.photos ?? []), e.target.files[0]],
                    });
                  }
                }}
                id="image3"
                name="photos"
                hidden
              />
            </label>
            <label htmlFor="image4">
           <Image
                className="size-20"
                src={
                formData.photos && formData?.photos[3]
                    ? URL.createObjectURL(formData.photos[3])
                    : placeholdeImage
                }
                alt="./placeholder.png"
                width={50}
                height={50}
              />
              <input
                type="file"
                     onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setFormData({
                      ...formData,
                      photos: [...(formData.photos ?? []), e.target.files[0]],
                    });
                  }
                }}
                id="image4"
                name="photos"
                hidden
              />
            </label>
          </div>
        </div>
        <div className="flex mb-4 gap-4 flex-col md:flex-row">
          <input
            type="text"
            placeholder="Project name"
            required
            value={formData.projectName}
            onChange={handleChange}
            name="projectName"
            className=" border md:w-1/2 border-gray-300 rounded px-4 py-2"
          />
          <input
            type="text"
            placeholder="Designer"
            required
            value={formData.designer}
            onChange={handleChange}
            name="designer"
            className=" border md:w-1/2 border-gray-300 rounded px-4 py-2"
          />
        </div>
        <div className="flex mb-4 gap-4 flex-col md:flex-row">
          <input
            type="url"
            placeholder="Project URL"
            value={formData.url}
            onChange={handleChange}
            name="url"
            className=" border md:w-1/2 border-gray-300 rounded px-4 py-2"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className=" border md:w-1/2 cursor-pointer border-gray-300 rounded px-4 py-2"
            id=""
          >
            <option value="">Select category</option>
            <option value="Website">Websit</option>
            <option value="Apps">Mobile app</option>
            <option value="AI">AI Intergration</option>
            <option value="UX/UI">UI/UX Designe</option>
            <option value="Branding">Branding</option>
            <option value="SEO">SEO</option>
          </select>
        </div>

        <textarea
          name="description"
          rows={4}
          required
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="px-4 mb-4 py-2 border border-gray-300 rounded w-full"
        ></textarea>
        <textarea
          name="story"
          rows={4}
          required
          value={formData.story}
          onChange={handleChange}
          placeholder="Story"
          className="px-4 mb-4 py-2 border border-gray-300 rounded w-full"
        ></textarea>
        <textarea
          name="approach"
          required
          value={formData.approach}
          onChange={handleChange}
          rows={4}
          placeholder="Approach"
          className="px-4 mb-4 py-2 border border-gray-300 rounded w-full"
        ></textarea>
        <button
        disabled={isLoading} className="my-4 disabled:bg-black/50 bg-black text-white w-full py-2 rounded cursor-pointer hover:bg-black/90">
       {
        isLoading ? <span className="animate-pulse">Posting...</span> : 'Create Job'
       }
        </button>
        <p className="text-center text-red-500 h-4 mt-1">{error}</p>
      </form>
    </div>
  );
}

export default AddProjects;

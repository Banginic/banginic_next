import {  useContext, useState } from "react";
import type { FormEvent } from "react";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { Logo } from "./exportComp";
import { AppContext } from "../context/AppProvider";
import { person, email, call } from "../assets/assets";
import Spiner from "./Spiner";


function ContactForm() {
 const appContext = useContext(AppContext)
  const [ fetchState, setFetchState ] = useState({ error:'', isLoading: false})
  const [client, setClient] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    service: "",
    message: "",
  });

  function clearForm() {
    setClient({
      fullName: "",
      emailAddress: "",
      phoneNumber: "",
      service: "",
      message: "",
    });
  }
  const disableBTN = client.message.length < 10 || fetchState.isLoading
  async function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    setFetchState({error:'', isLoading: true})
    try{
      const { data } = await axios.post(appContext?.baseUrl + '/api/v2/messages/create', client)
 console.log(data);
 
    
    const { success, message } = data
   
    if(success){
      setFetchState({ error:'', isLoading: false })
      toast.success(message);
      clearForm()
     return setTimeout(() => appContext?.navigate('/'), 1000)
    }
    
    setFetchState({ error: data.error, isLoading: false })
    }
    catch(ex: unknown){
      if(ex instanceof Error){
        toast.error(ex.message)
      }
      if(ex instanceof AxiosError){
        toast.error(ex.response?.data.message)
      }
      
    }
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      className=" shadow-accent/20 shadow-lg p-8 lg:px-12 w-sm mb-8 lg:w-105 border border-pink-400/50 rounded-lg bg-black mx-auto md:mx-0"
    >
      <div className="mb-8 ">
        <Logo logoSize="size-8" textSize="heading4" />
        <p className="">Please send your message using the form below </p>
      </div>
      <div>
        <label htmlFor="fullName" className="p-1">
          Full name
        </label>
        <div className="border border-pink-50/50 mt-1 rounded-lg flex items-center px-4 gap-3 py-3 mb-4">
         <img src={person} width={25} alt=" person icon" aria-label="person icon" />
          <input
            type="text"
            id="firsttName"
            value={client.fullName}
            autoComplete="name"
            required
            minLength={3}
            maxLength={30}
            onChange={(e) => setClient({ ...client, fullName: e.target.value })}
            placeholder="Mary Jones"
            className=" outline-none w-full bg-transparent border-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="EmailAddress" className="p-1">
          Email address
        </label>
        <div className="border border-pink-50/50 mt-1 rounded-lg flex items-center px-4 gap-3 py-3 mb-4">
          <img src={email} width={25} alt="" />
          <input
            type="email"
            id="EmailAddress"
            autoComplete="email"
            required
            minLength={10}
            maxLength={30}
            value={client.emailAddress}
            className=" outline-none w-full bg-transparent border-none"
            onChange={(e) =>
              setClient({ ...client, emailAddress: e.target.value })
            }
            placeholder="example@email.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="PhoneNumber" className="p-1">
          Phone number
        </label>
        <div className="border border-pink-50/50 mt-1 px-4 rounded-lg flex items-center gap-3 py-3 mb-4">
          <img src={call} width={25} alt=" call icon" aria-label="phone icon" />
          <input
            type="tel"
            id="phoneNumber"
            value={client.phoneNumber}
            className=" w-full outline-none  bg-transparent border-none"
            autoComplete="phone"
            minLength={9}
            maxLength={15}
            onChange={(e) =>
              setClient({ ...client, phoneNumber: e.target.value })
            }
            placeholder="+237 674 144 233"
          />
        </div>
      </div>
      <div className=" ">
        <label htmlFor="services" className="p-1">
          Select service
        </label>
        <select
          className="border  cursor-pointer border-pink-50/50 mt-1  shadow w-full rounded-lg  py-3 px-3  mb-4 "
          id="services"
          value={client.service}
          required
          onChange={(e) => setClient({ ...client, service: e.target.value })}
        >
          <option value="" className="opacity-40">
            Choose Service
          </option>
          <option value="branding">Branding</option>
          <option value="website">Web App/ Website</option>
          <option value="ui/ux-design">UI/UX Design</option>
          <option value="mobile-app">Mobile App</option>
          <option value="ai-intergration">AI Intergration</option>
          <option value="seo">SEO</option>
          <option value="classes">Learning</option>
        </select>
        <div className="mt- ">
          <label htmlFor="client" className="p-1">
            Message
          </label>
          <textarea
            name="client"
            id="client"
            value={client.message}
            onChange={(e) => setClient({ ...client, message: e.target.value })}
            cols={30}
            rows={4}
            placeholder="Message "
            className="  
                w-full border border-pink-50/50 mt-1 rounded-lg px-3 py-2 "
          ></textarea>
        </div>
      </div>
      <div className="mt-8">
        <button
        type="submit"
        disabled={disableBTN}
         className=" rounded-lg  flex justify-center w-full p-3 bg-gradient-to-br from-pink-400 via-purple-400 to-pink-400 text-lg hover:opacity-80 text-white cursor-pointer trans">
          {
            fetchState.isLoading ? <span className="flex items-center gap-2 "> 
              <Spiner />
               Sending... </span> : 'Send message'
          }
        </button>
      </div>
      <p className="text-red-500 text-center min-h-10 mt-4">{fetchState.error}</p>
    </form>
  );
}

export default ContactForm;

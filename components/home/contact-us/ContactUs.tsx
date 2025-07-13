import Map from "./Map";
import { Link } from 'react-router-dom'

import { ContactCard } from "../../../conponents/exportComp";

function ContactUs() {
  return (
    <section
      className={`relative  bg-no-repeat bg-cover  rounded-lg  pt-5 py-10 mt-[var(--md-padding)]`}
    >
      <h2 className="absolute text-3xl top-8 left-1/2 -translate-x-[50%] text-center font-bold bg-gradient-to-r from-accent via-pink-400 mt-4 to-blue-400 bg-clip-text text-transparent montserrat ">
        CONTACT US
      </h2>
      <div className="  rounded-lg md:ml-8 shadow-sm  h-full md:max-w-1/2 gap-12 p-5 mt-24 ">
        <div className="flex flex-col gap-8 ">
          <ContactCard />
          <Map />
        </div>
      </div>
      <Link to='/contact-us' className="grid place-items-center">
        <button className=" border-2  font-bold montserrat px-8 mt-8 cursor-pointer hover:scale-105 trans py-3 rounded-lg">
          Contact Us
        </button>
      </Link>
    </section>
  );
}

export default ContactUs;

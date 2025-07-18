"use client";
import {
  whatsApp_logo,
  contactCard,
  location,
  call,
  email,
} from "@/assets/photos";
import Image from "next/image";
import { metaData } from "@/assets/data";

function ContactCard() {
  const {
    phone: phoneNumber,
    email: emailAddress,
    whatsApp: whatsAppNumber,
  } = metaData;

  const emailLink = `mailto:${emailAddress}?subject=${encodeURIComponent(
    contactCard.email.emailSubject
  )}&body=${encodeURIComponent(contactCard.email.emailBody)}`;
  const contactDetails = [
    {
      icon: location,
      type: "Address",
      details: "Douala Cameroon BP 12432",
    },
    {
      icon: location,
      type: "Address",
      details: "White Bear Lake, MN USA BP 23421",
    },
  ];
  function sendWhatsAppMessage() {
    const url = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(
      contactCard.whatsApp.whatsAppBody
    )}`;
    window.open(url, "blank");
  }
  return (
    <div className="shadow-accent/20 shadow-lg text-sm bg-black/20 border border-pink-400/50 backdrop:blur-md grid gap-1 lg:gap-2 p-8 lg:h-[270px] max-w-lg mx-auto  rounded-md grid-items-center">
      <button
        title="click to whatsApp"
        className=" px-3 text-start cursor-pointer text-pink-100 text-[16px] flex items-center gap-4.5 hover:bg-gray-200/10 hover:dark:bg-gray-800/50 trans rounded w-[300px] mb-1 hover:underline"
        onClick={sendWhatsAppMessage}
      >
        {" "}
        <Image src={whatsApp_logo} width={30} alt="./placeholder.png" />
        WhatsApp
      </button>
      <a
        href={`tel:${phoneNumber}`}
        title="click to call"
        className=" px-3 text-start cursor-pointer text-pink-100 text-[16px] flex items-center hover:bg-gray-200/10  trans rounded w-[300px] mb-1 gap-4 hover:underline"
      >
        {" "}
        <Image src={call} width={30} alt="./placeholder.png" />
        +237 672 640 914
      </a>
      <a
        href={emailLink}
        title="click to call"
        className=" px-3 text-start cursor-pointer text-pink-100 text-[16px] flex items-center hover:bg-gray-200/10  trans rounded w-[300px] gap-4.5 mb-1.5 hover:underline"
      >
        <Image src={email} width={30} alt="./placeholder.png" />
        {emailAddress}
        
      </a>
      {contactDetails.map((contact, index) => {
        return (
          <div
            key={index}
            className="flex px-3 gap-4 hover:bg-gray-200/10 trans rounded w-[350px]"
          >
            <Image src={contact.icon} width={30} alt="./placeholder.png" />
            <div
              className="cursor-pointer lg:hover:underline w-full trans "
              title={`Click to copy ${contact.details}`}
              onClick={() => navigator.clipboard.writeText(contact.details)}
            >
              <p className={` sr-only paragraph1`}>{contact.type}</p>
              <p className="text-[16px] text-pink-100 text-nowrap ">
                {contact.details}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ContactCard;

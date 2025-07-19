// components/WhatsAppButton.tsx
"use client";
import { green_whatsApp } from "@/assets/photos";
import Image from "next/image";
import { metaData } from "@/assets/data";

const WhatsAppButton = () => {


  const whatsappLink = `https://wa.me/${metaData.whatsApp}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      title="Message us on whatsApp"
      className="fixed bottom-4 right-4 z-50 bg-green-600/20 text-white p-2 rounded-full shadow-lg hover:bg-green-600/40 transition-all"
    >
     <Image
     src={green_whatsApp}
     width={48}
     height={48}
     alt="./placeholder.png"
     />
    </a>
  );
};

export default WhatsAppButton;

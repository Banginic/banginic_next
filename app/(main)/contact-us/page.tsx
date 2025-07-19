import { ContactCard, ContactForm, Map } from "@/components/exportComp";


function Contact() {
  return (
    <div
      className="min-h-screen max-w-7xl mx-auto"
    >
      <h1 className="text-2xl md:text-2xl font-bold bg-gradient-to-r from-accent via-pink-400 to-blue-400 bg-clip-text text-transparent montserrat text-center">
        CONTACT US
      </h1>
      <p className="text-lg text-pink-50/60 text-center">
        We appreciate your interest in our services
      </p>
      <div className="flex flex-col justify-around md:flex-row mt-12 2xl:mt-16 2xl:px-30 items-cent">
        <div className=" flex flex-col gap-10 lg:gap-19 mb-8 lg:md:w-125 px-4">
          <ContactCard />
          <Map />
        </div>
        <ContactForm />
      </div>
    </div>
  );
}

export default Contact;

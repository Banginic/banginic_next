import { whatsApp_logo, contactCard, location, call, email} from "../assets/assets";

function ContactCard() {
  const phoneNumber = import.meta.env.VITE_PHONE_NUMBER;
  const emailAddress = import.meta.env.VITE_EMAIL_ADDRESS;

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
    const whatsAppNumber = import.meta.env.VITE_WHATSAPP_NUMBER;

    const url = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(
      contactCard.whatsApp.whatsAppBody
    )}`;
    window.open(url, "blank");
  }
  return (
    <div className="shadow-accent/20 shadow-lg text-sm bg-black/20 border border-pink-400/50 backdrop:blur-md grid gap-1 lg:gap-2 p-8 lg:h-[270px] max-w-150 rounded-md grid-items-center">
      <button
        title="click to whatsApp"
        className=" px-3 text-start cursor-pointer text-pink-100 text-[16px] flex items-center gap-4.5 hover:bg-gray-200/10 hover:dark:bg-gray-800/50 trans rounded w-[300px] mb-1 hover:underline"
        onClick={sendWhatsAppMessage}
      >
        {" "}
        <img src={whatsApp_logo} width={30} alt="" />
        WhatsApp
      </button>
      <a
        href={`tel:${phoneNumber}`}
        title="click to call"
        className=" px-3 text-start cursor-pointer text-pink-100 text-[16px] flex items-center hover:bg-gray-200/10  trans rounded w-[300px] mb-1 gap-4 hover:underline"
      >
        {" "}
       <img src={call} width={30} alt="" />
        +237 672 640 914
      </a>
      <a
        href={emailLink}
        title="click to call"
        className=" px-3 text-start cursor-pointer text-pink-100 text-[16px] flex items-center hover:bg-gray-200/10  trans rounded w-[300px] gap-4.5 mb-1.5 hover:underline"
      >
        <img src={email} width={30} alt="" />
        {emailAddress}
      </a>
      {contactDetails.map((contact, index) => {
        return (
          <div key={index} className="flex px-3 gap-4 hover:bg-gray-200/10 trans rounded w-[350px]">
            <img src={contact.icon} width={30} alt="" />
            <div
              className="cursor-pointer lg:hover:underline w-full trans "
              title={`Click to copy ${contact.details}`}
              onClick={() => navigator.clipboard.writeText(contact.details)}
            >
              <p className={` sr-only paragraph1`}>{contact.type}</p>
              <p className="text-[16px] text-pink-100  ">{contact.details}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ContactCard;

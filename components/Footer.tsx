import { Link } from "react-router-dom";
import { socialMediaLinks, footLinks, metaData } from "../assets/assets";
import { SocialLinks, Logo, NewsletterForm } from "./exportComp";

function Footer() {
  return (
    <section 
    id="footer"
    className=" rounded-t-xl lg:w-[95%] mx-auto  bg-black px-5 pt-10 boder-t-2">
      <div className="flex flex-col md:flex-row gap-10 md:justify-around pb-10">
        <div className="flex flex-col gap-5  ">
          <Logo textSize="font-bold text-3xl lg:text-4xl" logoSize="size-10 " />
          <SocialLinks links={socialMediaLinks} />
          <article className="my-5 flex flex-col gap-2 ">
            {footLinks.map((link, index) => (
              <Link
                key={index}
                to={link.pathname}
                className="opacity-80 hover:underline text-pink-100"
              >
                {link.name}
              </Link>
            ))}
          </article>
        </div>

        <div>
          <h2 className="p-2 text-sm text-pink-100">
            SUBSCRIBE TO OUR NEWS LETTER AND GET INFORM
          </h2>
          <NewsletterForm />
        </div>
      </div>
      <hr className="w-4/5 mx-auto border border-gray-700" />
      
      <p className=" text-center p-4  text-sm opacity-80">© {new Date().getFullYear()} {metaData.name}. All rights reserved.</p>
    </section>
  );
}

export default Footer;

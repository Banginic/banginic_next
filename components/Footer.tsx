import Link from "next/link";
import { socialMediaLinks, footLinks, metaData } from "@/assets/data";
import { SocialLinks, Logo, NewsletterForm } from "./exportComp";

function Footer() {
  return (
    <footer 
    id="footer"
    className="mx-auto text-pink-50 bg-black px-5 pt-10 boder-t-2">
      <div className="flex flex-col md:flex-row gap-10 md:justify-around pb-10">
        <div className="flex flex-col gap-5  ">
          <Logo textSize="font-bold text-3xl lg:text-4xl" logoSize={45} />
          <SocialLinks links={socialMediaLinks} />
          <article className="my-5 flex flex-col gap-2 ">
            {footLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="opacity-80 hover:underline text-pink-100"
              >
                {link.label}
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
      
      <p className=" text-center p-4  text-sm opacity-80">© {new Date().getFullYear()} {metaData.title}. All rights reserved.</p>
    </footer>
  );
}

export default Footer;

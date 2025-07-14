import Link from "next/link";
import { vision } from "@/assets/photos";
import { metaData } from "@/assets/data";

import Image from "next/image";

function AboutUs() {
  return (
    <section
      className={` p-5 overflow-hidden flex flex-col md:flex-row items-center lg:min-h-[400px] rounded-lg gap-10 `}
    >
      <div className=" h-[250px] md:h-[300px] md:min-w-[350px] lg:min-w-[500px]  overflow-hidden ">
        <Image
          className="w-full h-full object-cover  rounded-lg "
          alt={"./placeholder.png"}
          width={300}
          src={vision}
        />
      </div>

      <div className=" flex flex-col justify-center shadow-lg md:min-h-[400px] lg:min-h-[350px] bg-black/30 backdrop:blur-lg p-5 lg:px-8 py-10 mb-7 rounded-lg ">
        <h3 className="flex flex-col gap-1 mb-3">
          <span className="text-3xl font-bold text-pink-300 montserrat">
            {metaData.title}
          </span>
          <span className="heading4 text-accent">MORE THAN JUST A NAME</span>
        </h3>
        <p className="text-lg opacity-80">
          where innovation meets excellence in software development. We are a
          passionate team of developers, designers, and problem-solvers
          dedicated to crafting high-quality, tailored solutions that empower
          businesses and organizations to thrive in the digital world.
        </p>
        <Link href="/about-us">
          <button
            title="Go to about page"
            className="py-3 border shadow-accent/20 hover:shadow-lg bEmplorder-black text-sm dark:border-white shadow-sm px-6 mt-9 my-4 round-md lg:text-lg trans
           hover:opacity-80 rounded-lg cursor-pointer hover:bg-black/50"
          >
            Read more about us
          </button>
        </Link>
      </div>
    </section>
  );
}

export default AboutUs;

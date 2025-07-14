import { partners } from "@/assets/data";
import Image from "next/image";

function Partners() {
  return (
    <section
      className={` mt-24 lg:mt-[var(--lg-margin)] w-full relative rounded-md z-5 py-10 grid shadow-md place-items-cente `}
    >
      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent via-pink-400 mt-4 to-blue-400 bg-clip-text text-transparent montserratpy-[var(--sm-padding)] pb-[var(--md-padding)] text-center montserrat">
        TURSTED BY
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 content-center place-items-center">
        {partners.map((partner, index) => {
          return (
            <div
              key={index}
              className="grid place-items-center opacity-50 gap-9 p-2 h-52 w-52 rounded-md overflow-hidden "
            >
              <Image
                className=" w-[50%] h-[50% ] opacity-80 mx-auto"
                alt={"./placeholder.png"}
                src={partner.img}
                width={300}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Partners;

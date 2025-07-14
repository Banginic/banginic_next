
import styles from "./home.module.css";
import { BgAnimation, CTAHero } from "./exportHome";
import Image from "next/image";
import { hero_image } from "@/assets/photos";


function Hero() {
  return (
    <div
      className={`h-screen flex overflow-hidden flex-col md:flex-row ${styles.translate} sm:pt-[5rem] p-2 lg:pt-0 items-center md:items-start lg:px-14 2xl:pt-[5rem]`}
    >
      <div className=" grid  lg:w-[70%] text-3xl px-10">
        <h1
          
          className="mt-2 montserrat md:mt-0 text-[2.5rem] md:text-5xl lg:text-5xl 2xl:text-6xl font-bold bg-gradient-to-r from-accent via-pink-400 to-blue-400 bg-clip-text text-transparent w- z-10   title-image "
        >
         
            Building Bold Digital Experiences That Work Everywhere.
        
        </h1>

        <div className=" md:w-[70%] lg:w-[80%] mt-4 md:static top-24  md:px-0 z-10 ">
          <p
           
            className={` text-lg  text-left mb-10 md:italics  ${styles.translate} text-pink-100/60 `}
          >
            We build scalable, speedy, stylish and custom web solutions that last for ever. We
            turn your ideas into high-performing web applications.
          </p>
          <div
           
          >
            <CTAHero />
          </div>
        </div>
      </div>
      <div
        
        className={`w-[320px] absolute md:static  h-[400px] md:w-[600px] md:h-[300px] lg:h-[500px] lg:w-[500px] 
         md:opacity-85  m-auto md:m-0 top-[38rem] lg:mt-10 right-10 trans
      hover:border-purple-800`}
      >
        <Image
          className="lg:pl-14 md:static right-0 w-[350px] md:w-[600px] borde lg:h-[400px] 2xl:h-[450px] 2xl:w-[650px]"
          alt={'./placeholder.png'}
          src={hero_image}
          width={350}
          height={350}
        />
      </div>

      <BgAnimation />
    </div>
  );
}

export default Hero;

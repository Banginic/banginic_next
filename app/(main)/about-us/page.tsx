
// import { Employees } from "@/components/exportComp";

function AboutUs() {
  return (
    <section
      className=" px-5 2xl:px-20 min-h- pb-[3rem] "
    >
      <h1 className="text-4xl text-center md:text-5xl font-bold bg-gradient-to-r from-accent  via-pink-400 to-blue-400 bg-clip-text text-transparent montserrat">
        ABOUT US
      </h1>
      <p className="text-center text-[18px] mt-1 text-pink-50/80 ">
        Driven by Passion. Built on Code. Focused on You.
      </p>
      <div className="flex flex-col lg:flex-row  my-12 mx-auto ">
        <div className="lg:w-1/2 p-6 lg:p-8  shadow-accent/30 border border-pink-400/50 shadow-2xl backdrop-blur-sm bg-black/30 rounded-xl">
          <h2 className="text-2xl lg:text-3xl text-pink-100 font-bold mb-2">
            Who Are We
          </h2>
          <p className="text-[18px] text-gray-300  text-start ">
            We are passionate about crafting software solutions that transform
            ideas into reality. Our team of skilled developers, designers, and
            problem-solvers work together to create seamless digital
            experiences. .
          </p>
          <div className={` mx-auto mt-8`}>
            <h3 className="text-2xl lg:text-3xl text-pink-100 font-bold mb-2">
              Our Mission
            </h3>
            <p className=" text-[18px] text-gray-300 ">
              We craft high-quality, scalable software solutions tailored to
              your business needs. With a commitment to excellence and a passion
              for innovation, we help companies unlock their full potential
              through technology. Whether you're a startup or an enterprise,
              we're your trusted partner in digital transformation.
            </p>
          </div>
          <div className={` mx-auto mt-8`}>
            <h3 className="text-2xl lg:text-3xl text-pink-100 font-bold mb-2">What Sets Us Apart</h3>
            <ul className=" text-[18px] text-gray-300 ">
              <li>Client-first mindset</li>
              <li>Clean, maintainable code</li>
              <li>Attention to design and usability</li>
              <li>Transparent communication & reliable delivery</li>
            </ul>
          </div>
        </div>
        {/* <Employees /> */}
      </div>
    </section>
  );
}

export default AboutUs;

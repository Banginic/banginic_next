import { Hero, AboutUs, Counter, Services, Partners, Skills, ContactUs } from "@/components/home/exportHomeComp";

function MainPage() {
  return (
    <div className="2xl:px-[10rem]">
      <Hero />
      <div className="md:pt-7 lg:px-1">
        {/* <ColorLines /> */}
        <AboutUs />
        <Counter />
        <Services />
        <Partners />
        <Skills />
        {/* <Testimonials /> */}
        <ContactUs />
      </div>
    </div>
  );
}

export default MainPage;

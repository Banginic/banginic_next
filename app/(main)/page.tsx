import { Hero, AboutUs, Counter, Services, Partners, Skills, ContactUs, Testimonials } from "@/components/home/exportHomeComp";

function MainPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <Hero />
      <div className="md:pt-7 lg:px-1">
        {/* <ColorLines /> */}
        <AboutUs />
        <Counter />
        <Services />
        <Partners />
        <Skills />
        <Testimonials />
        <ContactUs />
      </div>
    </div>
  );
}

export default MainPage;

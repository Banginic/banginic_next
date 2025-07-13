
import {
  ContactUs,
  Skills,
  Testimonials,
  Services,
  RecentWorks,
  AboutUs,
  Partners,
  Counter,
  // ColorLines,
   Hero
   
} from "./exportHomeComp";


function Home() {


  return (
    <section
   
    >
      
      <Hero />
      <div className="md:pt-7 lg:px-1">
        {/* <ColorLines /> */}
        <AboutUs />
   
      </div>
      <Counter />
      <Services />
      <RecentWorks />
      <Partners />
      <Skills />
      <Testimonials />
      <ContactUs />
    </section>
  );
}

export default Home;

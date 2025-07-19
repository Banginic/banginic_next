import { Hero, AboutUs, Counter, Services, Partners, Skills, ContactUs, Testimonials } from "@/components/home/exportHomeComp";
import { WhatsAppButton} from '@/components/exportComp'

function MainPage() {
  return (
    <div className="max-w-7xl mx-auto relative">
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
      <WhatsAppButton />
    </div>
  );
}

export default MainPage;

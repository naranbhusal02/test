import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Salon from "../components/Salon";
import Cafe from "../components/Cafe";
import ManStore from "../components/ManStore";
import Academy from "../components/Academy";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { BookingWizard } from "../components/BookingWizard";

export default function Page() {
  return (
    <div className="min-h-screen bg-cream dark:bg-[#121212] transition-colors duration-500">
      <Navbar />
      <Hero />
      <About />
      <Salon />
      <Cafe />
      <ManStore />
      <Academy />
      <Testimonials />
      <Contact />
      <Footer />
      <BookingWizard />
    </div>
  );
}

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Salon from './components/Salon';
import Cafe from './components/Cafe';
import ManStore from './components/ManStore';
import Academy from './components/Academy';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
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
    </div>
  );
}

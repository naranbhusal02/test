"use client";

import { Scissors } from "lucide-react";
import { useBooking } from "./BookingWizard";

const services = [
  {
    name: "Classic Haircut",
    desc: "Precision cut tailored to your face shape, including washing, conditioning, and style finish.",
    img: "https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Signature Beard Trim",
    desc: "Expert beard shaping, razor outlining, and beard wash with soothing conditioning balms.",
    img: "https://images.pexels.com/photos/897262/pexels-photo-897262.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Hot Towel Shave",
    desc: "A traditional straight-razor shave with pre-shave oil, warm lather, and chilled post-shave balm.",
    img: "https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export default function Salon() {
  const { openBooking } = useBooking();

  return (
    <section id="salon" className="bg-[#f5f5f5] dark:bg-[#0f0f0f] py-24 lg:py-30 relative overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 mb-16 border-b border-charcoal/10 dark:border-white/10 pb-6 transition-colors duration-500">
          <div>
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-8 h-px bg-charcoal/30 dark:bg-white/30 transition-colors duration-500" />
              <span className="text-charcoal/60 dark:text-cream/60 text-xs tracking-[0.5em] uppercase font-sans font-semibold transition-colors duration-500">
                Barbering & Grooming
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-charcoal-dark dark:text-cream font-light leading-tight transition-colors duration-500">
              The Salon
              <span className="block italic text-gold-dark font-serif font-light mt-1">Grooming Offerings</span>
            </h2>
          </div>
          <p className="text-charcoal/70 dark:text-cream/70 font-sans text-xs sm:text-sm max-w-sm leading-relaxed tracking-wider uppercase lg:text-right transition-colors duration-500">
            Every appointment is a curated ritual. Our master barbers blend timeless razor techniques with modern styling.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s) => (
            <div
              key={s.name}
              className="group relative overflow-hidden bg-white dark:bg-[#181818] rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.02)] dark:shadow-[0_2px_15px_rgba(0,0,0,0.2)] transition-all duration-500 flex flex-col h-full border border-charcoal/5 dark:border-white/5"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={s.img}
                  alt={s.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* Service Details */}
              <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-xl text-charcoal-dark dark:text-cream font-light tracking-wide transition-colors duration-500">
                      {s.name}
                    </h3>
                    <Scissors className="text-gold-dark/40 w-4 h-4 mt-1 flex-shrink-0" />
                  </div>
                  <p className="text-charcoal/60 dark:text-cream/60 text-xs sm:text-sm leading-relaxed font-sans tracking-wide transition-colors duration-500">
                    {s.desc}
                  </p>
                </div>

                <button
                  onClick={() => openBooking("Salon", s.name)}
                  className="w-full py-2.5 bg-charcoal-dark dark:bg-gold text-white dark:text-[#121212] hover:bg-gold-dark dark:hover:bg-gold-light transition-colors duration-300 font-sans text-[10px] tracking-widest font-semibold uppercase rounded-md border border-transparent"
                >
                  Reserve Appointment
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

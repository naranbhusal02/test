"use client";

import { useBooking } from "./BookingWizard";

const menuItems = [
  {
    name: "GR Signature Blend",
    desc: "Our house espresso — rich, balanced, with notes of dark chocolate, roasted almond, and cherry.",
  },
  {
    name: "Cold Brew Reserve",
    desc: "18-hour cold-steeped single origin Ethiopian beans, served over hand-cut crystal clear ice.",
  },
  {
    name: "Earl Grey Bergamot",
    desc: "High-grown Ceylon black tea infused with natural Italian bergamot and blue cornflower petals.",
  },
  {
    name: "Almond Croissant",
    desc: "Twice-baked buttery frangipane croissant, topped with toasted sliced almonds. Baked fresh daily.",
  },
];

export default function Cafe() {
  const { openBooking } = useBooking();

  return (
    <section id="cafe" className="bg-cream dark:bg-[#121212] py-24 lg:py-30 relative overflow-hidden transition-colors duration-500">
      
      {/* Background texture & soft gradient overlays */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay">
        <img
          src="https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cream to-transparent dark:from-[#121212] transition-colors duration-500 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cream to-transparent dark:from-[#121212] transition-colors duration-500 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-10 z-10">
        
        {/* Header */}
        <div className="text-center mb-16 pb-6 border-b border-gold/10 transition-colors duration-500">
          <span className="inline-block text-gold/60 text-xs tracking-[0.5em] uppercase font-sans font-semibold mb-3">
            Lounge & Menu
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-charcoal-dark dark:text-cream font-light leading-tight transition-colors duration-500">
            The Cafe <span className="italic text-gold font-serif font-light">& Lounge Highlights</span>
          </h2>
          <p className="text-charcoal-dark/50 dark:text-cream/50 font-sans text-xs tracking-wider max-w-md mx-auto leading-relaxed mt-4 transition-colors duration-500">
            Savor hand-roasted espresso, gourmet specialty teas, and freshly prepared bites in a relaxed business setting.
          </p>
        </div>

        {/* Simplified Menu List */}
        <div className="space-y-6">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className="p-5 rounded-xl border border-gold/5 bg-white/50 dark:bg-[#181818]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-gold/25 transition-all duration-300"
            >
              <div className="max-w-xl">
                <h3 className="font-serif text-lg text-charcoal-dark dark:text-cream font-light tracking-wide transition-colors duration-500">
                  {item.name}
                </h3>
                <p className="text-charcoal-dark/50 dark:text-cream/50 text-[11px] sm:text-xs leading-relaxed font-sans tracking-wide mt-1 transition-colors duration-500">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Cafe Reserve Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => openBooking("Cafe", "Business Lounge Table")}
            className="px-8 py-3.5 border border-gold/30 text-gold text-[10px] tracking-[0.2em] uppercase font-sans font-semibold hover:bg-gold hover:text-[#121212] transition-all duration-300"
          >
            Reserve a Lounge Table
          </button>
        </div>

      </div>
    </section>
  );
}

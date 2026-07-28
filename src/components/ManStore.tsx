"use client";

import { useBooking } from "./BookingWizard";

const products = [
  {
    name: "Signature Beard Oil",
    desc: "A nourishing botanical blend of argan, jojoba, and sandalwood oils to condition beard hair.",
    img: "https://store.almanac.com/cdn/shop/files/Beard-3__81259.1737051234.1280.1280.jpg?v=1747862635&width=1214",
    tag: "Bestseller",
  },
  {
    name: "Premium Clay Pomade",
    desc: "Strong, pliable, matte-finish clay providing full style structure and volume without heavy residue.",
    img: "https://brosh.jp/cdn/shop/files/preview_images/fad76e9d3b484cb39da880a95b7c53fd.thumbnail.0000000000.jpg?v=1772167330&width=1946",
    tag: "Core Essential",
  },
  {
    name: "Wool Blend Tailored Blazer",
    desc: "Half-canvased, structured Italian wool blazer offering natural comfort and sharp detailing.",
    img: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600",
    tag: "Signature Style",
  },
];

export default function ManStore() {
  const { openBooking } = useBooking();

  return (
    <section id="store" className="bg-[#f5f5f5] dark:bg-[#0f0f0f] py-24 lg:py-30 relative overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 mb-16 pb-6 border-b border-charcoal/10 dark:border-white/10 transition-colors duration-500">
          <div>
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-8 h-px bg-charcoal/30 dark:bg-white/30 transition-colors duration-500" />
              <span className="text-charcoal/60 dark:text-cream/60 text-xs tracking-[0.5em] uppercase font-sans font-semibold transition-colors duration-500">
                Curated Catalog
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-charcoal-dark dark:text-cream font-light leading-tight transition-colors duration-500">
              Man Store
              <span className="block italic text-gold-dark font-serif font-light mt-1">Lifestyle Essentials</span>
            </h2>
          </div>
          <p className="text-charcoal/70 dark:text-cream/70 font-sans text-xs sm:text-sm max-w-sm leading-relaxed tracking-wider uppercase transition-colors duration-500">
            A selective collection of high-end styling garments, leather goods, and premium grooming products.
          </p>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((item) => (
            <div 
              key={item.name} 
              className="group relative bg-white dark:bg-[#181818] border border-charcoal/5 dark:border-white/5 rounded-xl overflow-hidden shadow-[0_2px_15px_rgba(0,0,0,0.02)] dark:shadow-[0_2px_15px_rgba(0,0,0,0.2)] transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Image Area */}
                <div className="relative h-64 overflow-hidden bg-charcoal/5 dark:bg-white/5">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
                  />
                  
                  {/* Tag Overlay */}
                  {item.tag && (
                    <span className="absolute top-4 left-4 bg-charcoal-dark dark:bg-[#121212] text-gold text-[8px] tracking-[0.25em] uppercase px-2 py-1 rounded font-sans font-semibold border border-gold/15">
                      {item.tag}
                    </span>
                  )}
                </div>

                {/* Text Area */}
                <div className="p-6">
                  <h4 className="font-serif text-xl text-charcoal-dark dark:text-cream font-light tracking-wide mb-1.5 transition-colors duration-500">
                    {item.name}
                  </h4>
                  <p className="text-charcoal/60 dark:text-cream/60 text-xs sm:text-sm leading-relaxed font-sans tracking-wide transition-colors duration-500">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Store CTA Actions */}
        <div className="mt-16 text-center">
          <button
            onClick={() => openBooking("Man Store", "Bespoke Tailoring Consult")}
            className="px-8 py-3.5 bg-charcoal-dark dark:bg-gold text-white dark:text-[#121212] text-[10px] tracking-[0.2em] uppercase font-sans font-semibold hover:bg-gold-dark dark:hover:bg-gold-light transition-colors duration-300"
          >
            Book Personal Styling Consultation
          </button>
        </div>

      </div>
    </section>
  );
}

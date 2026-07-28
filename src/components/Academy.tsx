"use client";

import { useBooking } from "./BookingWizard";

const programs = [
  {
    title: "Leadership Mastery",
    category: "Professional Development",
    desc: "Build commanding presence, sharpen decision-making, and develop the communication skills that define great leaders.",
    img: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: true,
  },
  {
    title: "Personal Brand & Style",
    category: "Image Consulting",
    desc: "Craft a visual identity that communicates confidence, authority, and authenticity in every room you enter.",
    img: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800",
    featured: false,
  },
];

export default function Academy() {
  const { openBooking } = useBooking();

  return (
    <section id="academy" className="bg-cream dark:bg-[#121212] py-24 lg:py-30 relative overflow-hidden transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-6 lg:px-10 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 pb-6 border-b border-gold/10 transition-colors duration-500">
          <span className="inline-block text-gold/60 text-xs tracking-[0.5em] uppercase font-sans font-semibold mb-3">
            Mentorship & Development
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-charcoal-dark dark:text-cream font-light leading-tight transition-colors duration-500">
            The Academy <span className="italic text-gold font-serif font-light">& Cohorts</span>
          </h2>
          <p className="text-charcoal-dark/50 dark:text-cream/50 font-sans text-xs tracking-wider max-w-md mx-auto leading-relaxed mt-4 transition-colors duration-500">
            Elevate your personal and professional capabilities. Selective cohorts taught by industry specialists.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((p) => (
            <div
              key={p.title}
              className={`group relative overflow-hidden rounded-xl border bg-white dark:bg-[#1c1c1c]/40 flex flex-col justify-between ${
                p.featured
                  ? "border-gold/30 hover:border-gold/60"
                  : "border-charcoal/5 dark:border-white/5 hover:border-gold/20"
              } transition-all duration-500 shadow-sm dark:shadow-none`}
            >
              <div>
                {/* Course Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-[1000ms] group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/30 dark:from-[#121212] dark:via-[#121212]/30 transition-colors duration-500" />
                  
                  {p.featured && (
                    <span className="absolute top-4 right-4 bg-gold text-charcoal-dark text-[8px] tracking-[0.2em] uppercase px-2 py-1 rounded font-sans font-semibold">
                      Featured
                    </span>
                  )}
                </div>

                {/* Course Metadata */}
                <div className="p-6">
                  <span className="text-gold/80 text-[8px] tracking-[0.3em] uppercase font-sans font-semibold">
                    {p.category}
                  </span>
                  <h3 className="font-serif text-xl text-charcoal-dark dark:text-cream font-light mt-2 mb-3 transition-colors duration-500">
                    {p.title}
                  </h3>
                  <p className="text-charcoal-dark/60 dark:text-cream/60 text-xs leading-relaxed font-sans tracking-wide mb-6 transition-colors duration-500">
                    {p.desc}
                  </p>

                  <button
                    onClick={() => openBooking("Academy", p.title + " cohort")}
                    className="w-full py-2.5 bg-transparent border border-gold/30 hover:bg-gold hover:text-[#121212] transition-all duration-300 font-sans text-[10px] tracking-widest font-semibold uppercase text-gold rounded-md"
                  >
                    Enroll in Cohort
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

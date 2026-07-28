"use client";

import { Scissors, Coffee, ShoppingBag, GraduationCap } from "lucide-react";

const pillars = [
  {
    icon: Scissors,
    title: "Salon",
    subtitle: "Precision Cuts",
    desc: "Expert barbers dedicated to cuts, clean shaves, and grooming tailored for the modern man.",
    href: "#salon",
    img: "https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    icon: Coffee,
    title: "Cafe",
    subtitle: "Relax & Connect",
    desc: "A welcoming lounge space to unwind, connect, and enjoy signature specialty brews.",
    href: "#cafe",
    img: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    icon: ShoppingBag,
    title: "Man Store",
    subtitle: "Style Essentials",
    desc: "Curated styling wear, heritage accessories, and professional grooming apothecary.",
    href: "#store",
    img: "https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    icon: GraduationCap,
    title: "Academy",
    subtitle: "Grow & Lead",
    desc: "Transformative personal development cohorts designed to build social intelligence and success.",
    href: "#academy",
    img: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export default function About() {
  return (
    <section id="about" className="bg-cream dark:bg-[#121212] py-24 lg:py-32 relative overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <span className="inline-block text-gold/70 text-xs tracking-[0.5em] uppercase font-sans mb-4 font-medium">
            Our Ecosystem
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-charcoal-dark dark:text-cream font-light leading-tight transition-colors duration-500">
            Four Pillars of the
            <span className="block italic text-gold font-light mt-1 font-serif">Gentleman's Lifestyle</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-10 bg-gold/25" />
            <div className="w-1 h-1 rounded-full bg-gold/50" />
            <div className="h-px w-10 bg-gold/25" />
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <a
                key={p.title}
                href={p.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(p.href)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative h-80 overflow-hidden rounded-xl border border-gold/15 bg-white dark:bg-[#181818] hover:border-gold/40 transition-all duration-500 hover:shadow-lg flex flex-col justify-end p-5"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/50 dark:from-[#121212] dark:via-[#121212]/50 to-transparent transition-colors duration-500" />
                  <div className="absolute inset-0 bg-black/10 dark:bg-black/40 group-hover:bg-black/25 transition-all duration-300" />
                </div>

                {/* Content Details */}
                <div className="relative z-10">
                  <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-4">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-gold/80 text-[8px] tracking-[0.2em] uppercase font-sans font-semibold">
                    {p.subtitle}
                  </span>
                  <h3 className="font-serif text-xl text-charcoal-dark dark:text-cream font-light mt-1 mb-2 transition-colors duration-500">
                    {p.title}
                  </h3>
                  <p className="text-charcoal-dark/60 dark:text-cream/60 text-[10px] sm:text-xs leading-relaxed font-sans tracking-wide transition-colors duration-500">
                    {p.desc}
                  </p>
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}

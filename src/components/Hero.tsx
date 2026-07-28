"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const onScroll = () => {
      const y = window.scrollY;
      el.style.transform = `translateY(${y * 0.3}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden flex items-center justify-center bg-cream dark:bg-[#121212] transition-colors duration-500">
      {/* Background with Parallax and Soft Luxury Overlay */}
      <div ref={videoRef} className="absolute inset-0 will-change-transform scale-105">
        <img
          src="https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Premium Gentlemen's Room space"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-cream dark:from-black/80 dark:via-black/40 dark:to-[#121212] transition-colors duration-500" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Simple Text Logo */}
        <span className="text-gold text-[10px] tracking-[0.5em] uppercase font-sans font-semibold mb-6 block">
          EST. 2024
        </span>

        {/* Minimalist Headline */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl text-charcoal-dark dark:text-cream font-light leading-none tracking-tight mb-8 transition-colors duration-500">
          Crafting
          <span className="block italic text-gold font-light mt-1 font-serif">Confidence</span>
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-charcoal-dark/70 dark:text-cream/70 text-sm md:text-base tracking-widest max-w-xl mx-auto mb-12 uppercase leading-relaxed transition-colors duration-500">
          A sanctuary of grooming, style, and refinement for the modern gentleman.
        </p>

        {/* Exploration Trigger Button */}
        <button
          onClick={() =>
            document
              .querySelector("#about")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="px-12 py-4 bg-gold text-[#121212] text-[11px] tracking-[0.3em] uppercase font-sans font-semibold hover:bg-gold-light transition-all duration-300 shadow-md hover:-translate-y-0.5"
        >
          Explore Services
        </button>
      </div>

      {/* Downward Arrow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 z-10 cursor-pointer"
        onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <ChevronDown className="text-gold/60 w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}

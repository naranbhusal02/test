"use client";

import { Quote } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="bg-[#121212] py-24 lg:py-30 relative overflow-hidden">
      
      {/* Decorative glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gold/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center z-10">
        
        {/* Testimonial Block */}
        <div className="relative flex flex-col items-center justify-center bg-[#1c1c1c]/30 border border-gold/15 backdrop-blur-md rounded-2xl p-8 md:p-14 shadow-md">
          <Quote className="text-gold/15 w-12 h-12 mb-6 flex-shrink-0" />

          <blockquote className="font-serif text-xl md:text-2xl text-cream/90 font-light italic leading-relaxed mb-8 max-w-2xl">
            "The Salon team are absolute masters of their craft. They don't simply cut hair — they dissect your style and structure the perfect look. I have never felt more confident presenting in our corporate boardrooms."
          </blockquote>

          {/* User Details */}
          <div className="flex items-center gap-3">
            <img
              src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100"
              alt="Marcus Webb"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-gold/40"
            />
            <div className="text-left">
              <p className="font-sans text-xs text-cream font-semibold tracking-wide">
                Marcus Webb
              </p>
              <p className="font-sans text-[8px] text-gold/70 tracking-[0.2em] uppercase font-semibold">
                Senior Executive
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

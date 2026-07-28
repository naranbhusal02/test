"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";

const info = [
  {
    icon: MapPin,
    label: "Location",
    value: "Traffic Chowk, Butwal 32907, Nepal",
  },
  { icon: Phone, label: "Phone", value: "+977 9857073674" },
  { icon: Mail, label: "Email", value: "hello@gentlemensroom.com" },
  {
    icon: Clock,
    label: "Hours",
    value: "Sat–Thu: 10AM – 10PM\nFriday: 2PM – 11PM",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-white dark:bg-[#0f0f0f] py-24 lg:py-32 relative overflow-hidden transition-colors duration-500">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Contact info (5 cols) */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-8 h-px bg-charcoal/30 dark:bg-white/30 transition-colors duration-500" />
                <span className="text-charcoal/60 dark:text-cream/60 text-xs tracking-[0.5em] uppercase font-sans font-semibold transition-colors duration-500">
                  Get In Touch
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-charcoal-dark dark:text-cream font-light leading-tight transition-colors duration-500">
                Visit Our Studio
                <span className="block italic text-gold-dark font-serif font-light mt-1">Connect With Us</span>
              </h2>
            </div>

            {/* Direct Info List */}
            <div className="space-y-6">
              {info.map((item) => (
                <div key={item.label} className="flex gap-4">
                  <div className="w-9 h-9 border border-charcoal/10 dark:border-white/10 bg-[#f5f5f5] dark:bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-500">
                    <item.icon className="text-gold-dark w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-charcoal/45 dark:text-cream/45 text-[8px] tracking-[0.2em] uppercase font-sans block mb-0.5 font-bold transition-colors duration-500">
                      {item.label}
                    </span>
                    <p className="text-charcoal-dark/80 dark:text-cream/80 text-xs sm:text-sm font-sans leading-relaxed whitespace-pre-line transition-colors duration-500">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: MAP Block (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#181818] border border-charcoal/5 dark:border-white/5 rounded-2xl p-5 shadow-[0_2px_15px_rgba(0,0,0,0.02)] dark:shadow-none transition-colors duration-500">
            <div className="overflow-hidden border border-charcoal/10 dark:border-white/10 bg-[#f5f5f5] dark:bg-white/5 rounded-lg shadow-sm transition-colors duration-500">
              <iframe
                title="Gentlemen's Room location map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.471650812016!2d83.46460311020809!3d27.702720276085874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3996877243c3c8f9%3A0xb3c299af3bddf285!2sGentlemen&#39;s%20Room!5e0!3m2!1sen!2sjp!4v1781174564018!5m2!1sen!2sjp"
                className="h-[300px] w-full dark:invert-[0.85] dark:hue-rotate-180 transition-all duration-500"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-charcoal-dark/70 dark:text-cream/70 text-xs font-sans tracking-wide transition-colors duration-500">
                Traffic Chowk, Butwal, Nepal
              </p>
              <a
                href="https://maps.app.goo.gl/o54y8cyP4Rt9gUgS9"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center border border-charcoal/15 dark:border-white/15 hover:border-gold-dark px-3 py-2 rounded text-[9px] tracking-[0.2em] uppercase font-sans text-charcoal-dark dark:text-cream hover:text-gold-dark hover:bg-gold-dark/5 transition-all duration-300 font-semibold"
              >
                Open in Maps
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

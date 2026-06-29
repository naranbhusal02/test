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
    <section id="contact" className="bg-white py-24 lg:py-32 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Contact info (5 cols) */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-8 h-px bg-charcoal/30" />
                <span className="text-charcoal/60 text-xs tracking-[0.5em] uppercase font-sans font-semibold">
                  Get In Touch
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-charcoal-dark font-light leading-tight">
                Visit Our Studio
                <span className="block italic text-gold-dark font-serif font-light mt-1">Connect With Us</span>
              </h2>
            </div>

            {/* Direct Info List */}
            <div className="space-y-6">
              {info.map((item) => (
                <div key={item.label} className="flex gap-4">
                  <div className="w-9 h-9 border border-charcoal/10 bg-[#f5f5f5] rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="text-gold-dark w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-charcoal/45 text-[8px] tracking-[0.2em] uppercase font-sans block mb-0.5 font-bold">
                      {item.label}
                    </span>
                    <p className="text-charcoal-dark/80 text-xs sm:text-sm font-sans leading-relaxed whitespace-pre-line">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: MAP Block (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-charcoal/5 rounded-2xl p-5 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
            <div className="overflow-hidden border border-charcoal/10 bg-[#f5f5f5] rounded-lg shadow-sm">
              <iframe
                title="Gentlemen's Room location map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.471650812016!2d83.46460311020809!3d27.702720276085874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3996877243c3c8f9%3A0xb3c299af3bddf285!2sGentlemen&#39;s%20Room!5e0!3m2!1sen!2sjp!4v1781174564018!5m2!1sen!2sjp"
                className="h-[300px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-charcoal-dark/70 text-xs font-sans tracking-wide">
                Traffic Chowk, Butwal, Nepal
              </p>
              <a
                href="https://maps.app.goo.gl/o54y8cyP4Rt9gUgS9"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center border border-charcoal/15 hover:border-gold-dark px-3 py-2 rounded text-[9px] tracking-[0.2em] uppercase font-sans text-charcoal-dark hover:text-gold-dark hover:bg-gold-dark/5 transition-all duration-300 font-semibold"
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

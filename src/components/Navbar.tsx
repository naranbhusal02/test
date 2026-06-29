"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { useBooking } from "./BookingWizard";

const links = [
  { label: "Salon", href: "#salon" },
  { label: "Cafe", href: "#cafe" },
  { label: "Man Store", href: "#store" },
  { label: "Academy", href: "#academy" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { openBooking } = useBooking();

  // Scroll threshold detection for shrinking and background blur styling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll Spy Observer to track the section in viewport
  useEffect(() => {
    const sections = links.map((l) => document.querySelector(l.href));
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // Trigger when occupying the center of the viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          if (id) {
            setActiveSection(`#${id}`);
          }
        }
      });
    }, observerOptions);

    sections.forEach((sec) => {
      if (sec) observer.observe(sec);
    });

    // Handle Hero section scrolling up to reset active Section
    const onScrollTop = () => {
      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };
    window.addEventListener("scroll", onScrollTop, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScrollTop);
    };
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-500 py-4 px-4 sm:px-6 lg:px-8">
      {/* Floating Glassmorphic Container */}
      <div
        className={`mx-auto max-w-7xl rounded-full transition-all duration-500 px-6 lg:px-10 h-16 flex items-center justify-between ${
          scrolled
            ? "bg-[#181818]/85 backdrop-blur-lg border border-gold/15 shadow-[0_4px_30px_rgba(0,0,0,0.5)] scale-[0.98] sm:scale-100"
            : "bg-transparent border border-transparent"
        }`}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-3 group"
        >
          <img
            src="/logo.jpeg"
            alt="Gentlemen's Room"
            className="h-10 w-10 rounded-full object-cover ring-2 ring-gold/20 group-hover:ring-gold/60 transition-all duration-500"
          />
          <span className="hidden sm:block font-serif text-gold text-sm tracking-widest uppercase leading-none font-medium">
            Gentlemen's<br />
            <span className="text-[10px] tracking-[0.4em] text-gold/70 font-sans">Room</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className={`font-sans text-[11px] tracking-[0.2em] uppercase transition-all duration-300 relative group py-1.5 ${
                activeSection === l.href
                  ? "text-gold font-medium"
                  : "text-cream/70 hover:text-gold"
              }`}
            >
              {l.label}
              <span
                className={`absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-300 ${
                  activeSection === l.href ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
        </nav>

        {/* Book Now Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => openBooking()}
            className="hidden sm:flex px-5 py-2 border border-gold text-gold text-[10px] tracking-[0.2em] uppercase font-sans font-semibold hover:bg-gold hover:text-[#121212] transition-all duration-300 items-center gap-1.5"
          >
            <Sparkles size={11} />
            Book Now
          </button>

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden text-cream/80 hover:text-gold transition-colors p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={`md:hidden absolute top-20 left-4 right-4 bg-[#181818]/95 backdrop-blur-xl border border-gold/15 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-500 overflow-hidden ${
          open ? "max-h-96 opacity-100 py-6" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col px-6 gap-4">
          {links.map((l, index) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              style={{ transitionDelay: `${index * 50}ms` }}
              className={`text-left font-sans text-xs tracking-[0.2em] uppercase py-1 border-b border-white/5 transition-all duration-300 ${
                open ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
              } ${
                activeSection === l.href ? "text-gold font-medium pl-2 border-gold/20" : "text-cream/70 hover:text-gold"
              }`}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              openBooking();
            }}
            className="w-full mt-2 py-3 bg-gold text-[#121212] text-xs tracking-[0.2em] uppercase font-sans font-semibold hover:bg-gold-light transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Sparkles size={12} />
            Book Now
          </button>
        </nav>
      </div>
    </header>
  );
}

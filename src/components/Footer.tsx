"use client";

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/gentlemensroom__/",
    svg: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-4 h-4"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61589938120743",
    svg: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-4 h-4"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-gold/10 text-cream/40 py-8 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Brand Details */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <p className="text-cream text-xs font-serif tracking-widest uppercase font-semibold">
            GENTLEMEN'S ROOM
          </p>
          <span className="hidden sm:inline text-gold/20">|</span>
          <p className="text-[10px] font-sans tracking-wide">
            Traffic Chowk, Butwal, Nepal
          </p>
        </div>

        {/* Right: Socials & Copyright */}
        <div className="flex items-center gap-6">
          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="text-cream/30 hover:text-gold transition-colors duration-300"
              >
                {s.svg}
              </a>
            ))}
          </div>
          <span className="text-gold/20">|</span>
          <p className="text-[10px] font-sans tracking-wider">
            &copy; {new Date().getFullYear()}
          </p>
        </div>

      </div>
    </footer>
  );
}

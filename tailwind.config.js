/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#1A1A1A",
          dark: "#121212",
          light: "#262626",
          muted: "#333333",
        },
        forest: {
          DEFAULT: "#1A1A1A",
          light: "#262626",
          dark: "#121212",
        },
        gold: {
          DEFAULT: "#C8A96E",
          light: "#dfc48f",
          dark: "#a88540",
        },
        cream: {
          DEFAULT: "#F5F0E8",
          dark: "#e8e0d0",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.4em",
      },
    },
  },
  plugins: [],
};

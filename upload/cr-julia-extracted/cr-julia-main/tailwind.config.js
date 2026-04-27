/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        magna: {
          teal: "#1A5C5A",
          gold: "#D4B896", // champagne light
          goldDark: "#705B3E", // editorial gold
          ivory: "#F5F1EC",
          text: "#0F2E2D",
          offWhite: "#FDF9F4",
        }
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "serif"],
        sans: ["'DM Sans'", "sans-serif"],
      },
      borderRadius: {
        'sm': '2px',
        'md': '4px',
      }
    },
  },
  plugins: [],
}

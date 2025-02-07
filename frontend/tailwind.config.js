/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        racing: ['"Racing Sans One"', "sans-serif"], // Custom font with fallback
        raleway: ["Raleway", "sans-serif"],
      },

      screens:{
      },

      height: {

        'calc-120': 'calc(120%)' // Defines a height of 120% of the parent

      }

    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
}
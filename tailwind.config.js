/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "pokemon-red": "#EE1515",
        "pokemon-blue": "#3B4CCA",
        "pokemon-yellow": "#FFDE00",
        "pokemon-gold": "#B69E31",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "cyber-black": "#0d0d0d",
        "cyber-purple": "#b967ff",
        "cyber-pink": "#ff2a6d",
        "cyber-blue": "#05d9e8",
        "cyber-yellow": "#f9f871",
        "cyber-green": "#01c38d",
      },
      backgroundImage: {
        "cyber-grid":
          "linear-gradient(0deg, rgba(5, 217, 232, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(5, 217, 232, 0.1) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-sm": "20px 20px",
        "grid-md": "40px 40px",
        "grid-lg": "80px 80px",
      },
      animation: {
        "cyber-pulse": "cyber-pulse 3s ease-in-out infinite",
        "cyber-float": "cyber-float 6s ease-in-out infinite",
        "cyber-glitch": "cyber-glitch 5s ease-in-out infinite",
        "grid-scroll": "grid-scroll 20s linear infinite",
      },
      keyframes: {
        "cyber-pulse": {
          "0%, 100%": { opacity: 1, transform: "scale(1)" },
          "50%": { opacity: 0.8, transform: "scale(1.05)" },
        },
        "cyber-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "cyber-glitch": {
          "0%, 100%": { transform: "translate(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translate(-2px, 2px)" },
          "20%, 40%, 60%, 80%": { transform: "translate(2px, -2px)" },
        },
        "grid-scroll": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 100px" },
        },
      },
      boxShadow: {
        "neon-blue":
          "0 0 5px rgba(5, 217, 232, 0.7), 0 0 10px rgba(5, 217, 232, 0.5), 0 0 15px rgba(5, 217, 232, 0.3)",
        "neon-pink":
          "0 0 5px rgba(255, 42, 109, 0.7), 0 0 10px rgba(255, 42, 109, 0.5), 0 0 15px rgba(255, 42, 109, 0.3)",
        "neon-purple":
          "0 0 5px rgba(185, 103, 255, 0.7), 0 0 10px rgba(185, 103, 255, 0.5), 0 0 15px rgba(185, 103, 255, 0.3)",
      },
    },
  },
  plugins: [],
};

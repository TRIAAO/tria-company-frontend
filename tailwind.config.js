/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        triaBlack: "#050505",
        triaDark: "#111111",
        triaGray: "#737373",
        triaLight: "#F5F5F5",
        triaWhite: "#FFFFFF",
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
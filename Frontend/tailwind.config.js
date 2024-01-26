/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontfamily: {
        Kanit: ["Kanit", "sans-serif"],
      },
      colors: {
        primaryColor: "#7F8CD9",
        secondaryColor: "#9ac9f3",
        accentColor: "#CEF5D3",
      },
    },
    plugins: [],
  },
};

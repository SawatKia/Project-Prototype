/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontfamily: {
        "Noto-sans-Thai": ["Noto Sans Thai", "sans-serif"],
      },
    },
    plugins: [],
  },
};

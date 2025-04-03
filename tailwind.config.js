/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"], // Ensure correct paths
  theme: {
    extend: {
      fontFamily: {
        custom: ["MyCustomFont", "sans-serif"], // Define custom font
      },
    },
  },
  plugins: [],
};

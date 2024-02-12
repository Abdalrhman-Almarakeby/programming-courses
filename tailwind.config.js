/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        darkBlue: "#0a2342",
      },
      boxShadow: {
        1: "#0a234221 0px 3px 8px",
      },
    },
  },
  plugins: [],
};

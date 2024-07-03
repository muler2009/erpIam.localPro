/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        Rubik: ["Rubik", "sans"],
        MonaSans: ["Mona-Sans", "sans"],
        Oswald: ["Oswald, sans-serif"]
      }
    },
  },
  plugins: [],
}


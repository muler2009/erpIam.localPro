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
        Oswald: ["Oswald", "sans-serif"],
        IBMPlexSans: ["IBMPlexSans-Regular", "sans-serif"],
      },
      colors: {
        'primary-green': '#26cc86',
        'text-primary': '#0f172a',
        'button-primary': '#3971c2',
        'button-hover': "#26559e"
      },
      backgroundImage: {
        'watermark-logo': "url('/src/assets/images/watermark-logo.png')",
        'logo': "url('/src/assets/images/logo.png')"
        
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.3s ease-out forwards',
      },
      
    },
  },
  plugins: [],
}


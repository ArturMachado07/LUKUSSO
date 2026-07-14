/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lukusso-black': '#080808',
        'lukusso-gold': '#FFF200',
        'lukusso-red': '#CC092F',
        'lukusso-gray': '#171717',
        'lukusso-gray-light': '#2a2a2a',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'manrope': ['Manrope', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.6s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(255, 242, 0, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(255, 242, 0, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
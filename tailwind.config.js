/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lol-blue': '#0AC8B9',
        'lol-gold': '#C89B3C',
        'lol-red': '#CF2F2F',
        'dark-blue': '#1A1A2E',
        'navy-blue': '#16213E',
        'deep-blue': '#0F3460',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
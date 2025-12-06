
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
  ],
  theme: {
    extend: {
      colors: {
        earth: {
          50: '#f7f6f5',
          100: '#e7e5e3',
          200: '#d1cdc9',
          300: '#b7afa9',
          400: '#9a8f86',
          500: '#7f7165',
          600: '#655850',
          700: '#4e433e',
          800: '#3b332f',
          900: '#2c2724',
        },
        agro: {
          50: '#f4f9f4',
          100: '#eaf3ea',
          200: '#d6e7d6',
          300: '#b5d1b5',
          400: '#8fb98f',
          500: '#6fa06f',
          600: '#548154',
          700: '#3e613e',
          800: '#2f492f',
          900: '#223522',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        serif: ['"Georgia"', 'serif'],
      },
      keyframes: {
        in: {
          '0%': { transform: 'translateY(18px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      animation: {
        in: 'in .6s both',
      },
    },
  },
  plugins: [],
};

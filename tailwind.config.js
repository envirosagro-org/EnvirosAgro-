/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        earth: {
          50: '#f8f7f6',
          100: '#f1efed',
          200: '#e5e0dc',
          300: '#d8d1c9',
          400: '#bfae9e',
          500: '#a58a72',
          600: '#8c6c54',
          700: '#72523e',
          800: '#5a3e2e',
          900: '#473022',
          950: '#2a1c14',
        },
        agro: {
          50: '#f2fbf2',
          100: '#e6f7e6',
          200: '#ccefd0',
          300: '#b3e7b9',
          400: '#7fd78a',
          500: '#4cc75a',
          600: '#3da149',
          700: '#31813b',
          800: '#28642f',
          900: '#205126',
          950: '#102913',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agro: {
          50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac', 400: '#4ade80',
          500: '#22c55e', 600: '#16a34a', 700: '#15803d', 800: '#166534', 900: '#14532d', 950: '#052e16',
        },
        earth: {
          50: '#fdfaf9', 100: '#f7f2f0', 200: '#f1e6e1', 300: '#e8d3ca', 400: '#d9b3a3',
          500: '#c78d73', 600: '#b56d4f', 700: '#9c543a', 800: '#7f4430', 900: '#683727', 950: '#0a0504',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-gentle': 'pulse-gentle 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'progress': 'progress 3s ease-in-out infinite',
        'scan': 'scan 3s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'slide-in-bottom': 'slide-in-bottom 0.6s ease-out forwards',
        'zoom-in': 'zoom-in 0.3s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(1deg)' },
        },
        'pulse-gentle': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
        progress: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        scan: {
          '0%, 100%': { transform: 'translateY(0)', opacity: 0.2 },
          '50%': { transform: 'translateY(100%)', opacity: 1 },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-bottom': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'zoom-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      },
      boxShadow: {
        'strategic': '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
        'cinematic-xl': '0 40px 100px -20px rgba(0, 0, 0, 0.4)',
        'glow-green': '0 0 20px rgba(34, 197, 94, 0.3)',
        'glow-blue': '0 0 20px rgba(56, 189, 248, 0.3)',
      }
    }
  },
  plugins: [],
}

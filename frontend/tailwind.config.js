/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6fffa',
          100: '#b2f5ea',
          200: '#81e6d9',
          300: '#4fd1c5',
          400: '#38b2ac',
          500: '#319795',
          600: '#2c7a7b',
          700: '#285e61',
          800: '#234e52',
          900: '#1D4044',
        },
        secondary: {
          50: '#ebf8ff',
          100: '#bee3f8',
          200: '#90cdf4',
          300: '#63b3ed',
          400: '#4299e1',
          500: '#3182ce',
          600: '#2b6cb0',
          700: '#2c5282',
          800: '#2a4365',
          900: '#1A365D',
        },
        accent: {
          50: '#fff5f7',
          100: '#fed7e2',
          200: '#fbb6ce',
          300: '#f687b3',
          400: '#ed64a6',
          500: '#d53f8c',
          600: '#b83280',
          700: '#97266d',
          800: '#702459',
          900: '#521B41',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
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
      },
    },
  },
  plugins: [],
};
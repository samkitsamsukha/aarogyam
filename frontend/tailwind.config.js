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
        // Existing animations
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite', // Note: Tailwind has a 'pulse'. This is a slower custom one.
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',

        // New animations
        'spin-slow': 'spin 3s linear infinite', // Slower spin
        'bounce-gentle': 'bounceGentle 2s infinite', // A gentler bounce
        'flow-path': 'flowPath 3s ease-in-out infinite', // For movement along a path
        'ping-custom': 'pingCustom 1.5s cubic-bezier(0, 0, 0.2, 1) infinite', // A custom ping
      },
      keyframes: {
        // Existing keyframes
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        // Keyframes for Tailwind's 'pulse' (if you want to customize it or see its structure)
        // pulse: {
        //   '0%, 100%': { opacity: '1' },
        //   '50%': { opacity: '.5' },
        // },

        // New keyframes
        spin: { // Tailwind already has 'spin', this is if you need to define it explicitly or customize
          to: {
            transform: 'rotate(360deg)',
          },
        },
        bounceGentle: {
          '0%, 100%': {
            transform: 'translateY(-5%)',
            animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
          },
          '50%': {
            transform: 'none',
            animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
          },
        },
        flowPath: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '20%': { opacity: '1' },
          '80%': { opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' }, // Adjust translateX for desired distance
        },
        pingCustom: { // Similar to Tailwind's ping but customizable
          '75%, 100%': {
            transform: 'scale(1.8)', // Max scale
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [],
};
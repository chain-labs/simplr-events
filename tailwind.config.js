/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        'modal-bg': '#0e0e0e60',
      },
      keyframes: {
        'bounce-right': {
          '0%, 100%': {
            transform: 'translateX(0)',
          },

          '10%, 30%, 50%, 70%': {
            transform: 'translateX(-2px)',
          },

          '20%, 40%, 60%': {
            transform: 'translateX(2px)',
          },

          '80%': {
            transform: 'translateX(1px)',
          },

          '90%': {
            transform: 'translateX(-1px)',
          },
        },
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-right':
          'bounce-right 2s ease-in-out 0s infinite normal forwards',
      spacing: {
        128: '32rem',
      },
      fontFamily: {
        sans: ['Satoshi', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}

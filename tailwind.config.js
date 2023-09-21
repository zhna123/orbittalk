import formPlugin from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Helvetica', 'Arial', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'green': '#54B948',
      'red': {
        100: '#F0E8E7',
        200: '#F0D7D6',
        300: '#EEBAB9',
        400: '#EF8686',
        500: '#CD272A',
        600: '#a41d22',
        700: '#721c1f',
        800: '#431515'

      },
      'grey': {
        100: '#F2F1F0',
        200: '#E6E4E3',
        300: '#CCCAC9',
        400: '#B3B4B4',
        500: '#999898',
        600: '#808080',
        700: '#666767',
        800: '#4D4E4E'
      }

    }
  },
  plugins: [
    formPlugin,
  ],
}


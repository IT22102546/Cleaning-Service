import flowbitePlugin from 'flowbite/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        secondary: '#2B0996',
        primary:'#006AFF'
      },
      fontFamily: {
        tangerine: ['Tangerine'],
        cinzel: ['Cinzel'],
        Lavish: ['sans-serif'],
        Baloo: ['Baloo 2']
      },
    },
  },
  plugins: [flowbitePlugin],
};

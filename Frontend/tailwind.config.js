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
      fontFamily: {
        tangerine: ['Tangerine', 'cursive'],
        cinzel: ['Cinzel', 'serif'],
        lavish: ['Lavish', 'sans-serif'],
        baloo: ['Baloo 2', 'sans-serif'],
      },
    },
  },
  plugins: [flowbitePlugin],
};

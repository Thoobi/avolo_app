/* eslint-env node */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        ink: '#0d0f14',
        muted: '#8a8f9a',
        danger: '#ef4444',
      },
    },
  },
  plugins: [],
};

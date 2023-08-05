/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-100':'#393939',
        'dark-200':'#9B9B9B',
        'dark-300': '#2C2C2C'
      }
    },
  },
  plugins: [],
}
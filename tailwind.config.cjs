/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.jsx"],
  theme: {
    fontFamily: {
      'Lobster': ['Lobster', 'sans-serif'],
      'Krona': ['"Krona One"', 'serif'] 
    },
     extend: {},
   },
   plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
 };

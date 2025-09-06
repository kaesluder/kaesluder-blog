/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./content/**/*.{html,js,njk,md}",
    "./_includes/**/*.{html,js,njk}",
    "./node_modules/flowbite-react/dist/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
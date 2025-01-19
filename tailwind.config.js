/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors:{
        primaryBtn: '#171717',
        outlineBtnHover:'#f3f3f3'
      }
    },
  },
  plugins: [],

}

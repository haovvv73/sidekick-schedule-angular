/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'laptop-background-light': "url('./assets/images/laptop_background_light.png')",
        'laptop-background-dark': "url('./assets/images/laptop_background_dark.png')",
        // 'naviTable-icon':"url('./assets/images/naviTable.png')",
      },
      fontFamily:{
        SFpro:"'SF Pro Display',sans-serif"
      }
    },
  },
  plugins: [],
}
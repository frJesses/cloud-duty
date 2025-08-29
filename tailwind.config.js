/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
const { Colors } = require("./constants/Colors")

module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".color-primary": {
          color: Colors.light.primary
        },
        ".color-second": {
          color: Colors.light.sencond
        },
        ".bg-primary": {
          backgroundColor: Colors.light.background,
        },
        ".bg-second": {
          backgroundColor: Colors.light.sencondBackground,
        },
        ".bg-theme": {
          backgroundColor: Colors.light.primary,
        },
        ".t-primary": {
          color: Colors.light.text
        },
        ".t-second": {
          color: Colors.light.sencondText
        }
      })
    }),
  ],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          start: '#C04AFF',
          end: '#FF5CA0',
        },
        secondary: '#FF5CA0',
        text: {
          primary: '#3A3A3A',
          secondary: '#777777',
        }
      },
      fontFamily: {
        'ubuntu': ['Ubuntu', 'system'],
        'ubuntu-medium': ['Ubuntu-Medium', 'system'],
        'ubuntu-bold': ['Ubuntu-Bold', 'system'],
      }
    },
  },
  plugins: [],
}
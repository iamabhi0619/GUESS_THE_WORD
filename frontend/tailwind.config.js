/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        themColor: {
          lightOrange: "#FFBE98",
          red: "#F05A7E",
          blue: "#125B9A",
          green: "#0B8494",
          yellow: "#ffc300"
        },
      },
      fontFamily: {
        heading: ['"Chicle"', "sans-serif"],
        normal: ['"Bubblegum Sans"', "sans-serif"],
        handWritten: ['"Caveat"', "sans-serif"],
      },
    },
  },
  plugins: [],
};

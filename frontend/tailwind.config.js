/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        complement: {
          DEFAULT: "#0C091A",
          light: "#72747D",
        },
        brown: "#130F1A",
        primary: "#CFBCA4",
      },
      fontFamily: {
        sourceserif: ["Source Serif Pro"],
        synonym: ["Synonym-Variable"],
        ibmplex: ["IBM Plex Sans"],
      },
    },
  },
  plugins: [],
};

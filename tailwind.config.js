/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Permanent Marker", ...defaultTheme.fontFamily.serif],
        sans: ["Noto Sans", ...defaultTheme.fontFamily.sans],
        mono: ["Fira Code", ...defaultTheme.fontFamily.mono],
      },
      borderWidth: { DEFAULT: "3px", 0: "0", 2: "2px", 3: "3px", 4: "4px" },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    // require("@tailwindcss/forms"),

    require("daisyui"),
  ],
  daisyui: {
    themes: ["cmyk", "night"],
  },
};

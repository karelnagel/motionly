/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        "light": {
          "primary": "#2196f3",
          "primary-content": "#ffffff",
          "secondary": "#f6d860",
          "base-100": "#ffffff",
          "base-200": "#f2f2f2",
          "base-content": "#333333",
          "base-300": "#bfbfbf"
        }
      },
      {
        "dark": {
          "primary": "#2196f3",
          "primary-content": "#ffffff",
          "secondary": "#f6d860",
          "base-100": "#232323",
          "base-200": "#1d1d1d",
          "base-content": "#ffffff",
          "base-300": "#3d3d3d"
        }
      }

    ],
  },
  plugins: [require("daisyui")],
}
const { createThemes } = require('tw-colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          "DEFAULT": "#316fff",
          "content": "#e8f5ff",
          '50': '#e8f5ff',
          '100': '#d5edff',
          '200': '#b4dbff',
          '300': '#86c2ff',
          '400': '#5799ff',
          '500': '#316fff',
          '600': '#0e42ff',
          '700': '#0538fd',
          '800': '#0835d7',
          '900': '#11339e',
          '950': '#0a1c5c',
        },
      }
    },
  },
  plugins: [
    createThemes({
      light: {
        "base-100": "#f7f7f7",
        "base-200": "#e3e3e3",
        "base-300": "#c8c8c8",
        "base-content": "#1a1a1a"
      },
      dark: {
        "base-100": "#1a1a1a",
        "base-200": "#313131",
        "base-300": "#383838",
        "base-content": "#f7f7f7"
      }
    })
  ],
}
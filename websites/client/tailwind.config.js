/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        "base-content-2": "#FFFFFF",
      },
      fontFamily: {
      },
      colors: {
        "list-title": "#4B5563",
        "list-subtitle": "#8f8f8f",
      },
    }
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#5FBFF9",
          secondary: "#A276FF",
          accent: "#16BAC5",
          neutral: "#FFFFFF",
          "base-100": "#111111",
          "base-200": "#1e1e1e",
          "base-300": "#252525",
          "base-content": "#EFE9F4",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },

    ],
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
}


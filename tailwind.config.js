/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["poppins", "serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#D8EFD3",
          secondary: "#55AD9B",
          accent: "#95D2B3",
          neutral: "#F1F8E8",
          "base-100": "#ffffff",
          "base-200": "#EEEEEE",
        },
      },
      {
        dark: {
          primary: "#1E293B",
          secondary: "#334155",
          accent: "#64748B",
          neutral: "#1E293B",
          "base-100": "#0F172A",
          "base-200": "#1E293B",
        },
      },
    ],
  },
};

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

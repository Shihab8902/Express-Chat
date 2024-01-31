/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        neumorphic: '13px 13px 20px  #cdced1, -13px -13px 20px #ffffff',
        inputShadow: "inset 8px 8px 8px #cdced1, inset -8px -8px 8px #ffffff",
        buttonShadow: "3px 3px 8px #b1b1b1, -3px -3px 8px #ffffff",
      },
    },
  },
  plugins: [],
}


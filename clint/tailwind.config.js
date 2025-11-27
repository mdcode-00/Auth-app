/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        rotateAnim: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        rotateAnim: 'rotateAnim 6s linear infinite',
        rotateAnimDelay: 'rotateAnim 6s linear infinite -3s', // for second layer
      },
      borderRadius: {
        custom: '50px 5px',
      },
    },
  },
  plugins: [],
}


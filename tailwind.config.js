/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3A3AFF',
        'secondary': '#0B0B1D66',
        'finn': '#00000066',
        'danger': '#FF016C',
        'disabled': '#7373B0',
        'border': '#FFFFFF66',
        'background': '#06060C'
      },
      fontFamily: {
        'poppins': '"Poppins", sans-serif',
        'roboto-mono': '"Roboto Mono", monospace',
      }
    },
  },
  plugins: [],
}


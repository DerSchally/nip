/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        post: {
          yellow: '#FFCC00',
          black: '#000000',
          gray: {
            100: '#F5F5F5',
            200: '#E5E5E5',
            400: '#999999',
            600: '#666666',
          },
          red: '#CC0000',
          green: '#009933',
        }
      }
    },
  },
  plugins: [],
}

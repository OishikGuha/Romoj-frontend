/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    colors: {
      neutralGray: {
        100: '#e5e7eb',
        200: '#c3c4c9'
      },
      // screens: {
      //   'sm': '100px',
      //   'md': '960px',
      //   'lg': '1440px',
      // },
    }
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  theme: {
    extend: {
      backgroundImage: {
      'gradient-radial': 'radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))',}
    },
  },
  plugins: [],
}


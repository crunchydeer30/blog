/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navgray: '#757575',
        primary: '#292929',
        'primary-light': '#3e3e3e',
        secondary: '#757575',
        lightgray: '#F5F5F5',
        'lightgray-dark': '#dcdcdc',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [
    import ('@tailwindcss/typography'),
  ],
};

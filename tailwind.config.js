module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'player': 'rgb(25, 25, 25)'
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

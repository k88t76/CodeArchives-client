module.exports = {
  purge: ['./components/**/*.tsx', './pages/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        45: '45rem',
      },
    },
  },
  variants: {
    extend: {
      transform: ['hover', 'focus'],
      cursor: ['hover', 'focus'],
    },
  },
  plugins: [require('tailwind-caret-color')()],
};

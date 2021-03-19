module.exports = {
  purge: ['./components/**/*.tsx', './pages/**/*.tsx'],
  darkMode: false,
  theme: {
    extend: {
      height: {
        200: '200rem',
        39: '39rem',
      },
      width: {
        160: '34rem',
      },
    },
  },
  variants: {
    extend: {
      transform: ['hover', 'focus'],
      cursor: ['hover', 'focus'],
    },
  },
};

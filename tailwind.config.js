const extendHeight = () => {
  var height = {};
  for (let i = 0; i < 100; i++) {
    height[42 + i * 3] = String(42 + i * 3) + 'rem';
  }
  return height;
};

module.exports = {
  purge: ['./components/**/*.tsx', './pages/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: extendHeight(),
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

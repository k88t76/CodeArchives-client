// incrementing 'a' because cast doesn't work for className
const extendHeight = () => {
  var height = {};
  var key = 'a';
  for (let i = 0; i < 300; i++) {
    height[key] = String(53 + i * 3) + 'rem';
    key += 'a';
  }
  return height;
};

module.exports = {
  purge: ['./components/**/*.tsx', './pages/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: extendHeight(),
      width: {
        160: '40rem',
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

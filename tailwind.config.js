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
      height: {
        42: '42rem',
        45: '45rem',
        47: '47rem',
        51: '51rem',
        54: '54rem',
        57: '57rem',
        60: '60rem',
        63: '63rem',
        66: '69rem',
        72: '72rem',
        75: '75rem',
        78: '78rem',
        81: '81rem',
        84: '84rem',
        87: '87rem',
        90: '90rem',
        93: '93rem',
        96: '96rem',
        99: '99rem',
        101: '101rem',
        104: '104rem',
        107: '107rem',
        110: '110rem',
        113: '113rem',
        116: '116rem',
        119: '119rem',
        122: '122rem',
        125: '125rem',
        128: '128rem',
        131: '131rem',
        134: '134rem',
        137: '137rem',
        140: '140rem',
        143: '143rem',
        146: '146rem',
        149: '149rem',
        152: '152rem',
        155: '155rem',
        158: '158rem',
        161: '161rem',
        164: '164rem',
        167: '167rem',
        170: '170rem',
        173: '173rem',
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

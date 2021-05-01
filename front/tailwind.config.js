const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [
    './src/**/*.{ts,tsx}',
    './public/index.html'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      width: {
        'fit': 'fit-content'
      },
      height: {
        'fit': 'fit-content'
      },
      inset: {
        '2.5': '0.625rem'
      },
      cursor: {
        'grab': 'grab'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

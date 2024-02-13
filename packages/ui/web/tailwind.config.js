const { colors, colorsList } = require('./src/design-system/design-tokens')

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  safelist: colorsList.map((color) => 'bg-' + color),
}

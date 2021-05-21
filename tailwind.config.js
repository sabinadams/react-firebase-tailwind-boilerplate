module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        'width': 'width'
      },
      keyframes: {
        fadeout: {
          '0%': { opacity: 1, display: 'block' },
          '50%': { opacity: 0.5 },
          '100%': { opacity: 0, display: 'none'}
        }
      },
      animation: {
        fadeout: 'fadeout 300ms ease-in-out'
      }
    },
    fontFamily: {
      'NovaFlat': ['Nova Flat']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

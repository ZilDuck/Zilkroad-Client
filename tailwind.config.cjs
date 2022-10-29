const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

const config = {
  darkMode: 'class',
  mode: 'jit',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        gray: colors.neutral,
        zilliqa: {
          50: '#f2fcfc',
          100: '#e6f9fa',
          200: '#bff0f2',
          300: '#99e7eb',
          400: '#4dd6db',
          500: '#00C4CC',
          600: '#00b0b8',
          700: '#009399',
          800: '#00767a',
          900: '#006064'
        },
        'zilkroad-teal': '#2ACCC4',
        'zilkroad-gray': {
          lighter: '#DBDBDB',
          light: '#CBCBCB',
          medium: '#989898',
          dark: '#1A1A1A',
          darker: '#303030',
          border: '#363636'
        },
        'zilkroad-text': {
          light: '#939393',
          normal: '#C9C9C9'
        }
      },
      blur: {
        xl: '3px',
      },
      screens: {
        xl: '1224px',
        '2xl': '1520px'
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans]
      },
      backgroundImage: {
        'blue-waves': "url('https://cdn.discordapp.com/attachments/881284549433233428/919935609760522310/unknown.png')",
        blur: "url('https://cdn.discordapp.com/attachments/881284549433233428/920055505320312862/when-in-rome.png')",
        'liquid-metal': "url('/static/images/liquid-metal-bg.jpg')"
      }
    }
  },

  plugins: []
}

module.exports = config

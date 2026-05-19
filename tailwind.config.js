/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.vue',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#f4f8ff',
          100: '#e6eefb',
          200: '#c4d5f0',
          300: '#9cb7de',
          400: '#6f92c2',
          500: '#436e9f',
          600: '#1f4f82',
          700: '#163d68',
          800: '#102f52',
          900: '#0b223e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      screens: {
        'xs': '390px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};


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
          50:  '#f3f7ff',
          100: '#dbe7ff',
          200: '#b7ceff',
          300: '#85aaff',
          400: '#587ff4',
          500: '#355ddb',
          600: '#253f9d',
          700: '#1f357f',
          800: '#1c2f68',
          900: '#182955',
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


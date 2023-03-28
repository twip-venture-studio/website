/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1080px',
      xl: '1440px',
    },
    fontFamily: {
      'sans': ['Manrope','Helvetica', 'Arial', 'sans-serif']
    },
    colors: {
      "primary": "#51cfa2",
      "secondary": "#1e063a",
      "tertiary": "#a9f27d",
      "gray-dark": "#46546a",
      "gray": "#818c9c",
      "gray-light": "#dbe2ed",
      "gray-ultra-light": "#f3f6fe",
      "white": "#ffffff"
    },
    fontSize: {
      sm: '0.75rem',
      base: '1rem',
      lg: '1.25rem',
      xl: '1.375rem',
      '2xl': '1.625rem',
      '3xl': '1.875rem',
      '3.5xl': '2rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.5rem'
    },
    extend: {
      boxShadow: {
        'DEFAULT': '0 6px 10px 0 rgba(0, 0, 0, 0.3)',
        'hover': '0 8px 16px 0 rgba(0, 0, 0, 0.3)'
      },
      maxWidth: {
        '1080': '1080px',
      }
    }
  },
  plugins: [],
}

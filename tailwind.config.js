/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#1A1A1A',
          card: '#2D2D2D',
          'card-light': '#3A3A3A',
          border: '#404040',
        },
        light: {
          bg: '#F5F5F5',
          card: '#FFFFFF',
          'card-hover': '#F0F0F0',
          border: '#E0E0E0',
        },
        primary: {
          yellow: '#FFD700',
          'yellow-dark': '#E6C200',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#B8B8B8',
          tertiary: '#808080',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      boxShadow: {
        'card': '0 4px 12px rgba(0, 0, 0, 0.4)',
        'lg': '0 10px 20px rgba(0, 0, 0, 0.5)',
        'card-light': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'lg-light': '0 4px 12px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react';

module.exports = {
  darkMode: ['class'],
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './node_modules/@nextui-org/theme/dist/components/divider.js',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        sectionBackground: '#F8F9FF',
        'primary-200': '#9C2CF3',
        'primary-100': '#7D22F5',
        'primary-50': '#F6F0FF',
        black: '#191919',
        'black-100': '#1E1E1E',
        'black-200': '#1C1F37',
        shadow: '#797979',
        'shadow-100': '#828282',
        'nav-active': '#5E59FF',
        nav: '#A0A8B0',
      },
      boxShadow: {
        sidebar: '4px 0 5px rgba(0,0,0,.06)',
      },

      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    nextui({
      themes: {},
    }),
  ],
};

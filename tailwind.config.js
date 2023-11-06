/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react';

module.exports = {
  darkMode: ['class'],
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
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
      backgroundImage: {
        resume: "url('/resume_bg.jpg')",
        card: 'radial-gradient(88.19% 80.74% at 37.56% 34.2%, rgba(203, 44, 243, 0.70) 0%, rgba(156, 44, 243, 0.70) 55.27%, rgba(120, 44, 243, 0.70) 100%)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        regular: '14px',
      },
      colors: {
        sectionBackground: '#F8F9FF',
        primary: {
          50: '#F6F0FF',
          200: '#9C2CF3',
          100: '#7D22F5',
          300: '#BB35FF',
        },
        black: {
          100: '#1E1E1E',
          200: '#1C1F37',
          300: '#1C1A1B',
          400: '#191919',
          500: '#202020',
        },
        hover: {
          50: '#FBF7FF',
        },
        shadow: '#797979',
        'shadow-100': '#828282',
        'nav-active': '#5E59FF',
        'nav-selected': '#F4F5F6',
        nav: '#A0A8B0',
        'shadow-border': '#DADADA',
      },
      boxShadow: {
        sidebar: '4px 0 5px rgba(0,0,0,.06)',
        panel: '0px 5px 10px 0px #F1F2FA',
        card: '0px 4px 5px 0px rgba(0, 0, 0, 0.06);',
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
      transition: {
        up: 'translate-y-1',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), nextui()],
};

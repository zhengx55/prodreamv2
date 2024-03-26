/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ['class'],
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  safelist: ['ProseMirror'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--poppins-font)'],
        inter: ['var(--inter-font)'],
        baskerville: ['var(--liber-font)'],
        custom: ['var(--cn-font)'],
      },
      colors: {
        border: {
          50: '#EAEAEA',
        },
        primary: {
          50: '#F6F0FF',
          200: '#9C2CF3',
          100: '#7D22F5',
          300: '#BB35FF',
          400: '#E5D7FD',
          500: '#FCF9FF',
          600: '#EAD9FC',
        },
        doc: {
          secondary: '#F1F2FA',
        },
        shadow: '#797979',
        'shadow-50': '#F9F9F9',
        'shadow-100': '#828282',
        'shadow-200': '#F3F5F7',
        'shadow-300': '#5A5A5A',
        'shadow-400': '#FAFAFA',
        'nav-active': '#5E59FF',
        'nav-selected': '#F4F5F6',
        nav: '#A0A8B0',
        'shadow-border': '#DADADA',
        dot: '#CFD0D0',
        disabled: '#DADADA',
      },
      boxShadow: {
        input: '0px 1px 0px 0px rgba(0, 0, 0, 0.05)',
        button: '0px 0px 5px 0px rgba(0, 0, 0, 0.25)',
        toggle: '0px 2px 4px 0px rgba(0, 0, 0, 0.15)',
        tooltip: '0px 0px 4px 0px rgba(156, 44, 243, 0.25)',
        textarea: '0px 8px 24px 6px rgba(0, 0, 0, 0.12)',
        price: '0px 0px 24px 0px rgba(30, 37, 94, 0.08)',
      },
      keyframes: {
        ping: {
          '75%, 100%': { transform: 'scale(1.1)', opacity: 0 },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      transition: {
        up: 'translate-y-1',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar'),
  ],
};

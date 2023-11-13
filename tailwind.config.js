/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ['class'],
  content: ['./components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],
  theme: {
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
          50: '#3B4453',
          100: '#1E1E1E',
          200: '#1C1F37',
          300: '#1C1A1B',
          400: '#191919',
          500: '#202020',
          600: '#161616',
          700: '#141718',
        },
        hover: {
          50: '#FBF7FF',
          100: '#F7F9FC',
        },
        shadow: '#797979',
        'shadow-50': '#F9F9F9',
        'shadow-100': '#828282',
        'shadow-200': '#F3F5F7',
        'shadow-300': '#5A5A5A',
        'nav-active': '#5E59FF',
        'nav-selected': '#F4F5F6',
        nav: '#A0A8B0',
        'shadow-border': '#DADADA',
        dot: '#CFD0D0',
      },
      boxShadow: {
        sidebar: '4px 0 5px rgba(0,0,0,.06)',
        panel: '0px 5px 10px 0px rgba(0, 0, 0, 0.06)',
        card: '0px 4px 5px 0px rgba(0, 0, 0, 0.06)',
        input: '0px 1px 0px 0px rgba(0, 0, 0, 0.05)',
        button: '0px 0px 5px 0px rgba(0, 0, 0, 0.25)',
        toggle: '0px 2px 4px 0px rgba(0, 0, 0, 0.15)',
        bar: '0px -8px 20px 0px rgba(244, 244, 244, 0.25), 0px 2px 2px 0px rgba(160, 168, 176, 0.08), 0px 0px 4px 0px rgba(162, 99, 248, 0.25)',
        tooltip: '0px 0px 4px 0px rgba(156, 44, 243, 0.25)',
        textarea: '0px 8px 24px 6px rgba(0, 0, 0, 0.12)',
      },
      keyframes: {
        ping: {
          '75%, 100%': { transform: 'scale(1.1)', opacity: 0 },
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
  plugins: [require('tailwindcss-animate')],
};

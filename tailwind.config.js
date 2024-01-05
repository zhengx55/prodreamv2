/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ['class'],
  content: ['./components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],
  safelist: ['ProseMirror'],
  theme: {
    extend: {
      backgroundImage: {
        chat: 'linear-gradient(180deg, rgba(156, 44, 243, 0.20) 0%, rgba(58, 73, 249, 0.20) 100%)',
        auth: "url('/auth.svg')",
        onboard: "url('/welcome/welcomebg.webp')",
        resume: "url('/resume_bg.webp')",
        referal: 'linear-gradient(to left, #E32CF3, #9C2CF3, #2C40F3, #2CABF3)',
        card: 'radial-gradient(88.19% 80.74% at 37.56% 34.2%, rgba(203, 44, 243, 0.70) 0%, rgba(156, 44, 243, 0.70) 55.27%, rgba(120, 44, 243, 0.70) 100%)',
      },
      fontFamily: {
        poppins: ['var(--poppins-font)'],
      },
      fontSize: {
        regular: '14px',
      },
      colors: {
        welcome: {
          border: '#525758',
          background: '#525758',
        },
        sectionBackground: '#F8F9FF',
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
        gray: {
          50: '#313746',
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
        blue: {
          50: '#F9FBFF',
          100: '#CEDEFE',
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
        sidebar: '4px 0 5px rgba(0,0,0,.06)',
        panel: '0px 5px 10px 0px rgba(0, 0, 0, 0.06)',
        card: '0px 4px 5px 0px rgba(0, 0, 0, 0.06)',
        input: '0px 1px 0px 0px rgba(0, 0, 0, 0.05)',
        button: '0px 0px 5px 0px rgba(0, 0, 0, 0.25)',
        toggle: '0px 2px 4px 0px rgba(0, 0, 0, 0.15)',
        bar: '0px -8px 20px 0px rgba(244, 244, 244, 0.25), 0px 2px 2px 0px rgba(160, 168, 176, 0.08), 0px 0px 4px 0px rgba(162, 99, 248, 0.25)',
        tooltip: '0px 0px 4px 0px rgba(156, 44, 243, 0.25)',
        textarea: '0px 8px 24px 6px rgba(0, 0, 0, 0.12)',
        chatWindow: '0px 12px 40px -12px rgba(0, 0, 0, 0.06)',
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

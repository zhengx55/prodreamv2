const cssnano = [
  'cssnano',
  {
    preset: 'advanced',
    discardComments: { removeAll: true },
  },
];
module.exports = {
  plugins: {
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? [cssnano] : []),
  },
};

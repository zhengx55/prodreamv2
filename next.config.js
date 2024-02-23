/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withPlugins = require('next-compose-plugins');

const { i18n } = require('./next-i18next.config');

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'test.quickapply.app',
      },
      {
        protocol: 'https',
        hostname: 'quickapply.app',
      },
      { hostname: 'lh3.googleusercontent.com', protocol: 'https' },
      { hostname: 'quickapply.blob.core.windows.net', protocol: 'https' },
    ],
  },
  experimental: {
    nextScriptWorkers: true,
  },
  reactStrictMode: false,
  output: 'standalone',
  compress: true,
  // poweredByHeader: false,
  webpack: (config) => {
    // Setting resolve.alias to false tells webpack to ignore a module
    // https://webpack.js.org/configuration/resolve/#resolvealias
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  }
};

module.exports = withPlugins([withBundleAnalyzer], nextConfig);

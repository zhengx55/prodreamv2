/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withNextIntl = require('next-intl/plugin')();
const withPlugins = require('next-compose-plugins');

const nextConfig = {
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'quickapply.app',
      },
      { hostname: 'quickapply.blob.core.windows.net', protocol: 'https' },
    ],
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-use'],
  },
  reactStrictMode: false,
  output: 'standalone',
  compress: true,
};

module.exports = withPlugins([withBundleAnalyzer, withNextIntl], nextConfig);

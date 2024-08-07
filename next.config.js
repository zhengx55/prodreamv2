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
    optimizePackageImports: ['lucide-react', 'react-use'],
  },
  reactStrictMode: false,
  output: 'standalone',
  compress: true,
};

module.exports = withPlugins([withBundleAnalyzer, withNextIntl], nextConfig);

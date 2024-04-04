/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withPlugins = require('next-compose-plugins');

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
    optimizePackageImports: ['lucide-react'],
    typedRoutes: true,
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  reactStrictMode: false,
  output: 'standalone',
  compress: true,
  // poweredByHeader: false,
};

module.exports = withPlugins([withBundleAnalyzer], nextConfig);

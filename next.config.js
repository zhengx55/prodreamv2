/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  distDir: 'build',
  // pageExtensions: ['tsx', 'jsx'],
  poweredByHeader: false,
};

module.exports = withBundleAnalyzer(nextConfig);

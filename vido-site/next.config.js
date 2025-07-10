/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // Enable static file serving for Fly.io
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : undefined,
  // Optimize for production
  swcMinify: true,
  // Experimental features for better performance
  experimental: {
    serverComponentsExternalPackages: []
  }
}

module.exports = nextConfig

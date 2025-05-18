/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization settings
  images: {
    domains: ['raw.githubusercontent.com'],
    // Enable better image optimization
    formats: ['image/avif', 'image/webp'],
  },
  
  // Performance optimizations
  compiler: {
    // Remove console.logs in production build
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Enable static optimization where possible
  output: 'standalone',
    // Allow proper component optimization
  experimental: {
    // Enable server actions performance optimization
    serverActions: {
      bodySizeLimit: '2mb',
    },
    // Optimize React specific settings
    optimizeCss: true,
  },
  
  // Improve compilation of server components
  serverExternalPackages: [],
};

module.exports = nextConfig;

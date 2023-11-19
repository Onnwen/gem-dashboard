/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'avatar.vercel.sh', 'upload.wikimedia.org']
  },
  experimental: {
    serverComponentsExternalPackages: ['@tremor/react']
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

module.exports = nextConfig;

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ac.goit.global',
      },
    ],
  },

  env: {
    NEXT_PUBLIC_API_URL: 'https://notehub-api.goit.study',
  },
};

export default nextConfig;
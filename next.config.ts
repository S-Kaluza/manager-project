import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ['192.168.18.5'],
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Kiedy frontend pyta o /api/...
        destination: 'http://localhost:5180/api/:path*', // Przekieruj na backend
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["example.com", "cdn.example.com"], // Add your remote image domains here
  },
  eslint: {
    ignoreDuringBuilds: true,  // Ignore ESLint errors during builds
  },
};

export default nextConfig;

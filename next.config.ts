import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["example.com", "cdn.example.com"], // Add your remote image domains here
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static image imports
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Allow build even if MongoDB is not connected
  typescript: {
    ignoreBuildErrors: false,
  },

};

export default nextConfig;

import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.resolve(__dirname),
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85, 90, 95, 100],
  },
  allowedDevOrigins: [
    "localhost:3000",
    "127.0.0.1:3000",
    "192.168.0.*",
    "192.168.1.*",
  ],
  webpack: (config, { dev }) => {
    if (dev) {
      // Disable filesystem disk caching on Windows OneDrive to prevent file-locking crashes & 500 errors
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;

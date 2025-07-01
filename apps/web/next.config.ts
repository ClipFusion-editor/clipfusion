import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  watchOptions: {
    pollIntervalMs: 1000
  }
};


export default nextConfig;

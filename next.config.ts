import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "martiniworks.com",
      },
      {
        protocol: "https",
        hostname: "martiniworks.s3-accelerate.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;

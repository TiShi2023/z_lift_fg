import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'alarmvideo.oss-cn-shanghai.aliyuncs.com',
      },
    ],
  },
};

export default nextConfig;

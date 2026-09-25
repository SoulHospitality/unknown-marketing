import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide Next.js Dev Tools badge (dev-only; never shown in production builds)
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;

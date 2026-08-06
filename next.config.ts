import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/images/hero-laptop.png",
        search: "?v=20260806-1541",
      },
    ],
  },
};

export default nextConfig;

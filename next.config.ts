import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/images/hero-laptop.png",
        search: "?v=20260806-1541",
      },
      {
        pathname: "/images/services/software-development.webp",
      },
      {
        pathname: "/images/services/automation.webp",
      },
      {
        pathname: "/images/services/system-integration.webp",
      },
      {
        pathname: "/images/services/consulting-strategy.webp",
      },
    ],
  },
};

export default nextConfig;

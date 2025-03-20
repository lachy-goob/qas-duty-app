import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    if (process.env.NODE_ENV === "production") {
      return [
        {
          source: "/seed",
          destination: "/404",
          permanent: true,
        },
      ];
    } else {
      return []
    }
  },
  output: 'standalone',
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Images are now served through our internal /api/image proxy
  // No need to allow external domains
};

export default nextConfig;

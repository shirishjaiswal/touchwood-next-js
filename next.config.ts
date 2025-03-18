import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'files.edgestore.dev',
      'www.gstatic.com'
    ], 
  },
};

export default nextConfig;

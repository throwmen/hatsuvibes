import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 🔥 Esto ignora errores de ESLint en `next build`
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

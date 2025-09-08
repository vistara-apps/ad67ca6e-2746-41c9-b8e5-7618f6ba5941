/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  experimental: {
    workerThreads: false,
  },
  compiler: {
    removeConsole: false,
  },
};

export default nextConfig;

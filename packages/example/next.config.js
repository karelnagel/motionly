/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    transpilePackages: ["@asius/types"],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["@prisma/client"],
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "picsum.photos",
      "s3.us-east-1.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;

const MS_PER_SECOND = 1000;
const SECONDS_PER_DAY = 86400;

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
  redirects: async () => {
    return [
      {
        source: "/twitter",
        destination: "https://twitter.com/motionly",
        permanent: true,
      },
      {
        source: "/discord",
        destination: "https://discord.gg/jnrgqWvnzB",
        permanent: true,
      },
      {
        source: "/linkedin",
        destination: "https://www.linkedin.com/company/motionlyvideo/",
        permanent: true,
      },
      {
        "source": "/calendly",
        "destination": "https://calendly.com/motionly/contact-us",
        "permanent": true
      },
      {
        "source": "/revolut",
        "destination": "https://revolut.me/motionly",
        "permanent": true
      },
    ];
  },
  reactStrictMode: true,
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: SECONDS_PER_DAY * MS_PER_SECOND,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 100,
  },
};

const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  latex: true,
});

module.exports = withNextra(nextConfig);

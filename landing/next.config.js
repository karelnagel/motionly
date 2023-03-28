const MS_PER_SECOND = 1000;
const SECONDS_PER_DAY = 86400;

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "picsum.photos",
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
    maxInactiveAge: SECONDS_PER_DAY * MS_PER_SECOND,
    pagesBufferLength: 100,
  },
};
const withMDX = require('@next/mdx')()

module.exports = withMDX(nextConfig)

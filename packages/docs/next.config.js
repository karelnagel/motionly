// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  latex: true,
  redirects: [
    {
      source: "/calendly",
      destination: "https://calendly.com/asius/contact-us",
      permanent: true,
    },
    {
      source: "/revolut",
      destination: "https://revolut.me/asius",
      permanent: true,
    },
    {
      source: "/gpt3",
      destination:
        "https://marketplace.visualstudio.com/items?itemName=KarelNagel.gpt3",
      permanent: true,
    },
  ],
});

module.exports = withNextra();

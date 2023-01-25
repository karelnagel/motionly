import React from "react";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
import { Logo } from "./components/Logo";
import { useRouter } from "next/router";
import useNextSeoProps from "./hooks/useNextSeoProps";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

const config: DocsThemeConfig = {
  logo: <Logo />,
  gitTimestamp: false,
  primaryHue: 313,
  chat: {
    link: "https://discord.gg/U8gF8jEuJA",
  },
  footer: {
    component: () => <Footer />,
  },
  project: {
    icon: null,
  },
  banner: {
    text: "In beta, feedback is welcome in the discord",
    key: "Beta",
    dismissible: true,
  },
  toc: {
    component: null,
  },
  navigation: false,
  darkMode: false,
  nextThemes: { forcedTheme: "dark", defaultTheme: "dark" },
  navbar: {
    component: ({ items }) => <Navbar items={items} />,
  },
  useNextSeoProps,
  components: {},
  head: () => {
    const { asPath } = useRouter();
    const { frontMatter, title: configTitle } = useConfig();
    const basePath = process.env.NEXT_PUBLIC_URL;
    const title = frontMatter.title || configTitle || "Asius";
    return (
      <>
        <link rel="icon" type="image/x-icon" href="/favicondark.png"></link>
        <meta property="og:url" content={`${basePath}${asPath}`} />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={frontMatter.description || "Automate your content"}
        />
        <meta
          property="og:image"
          content={`${basePath}/api/og?title=${encodeURIComponent(title)}`}
        />
      </>
    );
  },
};

export default config;

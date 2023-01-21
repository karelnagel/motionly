import React from "react";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
import { Logo } from "./components/Logo";
import { useRouter } from "next/router";
import useNextSeoProps from "./hooks/useNextSeoProps";

const config: DocsThemeConfig = {
  logo: <Logo />,
  gitTimestamp: false,
  primaryHue: 210,
  chat: {
    link: "https://discord.gg/U8gF8jEuJA",
  },
  footer: {
    text: "Asius",
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
  useNextSeoProps,
  head: () => {
    const { asPath } = useRouter();
    const { frontMatter } = useConfig();
    const basePath = process.env.NEXT_PUBLIC_URL;
    return (
      <>
        <link rel="icon" type="image/x-icon" href="/favicondark.png"></link>
        <meta property="og:url" content={`${basePath}${asPath}`} />
        <meta property="og:title" content={frontMatter.title || "Asius"} />
        <meta
          property="og:description"
          content={frontMatter.description || "Automate your content"}
        />
        <meta
          property="og:image"
          content={`${basePath}/api/og?title=${encodeURIComponent(
            frontMatter.title
          )}`}
        />
      </>
    );
  },
};

export default config;

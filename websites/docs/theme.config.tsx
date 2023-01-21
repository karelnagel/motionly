import React from "react";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
import useNextSeoProps from "./hooks/useNextSeoProps";
import { Logo } from "./components/Logo";
import { useRouter } from "next/router";

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
    return (
      <>
        <link rel="icon" type="image/x-icon" href="/favicondark.png"></link>
        <meta property="og:url" content={`https://my-app.com${asPath}`} />
        <meta property="og:title" content={frontMatter.title || "Nextra"} />
        <meta
          property="og:description"
          content={frontMatter.description || "The next site builder"}
        />
      </>
    );
  },
};

export default config;

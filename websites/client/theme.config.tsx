import React from "react";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { env } from "./env.mjs";
import { title } from "./consts";

const config: DocsThemeConfig = {
  primaryHue: 203,
  footer: {
    component: () => <Footer />,
  },
  project: {
    icon: null,
  },
  toc: {
    component: null,
  },
  navigation: false,
  darkMode: false,
  nextThemes: { forcedTheme: "dark", defaultTheme: "dark" },
  navbar: {
    component: () => <Navbar />,
  },
  useNextSeoProps: () => {
    const { route } = useRouter();
    if (route !== "/") {
      return {
        titleTemplate: "%s – Motionly",
      };
    }
    return { titleTemplate: title};
  },
  head: () => {
    const { asPath } = useRouter();
    const { frontMatter, title: configTitle } = useConfig();
    const basePath = env.NEXT_PUBLIC_URL;
    const title2 = frontMatter.title || configTitle || title;
    return (
      <>
        <link rel="icon" type="image/x-icon" href={`${basePath}/favicon.png`}></link>
        <meta property="og:url" content={`${basePath}${asPath}`} />
        <meta property="og:title" content={title2} />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta
          property="og:description"
          content={frontMatter.description || "Automate your content"}
        />
        <meta
          property="og:image"
          content={`${basePath}/api/og?title=${encodeURIComponent(title2)}`}
        />
      </>
    );
  },
};

export default config;

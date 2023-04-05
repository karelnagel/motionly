import { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Theme } from "~/components/Theme";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Motionly",
  description: "Motionly is a free, open-source, and privacy-focused video editing platform.",
  icons: [
    {
      url: "/favicon.png",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Theme>
      <body style={inter.style} className="flex flex-col">
        <Header />
        <div className="min-h-screen pt-[80px]">{children}</div>
        <Footer />
      </body>
    </Theme>
  );
}

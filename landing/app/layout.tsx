import { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

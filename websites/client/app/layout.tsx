import { Alerts } from "../components/Alert";
import { ClientSessionProvider } from "../contexts/ClientSessionProvider";
import { getServerSession } from "../lib/getServerSession";
import { ClientProvider } from "./ClientProvider";
import "./globals.css";
import { Nunito } from "@next/font/google";
import {
  description,
  title,
  siteName,
  url,
  favicon,
  motionly,
  email,
} from "../consts";

const nunito = Nunito({ subsets: ["latin"] });
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <ClientSessionProvider session={session}>
        <ClientProvider>
          <body className="dark" style={nunito.style}>
            <Alerts>{children}</Alerts>
          </body>
        </ClientProvider>
      </ClientSessionProvider>
    </html>
  );
}

export const metadata = {
  title,
  description,
  icons: {
    icon: favicon,
    shortcut: favicon,
  },
  openGraph: {
    title,
    description,
    url,
    siteName: siteName,
    images: [
      {
        url: motionly,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    locale: "en-US",
    type: "website",
    countryName: "Estonia",
    alternateLocale: "et-EE",
    emails: [email],
  },
  keywords: ["motionly", "video", "editor", "animation", "motion"],
  creator: "Motionly",
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@KarelETH",
    images: [motionly],
  },
};

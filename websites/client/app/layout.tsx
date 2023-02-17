import { Alerts } from "../components/Alert";
import { ClientSessionProvider } from "../contexts/ClientSessionProvider";
import { getServerSession } from "../lib/getServerSession";
import { ClientProvider } from "./ClientProvider";
import "./globals.css";
import { Nunito } from "@next/font/google";
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
        <head />
        <body className="dark" style={nunito.style}>
          <Alerts>
            <ClientProvider>{children}</ClientProvider>
          </Alerts>
        </body>
      </ClientSessionProvider>
    </html>
  );
}

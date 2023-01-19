import { Alerts } from "../components/Alert";
import { ClientSessionProvider } from "../contexts/ClientSessionProvider";
import { getServerSession } from "../lib/getServerSession";
import "./globals.css";

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
        <body className="dark">
          <Alerts>{children}</Alerts>
        </body>
      </ClientSessionProvider>
    </html>
  );
}

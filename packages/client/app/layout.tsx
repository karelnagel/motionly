import { ClientSessionProvider } from "../contexts/ClientSessionProvider";
import { getServerSession } from "../lib/getServerSession";
import "./globals.css";
import { Login } from "../components/Login";

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
        <body className="dark">{session ? children : <Login />}</body>
      </ClientSessionProvider>
    </html>
  );
}

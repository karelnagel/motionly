import { ClientSessionProvider } from "../contexts/ClientSessionProvider";
import { getServerSession } from "../lib/getServerSession";
import "./globals.css";
import { Login } from "./Login";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log('loadsf')
  const session = await getServerSession();
  console.log(session);
  return (
    <html lang="en">
      <ClientSessionProvider session={session}>
        <head />
        <body>{session ? children : <Login />}</body>
      </ClientSessionProvider>
    </html>
  );
}

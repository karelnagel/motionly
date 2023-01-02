import { unstable_getServerSession } from "next-auth";
import { ClientSessionProvider } from "../contexts/ClientSessionProvider";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import "./globals.css";
import { Login } from "./Login";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log('loadsf')
  const session = await unstable_getServerSession(authOptions);
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

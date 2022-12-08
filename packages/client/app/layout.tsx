import { unstable_getServerSession } from "next-auth";
import { ClientSessionProvider } from "../contexts/ClientSessionProvider";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { Footer } from "../components/Footer";
import "./globals.css";
import { Header } from "../components/Header";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await unstable_getServerSession(authOptions);
  return (
    <html lang="en">
      <ClientSessionProvider session={session}>
        <head />
        <body>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </body>
      </ClientSessionProvider>
    </html>
  );
}

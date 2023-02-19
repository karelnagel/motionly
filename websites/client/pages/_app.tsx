import { SessionProvider } from "next-auth/react";
import { ClientProvider } from "../app/ClientProvider";
import "../app/globals.css";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: {
  Component: any;
  pageProps: any;
}) {
  return (
    <SessionProvider session={pageProps.session}>
      <ClientProvider>
        <Component {...pageProps} />
      </ClientProvider>
    </SessionProvider>
  );
}

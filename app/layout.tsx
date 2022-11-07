import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <header className=" bg-base-100 shadow-md">
          <div className="max-w-screen-lg m-auto items-center flex justify-between py-3 px-2">
            <Link className="text-3xl font-bold" href="/">
              Home
            </Link>
            <div className=" space-x-3 flex ">
              <Link href="/templates">Templates</Link>
              <Link href="/about">About</Link>
            </div>
          </div>
        </header>
        <main className="min-h-screen">{children}</main>
        <footer className="bg-zinc-800 flex items-center justify-center py-10 text-4xl font-bold text-white">
          <p>Home</p>
        </footer>
      </body>
    </html>
  );
}

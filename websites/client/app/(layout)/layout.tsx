import { ReactNode } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-clip">
      <div className="flex justify-between flex-col min-h-screen mx-auto max-w-screen-xl items-center bg-base-100 text-base-content">
        <div className="min-h-screen h-full w-full flex flex-col space-y-8">
          <Navbar />
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
}

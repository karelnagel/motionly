import { ReactNode } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-clip">
      <div className="flex justify-between flex-col min-h-screen mx-auto max-w-[1200px] items-center bg-base-100 text-base-content">
        <div className="w-full">
          <Navbar />
          <div className="p-4 h-full w-full">{children}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

import { ReactNode } from "react";
import { Navbar } from "../../components/docs/Navbar";
import { Footer } from "../../components/docs/Footer";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div className=" flex justify-between flex-col min-h-screen mx-auto max-w-[1200px] items-center font-montserrat bg-base-100 text-base-content">
      <div className=" w-full">
        <Navbar />
        <div className="p-4 h-full w-full">{children}</div>
      </div>
      <Footer />
    </div>
  );
}

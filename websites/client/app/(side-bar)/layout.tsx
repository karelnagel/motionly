import { ReactNode } from "react";
import { Login } from "../../components/Login";
import Image from "next/image";
import { MdOutlineHome, MdPermMedia } from "react-icons/md";
import Link from "next/link";
import { getServerSession } from "../../lib/getServerSession";
import { SideBarButton } from "../../components/SideBarButton";
import motionly from "../../public/motionly.png";
import { Navbar } from "../../components/docs/Navbar";
import { Footer } from "../../components/docs/Footer";


export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession();
  return (
    <div className=" flex flex-col max-w-[1200px] min-h-screen mx-auto items-center font-montserrat">
      <Navbar/>
      <div className="p-4 h-full  bg-base-100 text-base-content w-full">
        {children}
      </div>
      <Footer/>
    </div>
  );
}

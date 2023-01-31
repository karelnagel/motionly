import { ReactNode } from "react";
import { Login } from "../../components/Login";
import Image from "next/image";
import { MdOutlineHome, MdPermMedia } from "react-icons/md";
import Link from "next/link";
import { getServerSession } from "../../lib/getServerSession";
import { SideBarButton } from "../../components/SideBarButton";
import motionly from "../../public/motionly.png";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession();
  return (
    <div className=" flex flex-col min-h-screen bg-base-300 items-center">
      <div className="flex justify-between p-2 items-center bg-base-100 w-full">
        <Link href="/">
          <Image priority src={motionly} alt="logo" className="w-48" />
        </Link>
        <div className="flex shadow-xl justify-between space-x-4">
          <SideBarButton href="/" text="Home">
            <MdOutlineHome />
          </SideBarButton>
          {session?.user && (
            <>
              <SideBarButton href="/projects" text="Projects">
                <MdPermMedia />
              </SideBarButton>
            </>
          )}
          <Login />
        </div>
      </div>
      <div className="p-4 overflow-y-auto h-full max-w-screen-lg w-full">
        {children}
      </div>
    </div>
  );
}

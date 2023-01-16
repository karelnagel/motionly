import { ReactNode } from "react";
import { Login } from "../../components/Login";
import Image from "next/image";
import { MdOutlineHome, MdPermMedia } from "react-icons/md";
import { SideBarButton } from "../../components/SideBarButton";
import Link from "next/link";
import { asiusUrl } from "../../env";
import { getServerSession } from "../../lib/getServerSession";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession();
  return (
    <div className="grid grid-cols-5 min-h-screen overflow-hidden">
      <div className="relative">
        <div className="h-full fixed w-1/5 flex flex-col bg-base-100 shadow-xl p-6 justify-between">
          <div>
            <Link href={asiusUrl} target="_blank">
              <Image src="/asius.png" width={150} height={120} alt="logo" />
            </Link>
            <div className="flex flex-col space-y-3 mt-20">
              <SideBarButton href="/" text="Home">
                <MdOutlineHome />
              </SideBarButton>
              {session?.user && (
                <>
                  <SideBarButton href="/projects" text="Projects">
                    <MdPermMedia />
                  </SideBarButton>
                  {/* <SideBarButton href="/account" text="Account">
                    <MdAccountCircle />
                  </SideBarButton> */}
                </>
              )}
            </div>
          </div>
          <Login />
        </div>
      </div>
      <div className="col-span-4 bg-base-300 p-4 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

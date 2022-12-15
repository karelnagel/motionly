import { ReactNode } from "react";
import { LogOut } from "../../components/Logout";
import Image from "next/image";
import { MdAccountCircle, MdOutlineHome, MdPermMedia } from "react-icons/md";
import { SideBarButton } from "../../components/SideBarButton";
import Link from "next/link";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-5 min-h-screen">
      <div className="h-full bg-base-100 w-full shadow-xl p-6 flex flex-col justify-between ">
        <div>
          <Link href={process.env.NEXT_PUBLIC_DOCS_URL || ""}>
            <Image src="/logo.png" width={140} height={100} alt="logo" />
          </Link>
          <div className="flex flex-col space-y-3 mt-20">
            <SideBarButton href="/" text="Home">
              <MdOutlineHome />
            </SideBarButton>
            <SideBarButton href="/templates" text="Templates">
              <MdPermMedia />
            </SideBarButton>
            <SideBarButton href="/account" text="Account">
              <MdAccountCircle />
            </SideBarButton>
          </div>
        </div>
        <LogOut />
      </div>
      <div className="col-span-4 bg-base-300">{children}</div>
    </div>
  );
}

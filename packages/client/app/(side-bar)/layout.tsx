import Link from "next/link";
import { ReactNode } from "react";
import { getServerSession } from "../../lib/getServerSession";
import { LogOut } from "./Logout";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession();
  return (
    <div className="grid grid-cols-5 min-h-screen">
      <div className="col-span-2 h-full bg-base-100 w-full">
        <Link href="/">Dashboard</Link>
        <Link href="/templates">Templates</Link>
        <Link href="/account">Account</Link>
        <p>{session?.user?.email}</p>
        <p>{session?.user?.name}</p>
        <LogOut/>
      </div>
      <div className="col-span-3 bg-base-300">{children}</div>
    </div>
  );
}

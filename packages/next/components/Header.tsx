"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const Header = () => {
  const { data, status } = useSession();
  return (
    <header className=" bg-base-100 shadow-md">
      <div className="max-w-screen-lg m-auto items-center flex justify-between py-3 px-2">
        <Link className="text-3xl font-bold" href="/">
          Home
        </Link>
        <div className=" space-x-3 flex ">
          <Link href="/templates">Templates</Link>
          <Link href="/about">About</Link>
          {data && <button onClick={() => signOut()}>Sign out</button>}
          {!data && <button onClick={() => signIn()}>Sign in</button>}
        </div>
      </div>
    </header>
  );
};

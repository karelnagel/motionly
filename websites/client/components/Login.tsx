"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export function Login() {
  const { data } = useSession();
  const firstName = data?.user?.name?.split(" ").slice(0, -1).join(" ");
  return (
    <div>
      {data?.user ? (
        <div className="dropdown dropdown-hover flex flex-row">
          <label tabIndex={0} className="btn btn-primary space-x-4 ">
            {data.user.image && (
              <Image
                src={data.user.image}
                alt="user"
                width={25}
                height={25}
                className="rounded-md object-cover -m-2"
              />
            )}
            <p className="">{firstName}</p>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-100 right-0 top-[100%] menu shadow bg-base-200 w-40 rounded-lg"
          >
            <li className="hover:text-primary">
              <Link href="/templates">Templates</Link>
            </li>
            <li className="hover:text-primary">
              <Link href="/account">Settings</Link>
            </li>
            <li className="hover:text-error">
              <button  onClick={() => signOut()}>Log Out</button>
            </li>
          </ul>
        </div>
      ) : (
        <Link href="/login" className="btn btn-gradient">
          Start For Free
        </Link>
      )}
    </div>
  );
}

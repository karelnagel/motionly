"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export function Login() {
  const { data } = useSession();
  const firstName = data?.user?.name?.split(" ").slice(0, -1).join(" ");
  return (
    <div>
      {data?.user ? (
        <div className="dropdown dropdown-hover flex flex-row ">
          <label
            tabIndex={0}
            className="btn flex flex-row rounded-lg items-center space-x-2 whitespace-nowrap bg-base-100 border-2 border-base-100 hover:bg-base-100 hover:border-accent hover:border-2"
          >
            {data.user.image && (
              <Image
                src={data.user.image}
                alt="user"
                width={30}
                height={30}
                className="rounded-lg object-cover "
              />
            )}
            <div className="text-base-content flex-row whitespace-nowrap items-center relative text-base font-semibold hidden sm:flex">
              <p className="group-hover:opacity-0 text-md">{firstName}</p>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content absolute z-100 right-0 top-[100%] menu shadow bg-base-200 rounded-box w-40"
          >
            <li className="hover:text-accent">
              <a href="/dashboard">Editor</a>
            </li>
            <li className="hover:text-accent">
              <a href="/account">Settings</a>
            </li>
            <li className="hover:text-error" onClick={() => signOut()}>
              <a>Log Out</a>
            </li>
          </ul>
        </div>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="rounded-full bg-secondary duration-200 group overflow-hidden p-2 px-2 pl-3 flex items-center font-semibold text-lg border-[1px] border-secondary hover:text-secondary hover:scale-110 hover:bg-base-100"
        >
          <div className="flex items-center text-base whitespace-nowrap space-x-1">
            <p className="w-full text-center font-semibold flex">Sign Up</p>
          </div>
        </button>
      )}
    </div>
  );
}

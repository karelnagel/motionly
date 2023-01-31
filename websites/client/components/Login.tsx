"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import google from "../public/icons/google.png";

export function Login() {
  const { data } = useSession();
  return (
    <button
      onClick={() => (data?.user ? signOut() : signIn("google"))}
      className="rounded-lg bg-base-300 duration-200 group overflow-hidden p-2"
    >
      {data?.user ? (
        <div className="flex rounded-lg items-center space-x-2">
          {data.user.image && (
            <Image
              src={data.user.image}
              alt="user"
              width={30}
              height={30}
              className="rounded-lg object-cover"
            />
          )}
          <div className="text-primary-content flex-col items-start relative text-lg font-bold hidden sm:flex">
            <p className="group-hover:opacity-0">{data.user.name}</p>
            <p className="hidden group-hover:block absolute">Log out</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center text-lg whitespace-nowrap space-x-2">
          <Image priority src={google} alt="google" className="w-[30px]" />
          <p className="w-full text-center font-medium hidden sm:flex">
            Login with Google
          </p>
        </div>
      )}
    </button>
  );
}

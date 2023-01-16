"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export function Login() {
  const { data } = useSession();
  return (
    <button
      onClick={() => (data?.user ? signOut() : signIn("google"))}
      className="rounded-lg bg-base-300 duration-200 group overflow-hidden"
    >
      {data?.user ? (
        <div className="flex rounded-lg items-center ">
          {data.user.image && (
            <Image
              src={data.user.image}
              width={30}
              height={30}
              alt="user"
              className="rounded-lg object-cover m-2"
            />
          )}
          <div className="text-primary-content flex flex-col items-start">
            <p className="text-lg font-bold">{data.user.name}</p>
            <p className="group-hover:h-auto h-0 duration-200 opacity-0 group-hover:opacity-100">
              Log out
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center text-lg whitespace-nowrap">
          <Image
            src="/icons/google.webp"
            alt="google"
            width={30}
            height={30}
            className="m-2"
          />
          <p className="w-full text-center font-medium">Login with Google</p>{" "}
        </div>
      )}
    </button>
  );
}

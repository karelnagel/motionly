"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export function LogOut() {
  const { data } = useSession();
  if (!data?.user) return null;
  return (
    <button
      onClick={() => signOut()}
      className="flex rounded-lg items-center gradient duration-200 group overflow-hidden"
    >
      {data.user.image && (
        <Image
          src={data.user.image}
          width={30}
          height={30}
          alt="user"
          className="rounded-lg object-cover m-3"
        />
      )}
      <div className="text-primary-content flex flex-col items-start">
        <p className="text-lg font-bold">{data.user.name}</p>
        <p className="group-hover:h-auto h-0 duration-200 opacity-0 group-hover:opacity-100">
          Log out
        </p>
      </div>
    </button>
  );
}

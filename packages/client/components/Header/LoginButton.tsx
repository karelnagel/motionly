"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export const LoginButton = () => {
  const { data } = useSession();

  return (
    <div
      onClick={() => (data ? signOut() : signIn("google"))}
      className="bg-primary px-2 py-1 rounded-lg text-primary-content cursor-pointer"
    >
      {data?.user && (
        <div className="flex items-center space-x-2">
          <p>Hi {data.user.name?.split(" ")[0]}!</p>
          {data.user.image && (
            <Image src={data.user?.image} alt="" width={30} height={30} className="rounded-full" />
          )}
        </div>
      )}
      {!data?.user && <div>Sign in With Google</div>}
    </div>
  );
};

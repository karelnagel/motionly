"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { asiusUrl } from "../env";
import { getRandomImage } from "../helpers";

export function Login() {
  return (
    <div className="h-screen w-full relative flex items-center justify-center bg-base-300">
      <Image
        alt="background"
        src={getRandomImage()}
        fill={true}
        style={{ objectFit: "cover" }}
      />
      <div className="relative bg-base-100 shadow-2xl pt-4 pb-10 px-10 rounded-lg flex flex-col items-center max-w-[400px] w-full ">
        <Link href={asiusUrl} target="_blank">
          <Image src="/asius.png" alt="logo" width={200} height={60} />
        </Link>
        <div className="h-full flex flex-col space-y-6 items-center">
          <p className="text-xl font-bold">Welcome back!</p>
          <button
            onClick={() => signIn("google")}
            className="shadow-lg flex space-x-2 items-center  p-2 rounded-lg bg-base-200 w-[300px]"
          >
            <Image
              src="/icons/google.webp"
              alt="google"
              width={30}
              height={30}
            />
            <p className="w-full text-center font-medium">Login with Google</p>
          </button>
        </div>
      </div>
    </div>
  );
}

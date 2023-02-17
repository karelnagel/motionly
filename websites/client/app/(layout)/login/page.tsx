"use client";

import { signIn } from "next-auth/react";
import google from "../../../public/icons/google.png";
import github from "../../../public/icons/github.png";
import Image, { StaticImageData } from "next/image";

export default function Login({
  searchParams,
}: {
  searchParams?: { redirect?: string };
}) {
  const Button = ({
    service,
    src,
  }: {
    service: string;
    src: StaticImageData;
  }) => {
    return (
      <button
        onClick={() =>
          signIn(service.toLowerCase(), {
            callbackUrl: searchParams?.redirect || "/templates",
          })
        }
        className="btn flex space-x-2"
      >
        <Image src={src} alt={service} className="w-6" />
        <p>Continue with {service}</p>
      </button>
    );
  };
  return (
    <div className="h-full flex justify-center items-center flex-grow">
      <div className="flex flex-col items-center justify-center">
        <p className="font-semibold text-3xl">Login to Motionly</p>
        <div className="divider"></div>
        <div className="space-y-2">
          <Button service="Google" src={google} />
          <Button service="Github" src={github} />
        </div>
      </div>
    </div>
  );
}

"use client";

import { signIn } from "next-auth/react";
import { StaticImageData } from "next/image";
import Image from "next/image";

export const Button = ({
  service,
  src,
  callbackUrl,
}: {
  service: string;
  src: StaticImageData;
  callbackUrl?: string;
}) => {
  return (
    <button
      onClick={() =>
        signIn("github", {
          callbackUrl,
        })
      }
      className="btn flex space-x-2"
    >
      <Image src={src} alt={service} className="w-6" />
      <p>Continue with {service}</p>
    </button>
  );
};

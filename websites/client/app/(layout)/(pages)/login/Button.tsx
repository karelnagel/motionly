"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export const Button = ({
  service,
  src,
  callbackUrl,
}: {
  service: string;
  src: string;
  callbackUrl?: string;
}) => {
  return (
    <button
      onClick={() =>
        signIn(service.toLowerCase(), {
          callbackUrl,
        })
      }
      className="btn flex space-x-2"
    >
      <Image src={src} alt={service} className="w-6" height={100} width={100} />
      <p>Continue with {service}</p>
    </button>
  );
};

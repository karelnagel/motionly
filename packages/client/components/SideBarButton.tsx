"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const SideBarButton = ({
  href,
  text,
  children,
}: {
  href: string;
  text: string;
  children?: React.ReactNode;
}) => {
  const pathName = usePathname();
  const selected = pathName === href;
  return (
    <Link
      href={href}
      className={`${
        selected ? "bg-primary shadow-lg" : "bg-base-200 hover:shadow-lg"
      } duration-150 px-3 py-1 rounded-lg font-bold text-xl text-base-content flex items-center hover:scale-105 space-x-2`}
    >
      {children}
      <p className="text-lg leading-none hidden sm:block">{text}</p>
    </Link>
  );
};

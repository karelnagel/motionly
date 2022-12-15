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
        selected ? "bg-base-200 shadow-lg" : "hover:shadow-lg"
      } duration-150 p-3 rounded-lg font-bold text-xl text-base-content flex space-x-3 items-end hover:scale-105`}
    >
      {children}
      <p className="text-lg leading-none">{text}</p>
    </Link>
  );
};
